import mongoose from "mongoose"
import bcrypt from "bcrypt"
import config from "config"

export interface UserDocument extends mongoose.Document {
    email: string
    name: string
    password: string
    createdAt: Date
    upatedAt: Date
    comparePassword(candidatPassword: string): Promise<boolean>;
}
const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
    }, { timestamps: true },
);

UserSchema.pre("save", async function (next: mongoose.HookNextFunction) {
    let user = this as UserDocument
    // Only has password if it has been modified or is new
    if (!user.isModified("password")) return next()
    //random additional dates
    const salt = await bcrypt.genSalt(config.get("secreteSalt"))
    const hash = bcrypt.hashSync(user.password, salt)
    user.password = hash
    return next()

})

// Use for loggin in
UserSchema.methods.comparePassword = async function (candidatPassword: string) {
    const user = this as UserDocument;
    return bcrypt.compare(candidatPassword, user.password).catch(() => false)
}

const User = mongoose.model<UserDocument>("User", UserSchema)
export default User;