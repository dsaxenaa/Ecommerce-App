import colors from 'colors'
import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.URL)
        console.log(`Connected to the Database ${conn.connection.host}`.bgGreen.white)

        
    } catch (error) {
        console.log(`Error in MongoDb ${error}`.bgRed.white)
        
    }
}