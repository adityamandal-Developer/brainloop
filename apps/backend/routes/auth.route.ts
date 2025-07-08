import { Router } from "express";
import { loginUser, registerUser } from "../service/auth.service";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

/**
 * @TODO
 * authRouter.post("/loginotp", loginUsingOtpUser);
 * authRouter.post("/forgotPassword", loginUser);
 * authRouter.post("/verifyemail", verifyUserEmail);
 * export default authRouter;
 */

export default authRouter;
