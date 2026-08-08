import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("connected successfully");
    }
    catch(error){
        console.log(`got an error ${error}`);
    }
}

export default connectDB;