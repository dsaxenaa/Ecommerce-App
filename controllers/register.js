import Jwt from "jsonwebtoken"
import { StatusCode } from "../utils/constants.js";
import User from "../models/users.js"
import { hashPassword } from "../utils/authHelpers.js";
import { jsonGenerate } from "../utils/helpers.js";
import {validationResult} from "express-validator"

export const Register = async (req,res)=>{
    try {
        console.log(req.body)
        const {name,email,password,phone,address, answer}=req.body;
        //checking whether fields exist
        if(!name){
            return res.send(jsonGenerate(StatusCode.MISSING_FIELD,"Name is required")) 
        }
        if(!email){
            return res.send(jsonGenerate(StatusCode.MISSING_FIELD,"Email is required")) 
        }
        if(!password){
            return res.send(jsonGenerate(StatusCode.MISSING_FIELD,"Password is required")) 
        }
        if(!phone){
            return res.send(jsonGenerate(StatusCode.MISSING_FIELD,"Phone number is required")) 
        }
        if(!address){
            return res.send(jsonGenerate(StatusCode.MISSING_FIELD,"Address is required")) 
        }
        if(!answer){
            return res.send(jsonGenerate(StatusCode.MISSING_FIELD,"Answer is required")) 
        }
        //validation check
        const errors = validationResult(req);
        if(errors.isEmpty()){
            //checking existing users
            const exists = await User.findOne({email:email})
            if(!exists){
                const hashedP = await  hashPassword(password);
                const JWT_TOKEN = process.env.JWT_TOKEN_SECRET
                //save user
                try {
                    const user = await new User({
                        name,email,phone,address,password:hashedP, answer
                    }).save();
                    const token = Jwt.sign({userId:user._id}, JWT_TOKEN)
                    res.json(jsonGenerate(StatusCode.SUCCESS,"Registration successful", {user,token:token}))
                    
                    
                } catch (error) {
                    res.json(jsonGenerate(StatusCode.SOMETHING_WENT_WRONG,"Something went wrong",error))
                    
                }     
            }
            return res.send(jsonGenerate(StatusCode.ALREADY_EXISTS,"User Already exists"))
        }
        return res.send(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error",errors.mapped()))
        
    } catch (error) {
        res.send(jsonGenerate(StatusCode.SOMETHING_WENT_WRONG,"Error in Registration", error))  
    }
}
