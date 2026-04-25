import express from "express";
import authRoute from "../route/authRoute"
const router = express.Router();


router.use('/auth',authRoute)

export default router;