"use client";

export default function Filters({ current }: { current: string }) {
  const filters = [
    { key: "all", label: "Todas" },
    { key: "published", label: "Publicadas" },
    { key: "draft", label: "Rascunhos" },
  ];

  return (
    <div className="flex gap-4 mb-6">
      {filters.map((f) => (
        <a
          key={f.key}
          href={`/admin/news?filter=${f.key}`}
          className={`px-3 py-1 rounded ${
            current === f.key
              ? "bg-[var(--accent)] text-black"
              : "bg-gray-800 text-gray-300"
          }`}
        >
          {f.label}
        </a>
      ))}
    </div>
  );
}