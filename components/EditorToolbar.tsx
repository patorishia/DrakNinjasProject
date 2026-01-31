"use client";
import type { Editor } from "@tiptap/core";

export default function EditorToolbar({ editor }: { editor: Editor }) {
    if (!editor) return null;

    const button = "px-3 py-1 rounded text-sm border border-gray-700 hover:bg-gray-700/40";
    const active = "bg-gray-700 text-white";

    return (
        <div className="flex flex-wrap gap-2 mb-4 p-2 bg-black/30 border border-gray-700 rounded-lg">

            {/* Bold */}
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`${button} ${editor.isActive("bold") ? active : ""}`}
            >
                Bold
            </button>

            {/* Italic */}
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`${button} ${editor.isActive("italic") ? active : ""}`}
            >
                Italic
            </button>

            {/* Headings */}
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`${button} ${editor.isActive("heading", { level: 1 }) ? active : ""}`}
            >
                H1
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`${button} ${editor.isActive("heading", { level: 2 }) ? active : ""}`}
            >
                H2
            </button>

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`${button} ${editor.isActive("heading", { level: 3 }) ? active : ""}`}
            >
                H3
            </button>

            {/* Lists */}
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`${button} ${editor.isActive("bulletList") ? active : ""}`}
            >
                • Lista
            </button>

            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`${button} ${editor.isActive("orderedList") ? active : ""}`}
            >
                1. Lista
            </button>

            {/* Blockquote */}
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`${button} ${editor.isActive("blockquote") ? active : ""}`}
            >
                ❝ Quote
            </button>

            {/* Undo / Redo */}
            <button
                onClick={() => editor.chain().focus().undo().run()}
                className={button}
            >
                Undo
            </button>

            <button
                onClick={() => editor.chain().focus().redo().run()}
                className={button}
            >
                Redo
            </button>

            {/* Upload Image */}
            <button
                onClick={async () => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";

                    input.onchange = async () => {
                        const file = input.files?.[0];
                        if (!file) return;

                        const formData = new FormData();
                        formData.append("file", file);

                        const res = await fetch("/api/upload", {
                            method: "POST",
                            body: formData,
                        });

                        const data = await res.json();

                        if (data.secure_url) {
                            editor.chain().focus().setImage({ src: data.secure_url }).run();
                        }
                    };

                    input.click();
                }}
                className={button}
            >
                📸 Imagem
            </button>
        </div>
    );
}