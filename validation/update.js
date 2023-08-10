import {check} from "express-validator"

export const UpdateSchema = [

    check('name').trim().isAlpha('en-US', {ignore: ' '}).withMessage("Name should be only alphabets"),
    // check('password').trim().isLength({min:6,max:12}),
    check('password').isStrongPassword({
        minLength: 8,
        maxLength:12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }).trim().withMessage("Password should be min 8 max 12 long with at least one uppercase,one lowercase, 1 number and 1 symbol."),
    check('email').trim().isEmail().withMessage("Enter valid Email"),
    check('phone').isMobilePhone().withMessage("Enter valid Phone Number")


]