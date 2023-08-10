import {check} from "express-validator"

export const LoginSchema = [
    check('password','password is required').exists().isStrongPassword({
        minLength: 8,
        maxLength:12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }).trim().withMessage("Password should be min 8 max 12 long with at least one uppercase,one lowercase, 1 number and 1 symbol."),
    check('email','email is required').exists().trim().isEmail().withMessage("Enter valid Email"),
]