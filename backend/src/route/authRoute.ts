import express from "express";
import { signUpUser } from "../controllers/auth/authController";
const router = express.Router();

router.post('/sign-up', signUpUser);

export default router;