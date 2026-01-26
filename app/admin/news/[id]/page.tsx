"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

export default function AdminNewsEditPage() {
  const { id } = useParams(); // ← AQUI ESTÁ A SOLUÇÃO
  const [item, setItem] = useState<NewsItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) return;
    fetchNewsItem(id as string).then(setItem);
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

    const updated = await updateNewsItem(id as string, item);
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
        {/* resto igual */}
      </form>
    </div>
  );
}
