import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/services/prisma";
import { sendResponse } from "@/services/helper";
import { createToken } from "@/services/jwt";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const userToCreate = {
    email: body.email,
    password: body.password,
  };
  try {
    const user = await prismaClient.user.create({
      data: userToCreate,
    });
    const userTokenData = {
      id: user.id,
      email: user.email,
    };
    const token = createToken(userTokenData);
    const res = NextResponse.json({
      success: true,
      data: user,
    });
    res.cookies.set("token", token);
    return res;
  } catch (error) {
    return sendResponse(false, { message: "something went wrong" });
  }
}
