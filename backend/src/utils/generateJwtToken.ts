import jwt from "jsonwebtoken";
import {IUser} from "../model/userSchema";
import dotenv from "dotenv";

dotenv.config();


export const generateWebToken= async(user: IUser):Promise<string>=>{
    const secretOrKey=process.env.JWT_Secret_Key as string;
    const jwtToken= await jwt.sign(
        {id:user._id,email:user.email},
        secretOrKey,
        {expiresIn:"1d"}

    )
    return jwtToken;
}