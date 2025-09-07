import { sendResponse } from "@/services/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const res = await prismaClient.application.findMany({
      where: {
        job_id: id,
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json({
      success: true,
      data: res,
    });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({
      success: false,
      data: {
        message: "failed to find applicants",
      },
    });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const res = await prismaClient.application.delete({
      where: {
        id,
      },
    });
    return sendResponse(true, { message: "Application Deleted Successfully" });
  } catch (error) {
    return sendResponse(false, { message: "something went wrong" });
  }
}
