import { sendResponse } from "@/services/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const x = await params;
  const jobId = x.id;

  try {
    const job = await prismaClient.openings.findUnique({
      where: {
        id: jobId,
      },
      include: {
        company: true,
      },
    });
    if (job) {
      return NextResponse.json({
        success: true,
        data: job,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "no job found",
      });
    }
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  try {
    await prismaClient.openings.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "deleted",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  const body = await req.json();

  try {
    const res = await prismaClient.openings.update({
      where: {
        id,
      },
      data: body,
    });
    return NextResponse.json({
      success: true,
      data: res,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}
