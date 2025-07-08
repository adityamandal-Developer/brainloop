import bcrypt from "bcrypt";
import { sign, verify } from "paseto-ts/v4";

// hash password
export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
};

//compare password
export const comparePassword = async (password: string, hash: string) => {
  const valid = await bcrypt.compare(password, hash);
  if (valid) {
    return valid;
  } else {
    return false;
  }
};

type PAYLOAD = {
  name: string;
  id: string;
  email: string;
};

export const signAccessToken = async (payload: PAYLOAD): Promise<string> => {
  const key = process.env.SECRET_KEY;

  if (key === undefined || key === null) {
    throw new Error("key or payload missing");
  }
  const currentDate = new Date();
  const oneDayExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return sign(key, {
    ...(payload as any),
    iat: currentDate,
    exp: oneDayExpiry,
  });
};

export const verifyToken = async (token: string) => {
  try {
    if (!process.env.PUBLIC_KEY) {
      return;
    }
    const { payload } = verify(process.env.PUBLIC_KEY, token);
    return { payload };
  } catch (error: any) {
    return null;
  }
};
