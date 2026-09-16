import express from "express";
import authRoute from "../route/authRoute"
import passport from "passport";
import userRoute from "./userRoute"
import awsFileRouter from "./awsFileRoute"
const router = express.Router();



router.use('/auth', authRoute)

router.use('/user', passport.authenticate('jwt', { session: false }), userRoute)

router.use("/aws",passport.authenticate('jwt', { session: false }),awsFileRouter)

export default router;