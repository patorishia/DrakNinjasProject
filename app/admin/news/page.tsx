// app/admin/news/page.tsx
"use client";

type NewsItem = {
  _id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  createdAt: string;
};

async function getNews(): Promise<NewsItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function AdminNewsListPage() {
  const news = await getNews();

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Admin · Notícias</h1>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left py-2">Título</th>
            <th className="text-left py-2">Slug</th>
            <th className="text-left py-2">Publicado</th>
            <th className="text-left py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item) => (
            <tr key={item._id} className="border-b border-gray-800">
              <td className="py-2 pr-4">{item.title}</td>
              <td className="py-2 pr-4 text-xs text-gray-400">
                {item.slug}
              </td>
              <td className="py-2 pr-4">
                {item.isPublished ? "✅" : "❌"}
              </td>
              <td className="py-2">
                <a
                  href={`/admin/news/${item._id}/edit`}
                  className="text-[var(--accent)] underline"
                >
                  Editar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
