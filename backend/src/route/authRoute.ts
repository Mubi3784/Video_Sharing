import express from "express";
import { signUpUser, signInUser } from "../controllers/auth/authController";
const router = express.Router();

router.post('/sign-up', signUpUser);
router.post('/sign-In', signInUser);

export default router;