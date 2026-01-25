import { connectDB } from "@/lib/mongodb";
import News from "@/models/News";

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

