import { getUserFromCookies } from "@/services/helper";
import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;
    const company = await prismaClient.company.findUnique({
      where: {
        id,
      },
      include: {
        owner: true,
        jobs: true,
      },
    });
    return NextResponse.json({
      success: true,
      data: company,
    });
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
  const user = await getUserFromCookies();

  if (user?.company?.id == id) {
    await prismaClient.company.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "company deleted successfully",
    });
  }
  return NextResponse.json({
    success: false,
    message: "something went wrong",
  });
}
