import { Request, Response } from "express-serve-static-core"
import { omit } from "lodash"
import { createUser, validatePassword } from "../service/user.service"
import log from "../logger"
import { createAccessToken, createSession, findSessions, updateSession } from "../service/session.service"
import { sign } from "../utils/jwt.utils"
import config from "config"
import { get } from "lodash";


export async function createUserSessionHandler(req: Request, res: Response) {
    // valide the email and password 
    const user = await validatePassword(req.body)
    if (!user) return res.status(400).send("Invalide username or password")

    // Create a session
    const session = await createSession(user._id, req.get("user_agent") || "")
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
    const sessionId = get(req, "user.session")
    await updateSession({ _id: sessionId }, { valide: false })
    return res.sendStatus(200)
}

export async function getUserSessionHandler(req: Request, res: Response) {
    const userId = get(req, "user._id")
    const sessions = await findSessions({ user: userId, valid: true })

    return res.send(sessions)
}