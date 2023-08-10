import { comparePassword, hashPassword } from "../utils/authHelpers.js";

import Jwt from "jsonwebtoken"
import Order from "../models/order.js"
import { StatusCode } from "../utils/constants.js";
import User from "../models/users.js"
import { jsonGenerate } from "../utils/helpers.js";
import {validationResult} from "express-validator"

export const Login =async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email){
            return res.send(jsonGenerate(StatusCode.MISSING_FIELD,"Email is required")) 
        }
        if(!password){
            return res.send(jsonGenerate(StatusCode.MISSING_FIELD,"Password is required")) 
        }
        const errors = validationResult(req);
        if(errors.isEmpty()){
            const user = await User.findOne({email})
            if(user){
                const verify = await comparePassword(password,user.password)
                if(verify){
                    const JWT_TOKEN = process.env.JWT_TOKEN_SECRET
                    const token=Jwt.sign({userId:user._id},JWT_TOKEN,{
                        expiresIn:"7d"
                    })
                    res.json(jsonGenerate(StatusCode.SUCCESS,"Login Successful",{user,token:token}))
                }
                return res.json(jsonGenerate(StatusCode.WRONG_CREDENTIALS,"Wrong Password"))
            }
            return res.json(jsonGenerate(StatusCode.USER_DOES_NOT_EXIST,"No such user found"))
        }
        return res.send(jsonGenerate(StatusCode.VALIDATION_ERROR,"Validation error",errors.mapped()))
    } catch (error) {
        res.send(jsonGenerate(StatusCode.SOMETHING_WENT_WRONG,"Error in Login", error))  
    }    
}

export const UpdateProfile = async(req,res)=>{
    // try {
    //     console.log(req.body)
    //     const {name, address,phone, email, password} = req.body;
    //     const user = await User.findById(req.user._id)
        
    //     const errors = validationResult(req)
    //     if(errors){
    //         res.status(400).send({
    //             success:false,
    //             message:"Validation error",
    //             error:errors.mapped()
    //         })
    //     }
    //     const hashedP = password ? await hashPassword(password) : undefined
    //     console.log('hi')
    //     console.log(password)
    //     const updatedUser = await User.findByIdAndUpdate(req.user._id,{
    //         name:name || user.name,
    //         password: hashedP || user.password,
    //         phone: phone || user.phone,
    //         address:address|| user.address
    //     },{
    //         new:true
    //     }
    //     )
    //     console.log('hi')
    //     res.status(200).send({
    //         success:true,
    //         message:"User updated successfully",
    //         updatedUser
    //     })
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).send({
    //         error,
    //         success:false,
    //         message:"Error in Updating"
    //     })
    // }
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await User.findById(req.user.userId);
        console.log(req)
        console.log(req.user)

            //password
        if (password && password.length < 6) {
          return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await User.findByIdAndUpdate(
          req.user.userId,
          {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,
          },
          { new: true }
        );
        res.status(200).send({
          success: true,
          message: "Profile Updated SUccessfully",
          updatedUser,
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error WHile Update profile",
          error,
        });
      }
}

export const GetOrders = async(req,res)=>{
  try {
    const orders = await Order.find({buyer:req.user.userId})
    .populate("products","-photo")
    .populate("buyer","name");
    res.send(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error getting your orders",
      error
    })
  }
}

export const GetAllOrders = async(req,res)=>{
  try {
    const orders = await Order.find({})
    .populate("products","-photo")
    .populate("buyer","name")
    .sort({createdAt:"-1"})
    res.send(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"Error getting your orders",
      error
    })
  }
}

export const OrderStatus = async(req,res)=>{
  try {
    const {orderId} = req.params
    const {status} = req.body
    const orders = await Order.findByIdAndUpdate(orderId,{
      status
    },{
      new:true
    })
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message:"Error while Updating order",
      error,
      success:false
    })
  }
  
  
}