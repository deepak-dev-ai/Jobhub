import { NextRequest, NextResponse } from "next/server";
import prismaClient from "@/services/prisma";
import { createToken } from "@/services/jwt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const user = await prismaClient.user.findUnique({
    where: {
      email: body.email,
    },
  });
  if (user?.password == body?.password && user?.email) {
    const userTokenData = { id: user?.id, email: user?.email };
    const token = createToken(userTokenData);
    const res = NextResponse.json({
      success: true,
      data: user,
    });
    res.cookies.set("token", token);
    return res;
  } else {
    return NextResponse.json({
      success: false,
    });
  }
}
