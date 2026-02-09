import Hero from "@/components/Hero";
import NewsCard from "@/components/NewsCard";

type NewsItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  image?: string; // ← agora a API devolve isto
};

async function getNews(): Promise<NewsItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export default async function Home() {
  const news = await getNews();

  const latest = news.slice(0, 2); // últimas 2 notícias

  return (
    <>
      <Hero />

      <section className="py-10">
        <h2 className="text-2xl font-bold text-[var(--accent)] mb-6 uppercase text-center">
          Últimas Notícias
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto justify-center">
          {latest.map((item) => (
            <NewsCard
              key={item._id}
              title={item.title}
              slug={item.slug}
              date={new Date(item.publishedAt).toLocaleDateString("pt-PT")}
              image={item.image} // ← agora funciona
            />
          ))}
        </div>
      </section>
    </>
  );
}