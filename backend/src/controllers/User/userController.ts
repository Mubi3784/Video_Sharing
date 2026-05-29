import User from "../../model/userSchema";
import { sendResponse } from "../../utils/sendResponse";
import { AuthenticatedRequest, AuthenticatedRequestHandler } from "../../config/passportJwtStrategy";


export const  getUserDetails:AuthenticatedRequestHandler= async ( req , res )=>{
    try {
        if(req.user instanceof User){
             const userId=req.user._id;
             if(!userId){
               return sendResponse(res,404,false,"Please SignUp to continue");
             }
             const user= await User.findById(userId).select("-password");
             if(!user){
                return sendResponse(res, 400, false, "User not found");
             }
             sendResponse(res, 200, true, "User details found ")
        }
    } catch (error) {
        console.error(`error Occur ${error}`)
        sendResponse(res,500,false,"Some issues in backend")
    }
}

