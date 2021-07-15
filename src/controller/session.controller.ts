import config from "config"
import { Request, Response } from "express-serve-static-core"
import { get } from "lodash"
import log from "../logger"
import {
    createAccessToken,
    createSession,
    findSessions,
    updateSession
} from "../service/session.service"
import { validatePassword } from "../service/user.service"
import { sign } from "../utils/jwt.utils"


export async function createUserSessionHandler(req: Request, res: Response) {
    // valide the email and password 
    const user = await validatePassword(req.body)
    if (!user) return res.status(400).send("Invalide username or password")

    // Create a session
    const session = await createSession(user._id, req.get("user-agent") || "")
    if (!session) return

    // create access token
    const accessToken = createAccessToken({
        user,
        session,
    });
    // Create a refresh token 
    const refreshToken = sign(session, {
        expiresIn: config.get("refreshTokenTtl"), // 1 year
    });

    return res.send({ accessToken, refreshToken });
}

export async function invalidateUserSessionHandler(req: Request, res: Response) {
    const sessionId = get(req, "user._id")

    await updateSession({ _id: sessionId }, { valid: false })
    return res.sendStatus(200)
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = get(req, "user._id");
    const sessions = await findSessions({ user: userId, valid: true })
    log.info(sessions);
    return res.send(sessions)
}