"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function SortButtons() {
  const router = useRouter();
  const params = useSearchParams();

  const filter = params.get("filter") || "all";
  const search = params.get("search") || "";
  const page = params.get("page") || "1";
  const sort = params.get("sort") || "createdAt_desc";

  function updateSort(newSort: string) {
    const query = new URLSearchParams();

    query.set("filter", filter);
    query.set("page", page);
    if (search) query.set("search", search);
    query.set("sort", newSort);

    router.push(`/admin/news?${query.toString()}`);
  }

  return (
    <div className="flex gap-3 mb-4">
      <button
        onClick={() => updateSort("createdAt_desc")}
        className={`px-3 py-1 rounded ${sort === "createdAt_desc" ? "bg-[var(--accent)] text-black" : "bg-gray-800 text-gray-300"}`}
      >
        Mais Recentes
      </button>

      <button
        onClick={() => updateSort("createdAt_asc")}
        className={`px-3 py-1 rounded ${sort === "createdAt_asc" ? "bg-[var(--accent)] text-black" : "bg-gray-800 text-gray-300"}`}
      >
        Mais Antigos
      </button>

      <button
        onClick={() => updateSort("title_asc")}
        className={`px-3 py-1 rounded ${sort === "title_asc" ? "bg-[var(--accent)] text-black" : "bg-gray-800 text-gray-300"}`}
      >
        Título A–Z
      </button>

      <button
        onClick={() => updateSort("title_desc")}
        className={`px-3 py-1 rounded ${sort === "title_desc" ? "bg-[var(--accent)] text-black" : "bg-gray-800 text-gray-300"}`}
      >
        Título Z–A
      </button>
    </div>
  );
}