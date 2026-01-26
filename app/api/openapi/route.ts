import { NextResponse } from "next/server";
import { swaggerDocument } from "@/app/api/docs/swagger";

export async function GET() {
  return NextResponse.json(swaggerDocument);
}
