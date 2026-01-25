import { connectDB } from "@/lib/mongodb"
import News from "@/models/News"

export async function GET() {
  try {
    await connectDB()

    const news = await News.find({ isPublished: true }).sort({
      publishedAt: -1,
    })

    return Response.json(news, { status: 200 })
  } catch (error) {
    console.error("GET /api/news error:", error)
    return Response.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    )
  }
}
