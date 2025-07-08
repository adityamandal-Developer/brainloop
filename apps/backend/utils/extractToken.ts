import { TokenError } from "./customErrors";

export const extractToken = async (cookies: string) => {
  const findToken = cookies
    ?.split("; ")
    .find((token) => token.startsWith("access_token="));

  if (!findToken) {
    throw new TokenError();
  }

  try {
    const token = decodeURIComponent(findToken);
    if (!token || !token.startsWith("access_token=Bearer")) {
      throw new TokenError();
    }
    const encodedToken = token.split(" ")[1]c;

    if (!encodedToken) {
      throw new TokenError();
    }

    return encodedToken;
  } catch (error) {
    return null;
  }
};
