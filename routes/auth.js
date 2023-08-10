import {AuthMiddleware, IsAdmin} from "../middlewares/authorization.js";
import { GetAllOrders, GetOrders, Login, OrderStatus, UpdateProfile } from "../controllers/login.js";

import { ForgotPassword } from "../controllers/forgotPassword.js";
import { LoginSchema } from "../validation/login.js";
import { Register } from "../controllers/register.js";
import { RegisterSchema } from "../validation/register.js";
import { Test } from "../controllers/test.js";
import { UpdateSchema } from "../validation/update.js";
import express from "express";

const router = express.Router();

router.post('/register',RegisterSchema ,Register)
router.post('/login', LoginSchema, Login)
router.post('/forgot-password', ForgotPassword  )
router.post('/test',AuthMiddleware , IsAdmin ,Test)
router.get('/user-auth',AuthMiddleware,(req,res)=>{
    res.status(200).send({ok:true})
})
router.get('/admin-auth',AuthMiddleware,IsAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

router.put('/profile', AuthMiddleware,UpdateProfile)

router.get('/orders', AuthMiddleware, GetOrders)
router.get('/all-orders', AuthMiddleware,IsAdmin, GetAllOrders)
router.put('/order-status/:orderId', AuthMiddleware,IsAdmin, OrderStatus)


export default router;