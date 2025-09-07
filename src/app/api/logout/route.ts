import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const res = NextResponse.json({
    success: true,
    message: "logged out successfully",
  });
  res.cookies.delete("token");
  return res;
}
