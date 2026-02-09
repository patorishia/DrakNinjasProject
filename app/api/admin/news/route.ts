import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const filter = searchParams.get("filter");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const sort = searchParams.get("sort") || "createdAt_desc";

    let query: any = {};

    if (filter === "published") query.isPublished = true;
    if (filter === "draft") query.isPublished = false;

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    let sortQuery: any = {};

    if (sort === "createdAt_desc") sortQuery = { createdAt: -1 };
    if (sort === "createdAt_asc") sortQuery = { createdAt: 1 };

    if (sort === "title_asc") sortQuery = { title: 1 };
    if (sort === "title_desc") sortQuery = { title: -1 };

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      News.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit),

      News.countDocuments(query),
    ]);

    return Response.json({
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("GET /api/admin/news error:", error);
    return Response.json({ error: "Erro ao carregar notícias" }, { status: 500 });
  }
}