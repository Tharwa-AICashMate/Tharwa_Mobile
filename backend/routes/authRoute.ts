import express from "express";
import {
  login,
  logout,
  signinWithProvider,
  signup,
} from "../controllers/authController.js";

const authRouter = express.Router();;
authRouter.post("/signup", signup);
authRouter.post("/provider_signin", signinWithProvider);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
