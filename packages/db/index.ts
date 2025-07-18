import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { PrismaClient } from "./generated/prisma";

export const prismaClient = new PrismaClient();

export const PrismaClientError = PrismaClientKnownRequestError;
export const PrismaValidationError = PrismaClientValidationError;
