import { Express, Request, Response } from "express";
import { createUserSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import validateRequest from "./middleware/validate"
import { createUserSchema, createUserSessionSchema } from "./schema/user.schema";


export default function (app: Express) {
    // Health check
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200))
    // Register user 
    // POST /api/user
    app.post("/api/users", validateRequest(createUserSchema), createUserHandler)
    // Login
    // POST /api/session
    app.post("/api/sessons", validateRequest(createUserSessionSchema), createUserSessionHandler)


    // Get user's session 
    // GET /api/sessions

    // Logout
    // DELETE /api/sessions
}