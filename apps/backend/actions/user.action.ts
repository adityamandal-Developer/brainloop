import { prismaClient } from "db";
import type { UPDATE_USER } from "../types/user.types";

//find one user
export const findUserAction = async (id: string) => {
  try {
    const user = await prismaClient.user.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        chats: true,
        uploaded_files: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

//update one user
export const updateUserAction = async (id: string, body: UPDATE_USER) => {
  try {
    const user = await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        name: body.name,
      },
      select: {
        name: true,
        updatedAt: true,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
