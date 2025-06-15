import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    } catch (error) {
        console.log(`Error connecting to database: ${error.message}`);
    }
}