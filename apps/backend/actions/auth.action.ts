import { prismaClient } from "db";
import { comparePassword, hashPassword, signAccessToken } from "auth";
import { AuthenticationError } from "../utils/customErrors";
import type {
  type_body_login,
  type_body_registration,
} from "../types/auth.types";

//Register user
export const userRegisterAction = async (body: type_body_registration) => {
  const hash = await hashPassword(body.password);
  const user = await prismaClient.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: hash,
    },
    select: {
      email: true,
      name: true,
      id: true,
    },
  });

  return user;
};

//login user
export const userLoginAction = async (body: type_body_login) => {
  const user = await prismaClient.user.findUniqueOrThrow({
    where: {
      email: body.email,
    },
    select: {
      email: true,
      name: true,
      id: true,
      password: true,
    },
  });
  const valid = await comparePassword(body.password, user.password);
  if (!valid) {
    throw new AuthenticationError("Invalid email or password");
  }
  const token = await signAccessToken({
    name: user.name,
    email: user.email,
    id: user.id,
  });

  return token;
};
