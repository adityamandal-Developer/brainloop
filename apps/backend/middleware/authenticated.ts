import type { Request, Response, NextFunction } from "express";
import { CookieError, TokenError } from "../utils/customErrors";
import { verifyToken } from "auth";
import { extractToken } from "../utils/extractToken";

//middleware to verify token and add user to context
export const authenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    throw new CookieError();
  }

  const encodedToken = await extractToken(cookies);

  if (!encodedToken) {
    throw new TokenError();
  }
  const payload = await verifyToken(encodedToken);

  if (!payload) {
    throw new TokenError();
  }

  req.user = {
    id: payload.payload.id,
    email: payload.payload.email,
    name: payload.payload.name,
    iat: payload.payload.iat,
    exp: payload.payload.exp,
  };

  next();
};
