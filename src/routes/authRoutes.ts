import express from "express";
import { signIn, signUp } from "../controllers/authController";
import validateRequest from "../middleware/validationMiddleware";
import { signInReqSchema, signUpReqSchema } from "../validation/authSchema";
const authRoutes = express.Router();

// /**
//  * @swagger
//  * /api/auth/signup:
//  *   post:
//  *     summary: Sign up a new user
//  *     tags: [Authentication]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           Req:
//  *             type: object
//  *             properties:
//  *               userName:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               password:
//  *                 type: string
//  *               role:
//  *                type: string
//  *     responses:
//  *       200:
//  *         description: User signed up successfully
//  *       400:
//  *         description: Invalid request body
//  *       500:
//  *         description: Internal server error
//  */
authRoutes.post("/signup", validateRequest(signUpReqSchema), signUp);

authRoutes.post("/signin", validateRequest(signInReqSchema), signIn);

export default authRoutes;
