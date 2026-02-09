import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectDB();

    const deleted = await News.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Notícia não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Notícia eliminada com sucesso" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /api/news/id/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}