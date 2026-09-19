 import path from 'path';
 import dotenv from 'dotenv';
 dotenv.config();
import multer from 'multer';;
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';

const storage= new CloudinaryStorage({
cloudinary:cloudinary,
params: async (req, file)=>{
    const folder= "my-video-hub";
    const extension=path.extname(file.originalname);
    const baseName=path.basename(file.originalname,extension)
    const fileName=`${baseName}-${Date.now()}-${file.fieldname}`
    return{
        folder:folder,
        public_id:fileName,
        resource_type:file.fieldname === "video"? "video":"image",
    }
}

});

export const upload=multer({
    storage:storage,
    limits:{fileSize:100*1024*1024} // 100mb
}).fields([
    {name:"video",maxCount:1},
    {name:"thumbnail",maxCount:1},
])