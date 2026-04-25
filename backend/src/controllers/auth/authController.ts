import {Request, Response, RequestHandler} from "express"
import User from "../../model/userSchema"
import {sendResponse} from "../../utils/sendResponse"

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
    const newUser= await User.create(
        {
            email,
            password
        }
    )
    // send respronse successfully 
   return  sendResponse(res,200, true ,"user added successfully ",{user:newUser})
}
catch(error){
    console.error(`Error in Signup ${error}`)
    //send a error response 
    return  sendResponse(res,500, false ," internal error ")
 }
}