import express from "express";
import { signUpUser } from "../controllers/auth/authController";
const router = express.Router();

router.use('/sign-up',signUpUser);

export default router;