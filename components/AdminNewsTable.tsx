"use client";

type NewsItem = {
  _id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  createdAt: string;
};

export default function AdminNewsTable({ news }: { news: NewsItem[] }) {
  const handleDelete = async (id: string) => {
    if (!confirm("Tens a certeza que queres eliminar esta notícia?")) return;

    await fetch(`/api/news/id/${id}`, {
      method: "DELETE",
    });

    window.location.reload();
  };

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-700">
          <th className="text-left py-2">Título</th>
          <th className="text-left py-2">Slug</th>
          <th className="text-left py-2">Publicado</th>
          <th className="text-left py-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {news.map((item) => (
          <tr key={item._id} className="border-b border-gray-800">
            <td className="py-2 pr-4">{item.title}</td>
            <td className="py-2 pr-4 text-xs text-gray-400">{item.slug}</td>
            <td className="py-2 pr-4">{item.isPublished ? "✅" : "❌"}</td>
            <td className="py-2 flex gap-4">
              <a
                href={`/admin/news/${item._id}/edit`}
                className="text-[var(--accent)] underline"
              >
                Editar
              </a>

              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500 underline"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}