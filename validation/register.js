import {check} from "express-validator"

export const RegisterSchema = [

    check('name','name is required').exists().trim().isAlpha('en-US', {ignore: ' '}).withMessage("Name should be only alphabets"),
    // check('password').trim().isLength({min:6,max:12}),
    check('password','password is required').exists().isStrongPassword({
        minLength: 8,
        maxLength:12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }).trim().withMessage("Password should be min 8 max 12 long with at least one uppercase,one lowercase, 1 number and 1 symbol."),
    check('email','email is required').exists().trim().isEmail().withMessage("Enter valid Email"),
    check('phone','phone no is required').exists().isMobilePhone().withMessage("Enter valid Phone Number")


]