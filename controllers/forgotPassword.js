import { StatusCode } from "../utils/constants.js";
import User from "../models/users.js"
import { hashPassword } from "../utils/authHelpers.js";
import { jsonGenerate } from "../utils/helpers.js";

export const ForgotPassword = async(req,res) => {
  try {
    const {email,newPassword,answer} = req.body
    if(!email){
        return res.send(jsonGenerate(StatusCode.MISSING_FIELD,"Email is required")) 
    }
    if(!newPassword){
        return res.send(jsonGenerate(StatusCode.MISSING_FIELD,"New password is required")) 
    }
    if(!answer){
        return res.send(jsonGenerate(StatusCode.MISSING_FIELD,"Answer is required")) 
    }

    const user = await User.findOne({email,answer})
    if(!user){
        return res.json(jsonGenerate(StatusCode.USER_DOES_NOT_EXIST,"No such user found or wrong answer"))
    }
    const hashedP = await hashPassword(newPassword);
    await User.findByIdAndUpdate(user._id,{password:hashedP});
    res.json(jsonGenerate(StatusCode.SUCCESS,"Password changed successfully!"))
    
  } catch (error) {
    res.send(jsonGenerate(StatusCode.SOMETHING_WENT_WRONG,"Something went wrong!", error))  
  }
}
