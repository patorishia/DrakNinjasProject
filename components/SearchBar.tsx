"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ currentFilter }: { currentFilter: string }) {
  const router = useRouter();
  const params = useSearchParams();

  const [value, setValue] = useState(params.get("search") || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const query = new URLSearchParams();

    query.set("filter", currentFilter);
    query.set("page", "1");

    if (value.trim() !== "") {
      query.set("search", value.trim());
    }

    router.push(`/admin/news?${query.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
      <input
        type="text"
        placeholder="Pesquisar por título..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="px-3 py-2 rounded bg-gray-800 text-gray-200 w-full"
      />

      <button
        type="submit"
        className="px-4 py-2 bg-[var(--accent)] text-black rounded active:scale-95 transition"
      >
        Pesquisar
      </button>
    </form>
  );
}