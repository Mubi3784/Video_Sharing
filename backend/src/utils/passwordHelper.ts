import bcrypt from "bcrypt";

export const hashPassword= async (originalPassword:string):Promise<string> =>{
    const hashed= await bcrypt.hash(originalPassword,10);
    return hashed;
}