import mongoose from "mongoose"
import { UserDocument } from "./user.model";

export interface SessionDocument extends mongoose.Document {
    user: UserDocument["_id"]
    valid: boolean
    userAgent: string
    createdAt: Date
    upatedAt: Date
    comparePassword(candidatPassword: string): Promise<boolean>;
}
const UserSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        valid: { type: Boolean, default: true },
        userAgent: { type: String },
    }, { timestamps: true },
);

const Session = mongoose.model<SessionDocument>("Session", UserSchema)
export default Session;