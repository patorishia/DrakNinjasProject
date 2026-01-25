import { fetchAnimeNews } from "@/lib/fetchNews"

export async function GET() {
  const result = await fetchAnimeNews()

  if (result.error) {
    return Response.json(result, { status: 500 })
  }

  return Response.json(
    { message: "News updated", saved: result.saved },
    { status: 200 }
  )
}
