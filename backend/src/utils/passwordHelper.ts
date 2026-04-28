import bcrypt from "bcrypt";

export const hashPassword= async (originalPassword:string):Promise<string> =>{
    const hashed= await bcrypt.hash(originalPassword,10);
    return hashed;
}

export const comparePassword= async ( originalPassword:string,dbPassword:string):Promise<boolean>=>{
    const compare= await bcrypt.compare(originalPassword, dbPassword);
    return compare;
}