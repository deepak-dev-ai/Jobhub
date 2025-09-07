import { getUserFromCookies } from "@/services/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await getUserFromCookies();
  const body = await req.json();
  if (!user) {
    return NextResponse.json({
      success: false,
      message: "user not authenticated",
    });
  }
  const dataToSave = {
    ...body,
    user_id: user.id,
  };
  try {
    const review = await prismaClient.review.create({
      data: dataToSave,
    });
    return NextResponse.json({
      success: true,
      data: review,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}
