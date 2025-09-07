import prismaClient from "@/services/prisma";
import { getUserFromCookies } from "@/services/helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const user = await getUserFromCookies();
  const { id } = await params;

  if (!user) {
    return NextResponse.json({
      success: false,
      data: {
        message: "user is not authenticated",
      },
    });
  }

  const appToSave = {
    user_id: user?.id,
    job_id: id,
  };

  try {
    const application = await prismaClient.application.create({
      data: appToSave,
    });
    return NextResponse.json({
      success: true,
      data: application,
    });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({
      success: false,
      data: {
        message: "failed to create application",
      },
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getUserFromCookies();

  if (!user?.id) {
    return NextResponse.json(
      {
        success: false,
        data: { message: "Unauthorized" },
      },
      { status: 401 }
    );
  }

  try {
    await prismaClient.application.deleteMany({
      where: {
        user_id: user.id,
        job_id: id,
      },
    });

    return NextResponse.json({
      success: true,
      data: { message: "Deleted successfully" },
    });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      {
        success: false,
        data: { message: "Delete failed" },
      },
      { status: 500 }
    );
  }
}
