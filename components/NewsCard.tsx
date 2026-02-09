type NewsCardProps = {
  title: string;
  slug: string;
  date: string;
  image?: string;
};

export default function NewsCard({ title, date, slug, image }: NewsCardProps) {
  return (
    <a
      href={`/news/${slug}`}
      className="block bg-[#050505] rounded-lg border border-red-600/50 overflow-hidden shadow-[0_0_18px_rgba(229,9,20,0.5)] hover:shadow-[0_0_28px_rgba(229,9,20,0.8)] transition-all"
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full aspect-video object-cover"
        />
      )}

      <div className="p-3">
        <h2 className="text-base font-bold text-[var(--accent)] mb-1 line-clamp-2">
          {title}
        </h2>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
    </a>
  );
}