import { Router } from "express";
import { findUser, updateUser } from "../service/user.service";

const userRoutes = Router();

userRoutes.get("/", findUser);
userRoutes.patch("/update", updateUser);

/**
 * @TODO
 * userRoutes.post("/loginotp", loginUsingOtpUser);
 * userRoutes.post("/forgotPassword", loginUser);
 * userRoutes.post("/verifyemail", verifyUserEmail);
 * export default userRoutes;
 */

export default userRoutes;
