import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

/**
 * GET /api/news/[slug]
 *
 * Fetches a single news article by its slug.
 *
 * ## Params
 * - `slug` — URL-friendly identifier generated from the title.
 *
 * ## Returns
 * - 200 → JSON with the news article.
 * - 404 → `{ error: "Not found" }`
 * - 500 → `{ error: "Failed to fetch news item" }`
 *
 * ## Notes
 * - Used by the public-facing news page `/news/[slug]`.
 * - Slugs must be unique.
 */


export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  await connectDB();

  const item = await News.findOne({ slug });

  if (!item) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(item, { status: 200 });
}

