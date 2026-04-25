import {Request, Response, RequestHandler} from "express"
import User from "../../model/userSchema"
import {sendResponse} from "../../utils/sendResponse"
import crypto from "crypto";
import { hashPassword } from "../../utils/passwordHelper";

interface RegisterReq extends Request{
    body:{
        email: string,
        password: string
    }
}

export const signUpUser: RequestHandler= async(req:RegisterReq,res:Response)=>{
 try{
    const {email, password}= req.body;
    const existingUser= await User.findOne({email});
    if(existingUser){
        return sendResponse(res,400,false,"User already exists")
    }

    // making the password hashed before saving to database 
    const hashedPassword= await hashPassword(password);
    // we have romove this " const user ="
      await User.create(
        {
            email,
            password: hashedPassword,
            token:crypto.randomBytes(16).toString("hex")
        }
    )
    // send respronse successfully 
   return  sendResponse(res,200, true ,"user added successfully ") // here we remove this{user: newUser}
}
catch(error){
    console.error(`Error in Signup ${error}`)
    //send a error response 
    return  sendResponse(res,500, false ," internal error ")
 }
}