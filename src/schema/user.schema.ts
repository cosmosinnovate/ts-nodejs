// Schema enforces required values
import { max } from "lodash"
import { object, string, ref } from "yup"

/**
 * 
 */
export const createUserSchema = object({
    body: object({
        name: string().required("Name is required"),
        email: string().email("Must be a valide email").required("Email is required"),
        password: string().required("Password is required")
            .min(6, "Password uis too short must be 6 chars minimum")
            .matches(/^[a-zA-Z0-0_.-]*$/, "Password must contain Latin letters."),
        passwordConfirmation: string().oneOf(
            [ref("password"), null],
            "Passwor must much"
        ),
    })
})

/**
 * 
 */
export const createUserSessionSchema = object({
    body: object({
        email: string().email("Must be a valide email").required("Email is required"),
        password: string().required("Password is required")
            .min(6, "Password uis too short must be 6 chars minimum")
            .matches(/^[a-zA-Z0-0_.-]*$/, "Password must contain Latin letters."),
    })
})