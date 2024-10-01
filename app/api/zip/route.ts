import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const zipCodes = await db.q1_zbp19totals.findMany();
    return NextResponse.json(zipCodes);
  } catch (error) {
    console.error("Error fetching zip codes:", error);
    return NextResponse.json(
      { error: "Failed to fetch zip codes" },
      { status: 500 }
    );
  }
}
