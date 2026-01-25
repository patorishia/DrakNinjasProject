// app/admin/news/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";

type NewsItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  isPublished: boolean;
};

async function fetchNewsItem(id: string): Promise<NewsItem> {
  const res = await fetch(`/api/news-by-id/${id}`, { cache: "no-store" });
  return res.json();
}

async function updateNewsItem(id: string, data: Partial<NewsItem>) {
  const res = await fetch(`/api/news/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export default function AdminNewsEditPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [item, setItem] = useState<NewsItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchNewsItem(id).then(setItem);
  }, [id]);

  if (!item) {
    return <p className="p-10">A carregar…</p>;
  }

  const handleChange =
    (field: keyof NewsItem) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        field === "isPublished"
          ? (e as React.ChangeEvent<HTMLInputElement>).target.checked
          : e.target.value;

      setItem((prev) => (prev ? { ...prev, [field]: value } : prev));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const updated = await updateNewsItem(id, item);
    setSaving(false);

    if ((updated as any).error) {
      setMessage("Erro ao guardar.");
    } else {
      setMessage("Guardado com sucesso.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Editar notícia</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="block text-sm mb-1">Título</span>
          <input
            className="w-full bg-[var(--panel)] border border-gray-700 rounded px-3 py-2"
            value={item.title}
            onChange={handleChange("title")}
          />
        </label>

        <label className="block">
          <span className="block text-sm mb-1">Slug</span>
          <input
            className="w-full bg-[var(--panel)] border border-gray-700 rounded px-3 py-2"
            value={item.slug}
            onChange={handleChange("slug")}
          />
        </label>

        <label className="block">
          <span className="block text-sm mb-1">Imagem (URL)</span>
          <input
            className="w-full bg-[var(--panel)] border border-gray-700 rounded px-3 py-2"
            value={item.imageUrl ?? ""}
            onChange={handleChange("imageUrl")}
          />
        </label>

        <label className="block">
          <span className="block text-sm mb-1">Resumo (excerpt)</span>
          <textarea
            className="w-full bg-[var(--panel)] border border-gray-700 rounded px-3 py-2 h-20"
            value={item.excerpt}
            onChange={handleChange("excerpt")}
          />
        </label>

        <label className="block">
          <span className="block text-sm mb-1">Conteúdo (HTML ou texto)</span>
          <textarea
            className="w-full bg-[var(--panel)] border border-gray-700 rounded px-3 py-2 h-60"
            value={item.content}
            onChange={handleChange("content")}
          />
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={item.isPublished}
            onChange={handleChange("isPublished")}
          />
          <span>Publicado</span>
        </label>

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded bg-[var(--accent)] text-black font-semibold"
        >
          {saving ? "A guardar..." : "Guardar"}
        </button>

        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </div>
  );
}
