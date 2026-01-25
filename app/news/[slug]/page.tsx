type NewsItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  imageUrl?: string;
};

async function getNews(slug: string): Promise<NewsItem> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news/${slug}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function NewsPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const item = await getNews(slug);

  return (
    <article className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-[var(--accent)] mb-4">
        {item.title}
      </h1>

      <p className="text-gray-400 text-sm mb-6">
        {new Date(item.publishedAt).toLocaleDateString("pt-PT")}
      </p>

      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full rounded mb-6"
        />
      )}

      <div
        className="prose prose-invert"
        dangerouslySetInnerHTML={{ __html: item.content ?? "" }}
      />
    </article>
  );
}
