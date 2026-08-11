import { transporter } from "../config/nodemailer";
import { IUser } from "../model/userSchema";
import dotenv from "dotenv";
import ejs from "ejs";
import path from "path";
 
dotenv.config();

export const resetPasswordEmail = async (user: IUser, token: string) => {
    try {
        const emailHtml = await ejs.renderFile(
            path.join(__dirname, "../view/resetPassword"),
            { token }
        );

        const options = {
            from: process.env.Email,
            to: user.email,
            subject: "Reset Your Password",
            html: emailHtml,
        };

        await transporter.sendMail(options);
    } catch (error) {
        console.error(`Error in sending reset password ${error}`);
    }
};