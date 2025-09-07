import { getUserFromCookies } from "@/services/helper";
import prismaClient from "@/services/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUserFromCookies();
  if (!user) {
    return NextResponse.json({
      success: false,
      message: "user not found",
    });
  }
  const company = await prismaClient.company.findUnique({
    where: {
      ownerId: user.id,
    },
  });
  const data = {
    ...user,
    company,
  };

  return NextResponse.json({
    success: true,
    data: data,
  });
}
