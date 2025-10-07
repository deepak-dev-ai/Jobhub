import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/services/prisma";
import { sendResponse } from "@/services/helper";
import { createToken } from "@/services/jwt";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Hash the password before storing
  const hashedPassword = await bcrypt.hash(body.password, 10);

  const userToCreate = {
    email: body.email,
    password: hashedPassword,
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
      data: { id: user.id, email: user.email }, // Don't send password hash back
    });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  } catch (error) {
    return sendResponse(false, {
      message: "Failed to create user. Email may already exist.",
    });
  }
}
