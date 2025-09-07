import { sendResponse } from "@/services/helper";
import prismaClient from "@/services/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const data = await prismaClient.openings.create({
      data: body,
    });
    return sendResponse(true, data);
  } catch (err) {
    return sendResponse(false, { message: "something went wrong" });
  }
}
