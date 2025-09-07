import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prismaClient from "./prisma";
import { verifyToken } from "./jwt";

export async function getUserFromCookies() {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;
  if (!token) {
    return null;
  }

  const data = verifyToken(token);
  if (!data || typeof data === "string" || !("id" in data)) {
    return null;
  }

  const user = await prismaClient.user.findUnique({
    where: {
      id: (data as { id: string }).id,
    },
    include: {
      company: true,
    },
    omit: {
      password: true,
    },
  });
  if (!user) {
    return null;
  }
  return user;
}

export function sendResponse(success: boolean, data: any) {
  return NextResponse.json({
    success,
    data,
  });
}
