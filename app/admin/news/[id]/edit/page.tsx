"use client";
import EditorToolbar from "@/components/EditorToolbar";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";


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
  const res = await fetch(`/api/news/id/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export default function AdminNewsEditPage() {
  const { id } = useParams();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // 1) Carregar item
  useEffect(() => {
    if (!id) return;
    fetchNewsItem(id as string).then(setItem);
  }, [id]);

  // 2) Criar editor SEM conteúdo inicial
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setItem((prev) =>
        prev ? { ...prev, content: editor.getHTML() } : prev
      );
    },
  });

  // 3) Quando item carregar → colocar conteúdo no editor
  useEffect(() => {
    if (item && editor) {
      editor.commands.setContent(item.content || "");
    }
  }, [item, editor]);

  if (!item || !editor) {
    return <p className="p-10">A carregar editor…</p>;
  }

  const updateField = (field: keyof NewsItem, value: any) => {
    setItem((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async () => {
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
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      {/* Título */}
      <input
        type="text"
        value={item.title}
        onChange={(e) => updateField("title", e.target.value)}
        className="w-full text-4xl font-bold bg-transparent outline-none border-none"
      />

      {/* Slug */}
      <input
        type="text"
        value={item.slug}
        onChange={(e) => updateField("slug", e.target.value)}
        className="w-full text-sm text-gray-400 bg-transparent outline-none border-none"
      />

      {/* Resumo */}
      <textarea
        value={item.excerpt}
        onChange={(e) => updateField("excerpt", e.target.value)}
        className="w-full bg-transparent outline-none border-none text-lg text-gray-300"
        rows={3}
      />

      {/* Editor TipTap */}
      <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
        <EditorToolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>

      {/* Publicado */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={item.isPublished}
          onChange={(e) => updateField("isPublished", e.target.checked)}
          className="w-5 h-5"
        />
        <span className="text-gray-300">Publicado</span>
      </div>

      {/* Botão guardar */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-[var(--accent)] text-black px-6 py-2 rounded font-bold"
      >
        {saving ? "A guardar..." : "Guardar alterações"}
      </button>

      {message && <p className="text-sm text-gray-400">{message}</p>}
    </div>
  );
}
