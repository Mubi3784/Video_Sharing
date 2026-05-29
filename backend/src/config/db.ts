import dotenv from 'dotenv';
import mongoose, { connect } from 'mongoose';

dotenv.config();

const connectDB= async ()=>{
    try{
        const db=mongoose.connect(process.env.MONGO_URI as string);
        console.log("connect successfully")
    }
    catch(error){
        console.log(`got an error ${error}`);
    }
}

export default connectDB;