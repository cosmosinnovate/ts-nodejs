import User, { UserDocument } from "../model/user.model"
import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";

/**
 * Create user
 * @param input UserDocument
 * @returns object
 */
export async function createUser(input: DocumentDefinition<UserDocument>) {
    try {
        return User.create(input)
    } catch (error) {
        throw new Error(error)
    }
}

/**
 * Find User        
 * @param input UserDocument
 * @returns object
 */
export async function findUser(query: FilterQuery<UserDocument>) {
    return User.findOne(query).lean()
}

/**
 * Delete document
 * @param input UserDocument
 * @returns object
 */
export async function validatePassword(
    { email, password }: {
        email: UserDocument["email"], password: string
    }) {
    const user = await User.findOne({ email })

    if (!user) return false

    const isValid = await user.comparePassword(password)
    if (!isValid) return false

    return omit(user.toJSON(), "password")
}