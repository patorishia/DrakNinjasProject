"use client";

import EditorToolbar from "@/components/EditorToolbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import Image from "@tiptap/extension-image";


function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
    .replace(/[^a-z0-9]+/g, "-") // troca tudo por hífen
    .replace(/^-+|-+$/g, ""); // remove hífens do início/fim
}

export default function CreateNewsPage() {
  const router = useRouter();

  const [item, setItem] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    isPublished: false,
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
    ],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setItem(prev => ({ ...prev, content: editor.getHTML() }));
    },
  });

  const updateField = (field: string, value: any) => {
    setItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/news/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...item,
        image, 
      })

    });

    const data = await res.json();
    setSaving(false);

    if (data.error) {
      setMessage("Erro ao criar notícia.");
    } else {
      setMessage("Notícia criada com sucesso!");
      router.push(`/admin/news/${data._id}/edit`);
    }
  };


  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Criar Nova Notícia</h1>
      {/* Imagem de capa */}
      <label className="block text-sm font-medium mb-1">Imagem de capa</label>
      <input
        type="text"
        placeholder="URL da imagem"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full p-2 rounded bg-[#111] border border-red-600/40"
      />

      {/* Título */}
      <input
        type="text"
        value={item.title}
        onChange={(e) => {
          const title = e.target.value;
          updateField("title", title);
          updateField("slug", generateSlug(title));
        }}
        placeholder="Título"
        className="w-full text-4xl font-bold bg-transparent outline-none border-none"
      />

      {/* Slug */}
      <input
        type="text"
        value={item.slug}
        onChange={(e) => updateField("slug", e.target.value)}
        placeholder="slug-da-noticia"
        className="w-full text-sm text-gray-400 bg-transparent outline-none border-none"
      />

      {/* Resumo */}
      <textarea
        value={item.excerpt}
        onChange={(e) => updateField("excerpt", e.target.value)}
        placeholder="Resumo da notícia..."
        className="w-full bg-transparent outline-none border-none text-lg text-gray-300"
        rows={3}
      />

      {/* Editor TipTap */}
      <div className="bg-black/20 border border-gray-700 rounded-lg p-4">
        {editor && <EditorToolbar editor={editor} />}
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
        {saving ? "A criar..." : "Criar notícia"}
      </button>

      {message && <p className="text-sm text-gray-400">{message}</p>}
    </div>
  );
}