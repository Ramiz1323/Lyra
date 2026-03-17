import express from "express";
import { signup, verifyEmail, login, getMe } from "../controllers/auth.controller.js";
import { validateRegister, validateLogin  } from "../validators/auth.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

/** 
 @route POST /api/auth/signup
 @desc Register a new user
 @access Public
 @body { username, email, password }
*/
authRouter.post("/signup", validateRegister, signup);

/** 
 @route GET /api/auth/verify-email
 @desc Verify user's email address
 @access Public
 @query { token }
*/
authRouter.get("/verify-email", verifyEmail);

/**
 @route POST /api/auth/login
 @desc Login a user
 @access Public
 @body { email, password }
 */
authRouter.post("/login", validateLogin, login);

/**
    @route GET /api/auth/profile
    @desc Get user profile
    @access Private
    @middleware authUser
 */
authRouter.get("/profile", authUser, getMe)


export default authRouter;
