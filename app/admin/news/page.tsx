
import AdminNewsTable from "@/components/AdminNewsTable";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import SortButtons from "@/components/SortButtons";

type NewsItem = {
  _id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  createdAt: string;
};

async function getNews(filter: string, page: number, search: string, sort: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/news?filter=${filter}&page=${page}&limit=10&search=${search}&sort=${sort}`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function AdminNewsListPage({ searchParams }: any) {
  const params = await searchParams;

  const filter = params.filter || "all";

  const search = params.search || "";

  const page = parseInt(params.page || "1");

  const sort = params.sort || "createdAt_desc";

  const data = await getNews(filter, page, search, sort);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Admin · Notícias</h1>

      <Filters current={filter} />

      <SearchBar currentFilter={filter} />

      <SortButtons />

      <AdminNewsTable news={data.items} />

      <Pagination
        page={data.page}
        pages={data.pages}
        filter={filter}
      />
    </div>
  );
}

