import mongoose , {Document, Schema} from " mongoose ";

export  interface IUser extends  Document{
    name?:string,
    email:string, 
    password:string,
    token?:string,
    downloadCount:number,
    uploadCount:number,
    createdAt:number,
    updatedAt:Date
}

    const userSchema= new Schema({
        name:{type:String},
        email:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        token:{type:string},
        uploadCount:{type:Number, default:0},
        downloadCount{type:Number, default:0},
    },
    timestamp:true)


const User: Model <IUser>= mongoose.model<IUser>("User", userSchema);
export default User; 