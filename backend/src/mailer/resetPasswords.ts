import { transporter } from "../config/nodemailer";
import { IUser } from "../model/userSchema";
import dotenv from "dotenv";

dotenv.config();

export const resetPasswordEmail= async(user: IUser)=>{
    try {
        const options={
            from:process.env.Email,
            to:user.email,
            subject:"Reset Your Password",
            html:"<h1> reset you password</h1>",
        }
        await transporter.sendMail(options); 
        
    } catch (error) {
        console.error(`Error in sending reset password ${error}`)
    }
}