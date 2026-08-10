 import nodemailer from "nodemailer";
 import dotenv from 'dotenv';
 dotenv.config();

 export const transporter= nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user: process.env.Email as  string,
        pass: process.env.EmailPassword as string,
    },
 })