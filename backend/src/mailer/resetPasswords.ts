import { transporter } from "../config/nodemailer";
import { IUser } from "../model/userSchema";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
 
dotenv.config();

export const resetPasswordEmail = async (user: IUser, token: string) => {
    
        const emailHtml = await ejs.renderFile(
            path.join(__dirname, "../view/resetPassword.ejs"),
            { token }
        );

        const options = {
            from: process.env.Email,
            to: user.email,
            subject: "Reset Your Password",
            html: emailHtml,
        };

        await transporter.sendMail(options);
     
};