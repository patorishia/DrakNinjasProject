import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

export async function POST(req: Request) {
  try {
    await connectDB();

    const data = await req.json();

    const exists = await News.findOne({ slug: data.slug });
    if (exists) {
      return NextResponse.json(
        { error: "Slug já existe" },
        { status: 400 }
      );
    }

    const created = await News.create(data);

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("POST /api/news/create error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}