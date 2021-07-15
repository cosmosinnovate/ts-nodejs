import { Express, Request, Response } from "express";
import {
    createUserSessionHandler,
    getUserSessionHandler,
    invalidateUserSessionHandler
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import { requiresUser, validateRequest } from "./middleware";
import { createUserSchema, createUserSessionSchema } from "./schema/user.schema";


export default function (app: Express) {
    // Health check
    app.get("/healthcheck", (_req: Request, res: Response) => res.sendStatus(200))
    // Register user 
    // POST /api/user
    app.post("/api/user", validateRequest(createUserSchema), createUserHandler)
    // Login
    // POST /api/session
    app.post("/api/session", validateRequest(createUserSessionSchema), createUserSessionHandler)
    // Get user's session 
    // GET /api/sessions
    app.get("/api/sessions", requiresUser, getUserSessionHandler)
    // Logout
    // DELETE /api/session
    app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler)

}