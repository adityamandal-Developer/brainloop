// middleware/errorHandler.ts
import type { Request, Response, NextFunction } from "express";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "../../../packages/db/generated/prisma/runtime/library";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("here Error occurred:", err);

  // Handle Prisma errors
  if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        res.status(400).json({
          message: "A user with this email already exists",
        });
        return;
      case "P2025":
        res.status(404).json({
          message: "Record not found",
        });
        return;
      case "P2003":
        res.status(400).json({
          message: "Invalid reference to related record",
        });
        return;
      case "P2014":
        res.status(400).json({
          message: "Invalid ID provided",
        });
        return;
      default:
        res.status(500).json({
          message: "Database operation failed",
        });
        return;
    }
  }

  // Handle Prisma validation errors
  if (err instanceof PrismaClientValidationError) {
    res.status(400).json({
      message: "Invalid data provided",
    });
    return;
  }

  // Handle custom JSON error messages (your current pattern)
  if (err.message && typeof err.message === "string") {
    try {
      const parsed = JSON.parse(err.message);
      res.status(401).json(parsed);
      return;
    } catch {
      // Not a JSON string, continue to default handling
    }
  }

  // Handle validation errors from express-validator or joi
  if (err.name === "ValidationError") {
    res.status(400).json({
      message: "Validation failed",
    });
    return;
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    res.status(401).json({
      message: "Invalid token",
    });
    return;
  }
  if (err.name === "AuthenticationError") {
    res.status(401).json({
      message: "Invalid email or password",
    });
    return;
  }

  if (err.name === "TokenExpiredError") {
    res.status(401).json({
      message: "Token expired",
    });
    return;
  }

  if (err.name === "CookieError") {
    res.status(401).json({
      message: "Invalid cookie",
    });
    return;
  }

  if (err.name === "TokenError") {
    res.status(401).json({
      message: "Invalid token",
    });
    return;
  }
  // Default fallback
  const statusCode = err.statusCode || err.status || 500;

  const error = JSON.parse(err);

  const message = err.message || error[0].message || "Something went wrong";

  res.status(statusCode).json({
    message: message,
  });
};
