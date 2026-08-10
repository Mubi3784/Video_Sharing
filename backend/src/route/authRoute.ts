import express from "express";
import { signUpUser, signInUser, sendEmailForResetPassword } from "../controllers/auth/authController";
const router = express.Router();

router.post('/signup', signUpUser);
router.post('/signin', signInUser);
router.post('/resetPassword',sendEmailForResetPassword)

export default router; 