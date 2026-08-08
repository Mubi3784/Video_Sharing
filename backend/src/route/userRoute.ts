import express from "express";
const router = express.Router();
import { getUserDetails, updateUser } from "../controllers/User/userController"

router.get("/profile", getUserDetails)
router.post("/update", updateUser);
export default router; 