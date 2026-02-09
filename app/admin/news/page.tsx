
type NewsItem = {
  _id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  createdAt: string;
};

async function getNews(): Promise<NewsItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/news`, {
    cache: "no-store",
  });
  return res.json();
}

import AdminNewsTable from "@/components/AdminNewsTable";

export default async function AdminNewsListPage() {
  const news = await getNews();

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Admin · Notícias</h1>

      <AdminNewsTable news={news} />
    </div>
  );
}


