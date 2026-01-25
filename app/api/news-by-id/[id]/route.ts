// app/api/news-by-id/[id]/route.ts
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await connectDB();

    const item = await News.findById(id);

    if (!item) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return Response.json(item, { status: 200 });
  } catch (error) {
    console.error("GET /api/news-by-id/[id] error:", error);
    return Response.json(
      { error: "Failed to fetch news item" },
      { status: 500 }
    );
  }
}
