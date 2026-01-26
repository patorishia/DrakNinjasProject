// app/api/news-by-id/[id]/route.ts
import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";


/**
 * GET /api/news-by-id/[id]
 *
 * Fetches a news article by MongoDB ObjectId.
 * Used exclusively by the admin panel for editing.
 *
 * ## Params
 * - `id` — MongoDB document ID.
 *
 * ## Returns
 * - 200 → JSON with the news article.
 * - 404 → `{ error: "Not found" }`
 * - 500 → `{ error: "Failed to fetch news item" }`
 */


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
