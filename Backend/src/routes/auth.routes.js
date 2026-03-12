import express from "express"
import { register } from "../controllers/auth.controller.js";
import { validateRegister } from "../validators/auth.validator.js";

const authRouter = express.Router()

//POST - api/auth/register
authRouter.post("/register", validateRegister, register)

export default authRouter