import express from "express";
import connectDb from "./config/db";
import dotenv from "dotenv"
const app= express();
dotenv.config();

connectDb(); // running the function from /config/db

const port= process.env.PORT || 3030;


app.listen(port, ()=>{
    console.log(` Server is running on the  port ${port}`)
})