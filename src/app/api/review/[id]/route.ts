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
  const { id } = await params;

  try {
    const review = await prismaClient.review.findMany({
      where: {
        company_id: id,
      },
      include: {
        user: true,
      },
    });
    return NextResponse.json({
      success: true,
      data: review,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "sonmething went wrong",
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
    await prismaClient.review.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      success: true,
      message: "review deleted",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  const { content } = await req.json();

  try {
    const updatedReview = await prismaClient.review.update({
      where: {
        id: id,
      },
      data: {
        content: content,
      },
    });
    return NextResponse.json({
      success: true,
      data: updatedReview,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "something went wrong",
    });
  }
}
