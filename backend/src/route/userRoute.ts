import express  from "express";
const router= express.Router();
import {getUserDetails} from "../controllers/User/userController"

router.get("/profile", getUserDetails)
export default router; 