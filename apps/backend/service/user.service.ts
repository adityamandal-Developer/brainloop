import type { Request, Response, NextFunction } from "express";
import { findUserAction, updateUserAction } from "../actions/user.action";

//find one specific user
export async function findUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      res.status(401).send({ message: "Invalid request" });
      return;
    }

    const user = await findUserAction(req.user.id);

    res.status(201).send({ message: "user found", user: user });
  } catch (error) {
    res.status(401).send({ message: "unauthorized request or user not found" });
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      res.status(401).send({ message: "Invalid request" });
      return;
    }
    console.log("update", req.user.id, req.body);
    const user = await updateUserAction(req.user.id, req.body.name);

    res.status(201).send({ message: "user updated", user: user });
  } catch (error) {
    res
      .status(401)
      .send({ message: "unauthorized request or unable to update user" });
  }
}
