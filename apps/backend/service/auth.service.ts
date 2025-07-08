import type { NextFunction, Request, Response } from "express";
import { userLoginAction, userRegisterAction } from "../actions/auth.action";
import { loginUserSchema, registerUserSchema } from "validators";

//Register
export async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await registerUserSchema.safeParseAsync(req.body);
    if (!result.success) {
      next(result.error.message);
      return;
    }
    const user = await userRegisterAction({
      email: result.data.email,
      name: result.data.name,
      password: result.data.password,
    });

    res.status(200).send({ user: user, message: "Created" });
  } catch (error: any) {
    next(error);
  }
}

//login
export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await loginUserSchema.safeParseAsync(req.body);
    if (!result.success) {
      next(result.error.message);
      return;
    }
    const token = await userLoginAction({
      email: result.data.email,
      password: result.data.password,
    });

    if (!token) {
      throw new Error();
    }

    res
      .cookie("access_token", `Bearer ${token}`, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: true,
        // secure: true   TODO -> set to true in production
      })
      .status(200)
      .json({ message: "Logged in successfully" });
  } catch (error: any) {
    next(error);
  }
}
