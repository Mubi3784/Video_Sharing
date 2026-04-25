import express from "express";
const router= express.Router();
import authRoute from "../route/authRoute";

router.use('/auth',authRoute)

export default router;