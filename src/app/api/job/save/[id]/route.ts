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

  const jobToSave = {
    user_id: user?.id,
    job_id: id,
  };

  try {
    const save = await prismaClient.saved_jobs.create({
      data: jobToSave,
    });
    return NextResponse.json({
      success: true,
      data: save,
    });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({
      success: false,
      data: {
        message: "failed to save job",
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
    await prismaClient.saved_jobs.deleteMany({
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
