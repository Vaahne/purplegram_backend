import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const connectionStr = process.env.mongoURI;
// connecting to the database by mongouri from .env
async function connectDB(){
    try{
        await  mongoose.connect(connectionStr);
        console.log(`Connected to mongodb...`);
    }catch(err){
        console.error(err.message);
    }
}

export default connectDB;