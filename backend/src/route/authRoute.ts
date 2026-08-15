import express from "express";
import { signUpUser, signInUser, sendEmailForResetPassword, updatePassword } from "../controllers/auth/authController";
const router = express.Router();

router.post('/signup', signUpUser);
router.post('/signin', signInUser);
router.post('/resetPassword',sendEmailForResetPassword);
router.post('/updatePassword/:token', updatePassword)

export default router; 