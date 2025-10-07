import jwt from "jsonwebtoken";

type userTokenData = {
  id: string;
  email: string;
};

export function createToken(data: userTokenData) {
  // Add 7 days expiration to token
  const token = jwt.sign(data, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
  return token;
}

export function verifyToken(token: string) {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET as string);
    return data;
  } catch {
    return null;
  }
}
