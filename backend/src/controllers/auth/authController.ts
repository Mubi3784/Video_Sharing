import {Request, Response, RequestHandler} from "express"
import User from "../../model/userSchema"
import {sendResponse} from "../../utils/sendResponse"
import { generateWebToken } from "../../utils/generateJwtToken";
import crypto from "crypto";
import { hashPassword , comparePassword} from "../../utils/passwordHelper";

interface RegisterReq extends Request{
    body:{
        email: string,
        password: string
    }
}
//
export const signUpUser = async(req:RegisterReq,res:Response)=>{
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


export const signInUser: RequestHandler= async(req:RegisterReq, res:Response)=>{
    try {
        const { email, password}= req.body;
        const user= await User.findOne({email})
        if(!user){
            return  sendResponse(res,404, false , "User doesnot exists")
        }
        const matchPassword= await comparePassword(password, user.password)
        if(!matchPassword){
            return sendResponse(res,404,false,"Invalid Username and Password")
        }
        const jwtToken= await generateWebToken;
        sendResponse(res,200,true,"loggin successfully ",{user:jwtToken})
        
    } catch (error) {
        console.error(`Error in autentication ${error}`);
        return sendResponse(res,500,false,"Internal server error");
        
    }
}
