import Jwt from "jsonwebtoken"
import { StatusCode } from "../utils/constants.js"
import User from "../models/users.js"
import { jsonGenerate } from "../utils/helpers.js"

export const AuthMiddleware = (req,res,next) =>{
    if(req.headers.authorization===undefined){
        res.json(jsonGenerate(StatusCode.AUTH_ERROR,"Access Denied"))
    }
    console.log(req.header)
    const token = req.headers.authorization
    try {
        const decoded = Jwt.verify(token,process.env.JWT_TOKEN_SECRET)
        // console.log(decoded)
        req.user=decoded
        return next();
    } catch (error) {
        res.json(jsonGenerate(StatusCode.INVALID_TOKEN,"Invalid Token",error))
        
    }
    //this is working too
    // try {
    //     const decode = Jwt.verify(
    //         req.headers.authorization,
    //         process.env.JWT_TOKEN_SECRET
    //     );
    //     req.user = decode;
    //     next()
        
    // } catch (error) {
    //     res.json(jsonGenerate(StatusCode.INVALID_TOKEN,"Invalid Token"))
        
    // }
}


 export const IsAdmin=async(req,res,next)=>{
    try{
        const user = await User.findById(req.user.userId);
        if(user.role!==1){
            return res.json(jsonGenerate(StatusCode.UNAUTHORIZED_ACCESS,"Unauthorized Access"))
        }else{
            next();
        }
    }
    catch(error){
        return res.json(jsonGenerate(StatusCode.SOMETHING_WENT_WRONG,"Error in admin middleware"))
    }

}

