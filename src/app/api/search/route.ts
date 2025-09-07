import prismaClient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const q = (searchParams.get("q") ?? "").trim();
  const jt = searchParams.get("jt");
  const et = searchParams.get("et");
  const ms = searchParams.get("ms")
    ? Number(searchParams.get("ms"))
    : undefined;
  const page = Number.parseInt(searchParams.get("page") ?? "1");
  const limit = 10;

  const where: any = {
    AND: [],
  };

  if (q) {
    where.AND.push({
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { company: { name: { contains: q, mode: "insensitive" } } },
      ],
    });
  }

  if (jt) where.AND.push({ job_type: jt });
  if (et) where.AND.push({ employment_type: et });
  if (ms) where.AND.push({ salary: { gte: ms } });

  const [data, total] = await Promise.all([
    prismaClient.openings.findMany({
      where,
      include: { company: true },
      take: limit,
      skip: (page - 1) * limit,
    }),
    prismaClient.openings.count({ where }),
  ]);

  return NextResponse.json({
    success: true,
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
