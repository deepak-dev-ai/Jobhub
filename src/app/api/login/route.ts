import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/services/prisma";
import { createToken } from "@/services/jwt";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const user = await prismaClient.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const userTokenData = { id: user.id, email: user.email };
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
    return NextResponse.json({
      success: false,
      message: "Login failed",
    });
  }
}
