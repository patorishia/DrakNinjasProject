"use client";

export default function Pagination({
  page,
  pages,
  filter,
}: {
  page: number;
  pages: number;
  filter: string;
}) {
  return (
    <div className="flex justify-between mt-6">
      <a
        href={`/admin/news?filter=${filter}&page=${page - 1}`}
        className={`px-3 py-1 rounded ${
          page <= 1 ? "opacity-30 pointer-events-none" : "bg-gray-800 text-gray-300"
        }`}
      >
        Anterior
      </a>

      <span className="text-gray-400">
        Página {page} de {pages}
      </span>

      <a
        href={`/admin/news?filter=${filter}&page=${page + 1}`}
        className={`px-3 py-1 rounded ${
          page >= pages ? "opacity-30 pointer-events-none" : "bg-gray-800 text-gray-300"
        }`}
      >
        Próxima
      </a>
    </div>
  );
}