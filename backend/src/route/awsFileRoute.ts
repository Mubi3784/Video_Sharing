import express from "express";

import {upload} from "../middleware/videoUpload"
import {uploadFile} from "../controllers/aws/awsFileController";


const router=express.Router();
router.post("/uploadFile",upload, uploadFile );
export default router;
 