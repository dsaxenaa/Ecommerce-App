import CategoryRoutes from "./routes/category.js"
import ProductRoutes from "./routes/product.js"
import colors from "colors"
import { connectDB } from "./config/db.js"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import morgan from 'morgan'
import path from 'path'
import router from "./routes/auth.js"

//env config
dotenv.config()
// rest object
const app =express()
//Db connection
connectDB();
//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use(
    express.urlencoded()
);
app.use(express.static(path.join(__dirname, './client/build')))

const PORT = process.env.PORT
const mode = process.env.DEV_MODE

//routes
app.use('/api/v1/auth',router)
app.use('/api/v1/category', CategoryRoutes)
app.use('/api/v1/products', ProductRoutes)

//rest api
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
//PORT listening
app.listen(PORT,()=>{
    console.log(`Server is running on ${mode} mode on port ${PORT}`.bgCyan.white)
})