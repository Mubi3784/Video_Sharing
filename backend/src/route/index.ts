import express from "express";
import authRoute from "../route/authRoute"
import passport from "passport";
import userRoute from "./userRoute"
const router = express.Router();



router.use('/auth', authRoute)

router.use('/user', passport.authenticate('jwt', { session: false }), userRoute)

export default router;