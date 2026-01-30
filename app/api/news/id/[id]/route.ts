import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ← AQUI ESTÁ A CORREÇÃO

    await connectDB();

    const data = await req.json();

    const updated = await News.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/news/id/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
