import express from "express";
import connectDb from "./config/db";
import dotenv from "dotenv"
import routes from "./route/index"
const app= express();
dotenv.config();

connectDb(); // running the function from /config/db

const port= process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/v1', routes)

app.listen(port, ()=>{
    console.log(` Server is running on the  port ${port}`)
})