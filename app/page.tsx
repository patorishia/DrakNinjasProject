type NewsItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
};

async function getNews(): Promise<NewsItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, {
    cache: "no-store",
  });
  return res.json();
}


export default async function Home() {
  const news = await getNews();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
      {news.map((item: NewsItem) => (
        <a
          key={item._id}
          href={`/news/${item.slug}`}
          className="bg-[var(--panel)] p-4 rounded-lg border border-transparent hover:border-[var(--accent)] transition-all shadow hover:shadow-[var(--accent)]/40"
        >
          <h2 className="text-lg font-bold text-[var(--accent)] mb-2">
            {item.title}
          </h2>

          <p className="text-sm text-gray-300 mb-3">
            {item.excerpt}
          </p>

          <span className="text-xs text-gray-500">
            {new Date(item.publishedAt).toLocaleDateString("pt-PT")}
          </span>
        </a>
      ))}
    </div>
  );
}
