import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

export async function GET() {
  try {
    await connectDB();

    const news = await News.find().sort({ createdAt: -1 });

    return Response.json(news, { status: 200 });
  } catch (error) {
    console.error("GET /api/admin/news error:", error);
    return Response.json(
      { error: "Failed to fetch admin news" },
      { status: 500 }
    );
  }
}