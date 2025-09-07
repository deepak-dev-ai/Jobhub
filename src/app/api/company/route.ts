import { getUserFromCookies } from "@/services/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "user not found",
    });
  }
  const body = await req.json();
  const company = {
    name: body.name,
    description: body.description,
    ownerId: user.id,
  };
  try {
    const newCompany = await prismaClient.company.create({
      data: company,
    });

    return NextResponse.json({
      success: true,
      data: newCompany,
    });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}
