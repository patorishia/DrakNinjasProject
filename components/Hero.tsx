export default function Hero() {
    return (
        <section className="relative text-center py-20 border border-[var(--accent)] shadow-[0_0_25px_#e50914] rounded-lg overflow-hidden">

            {/* linhas de velocidade */}
            <div className="absolute inset-0 opacity-20 bg-[url('/speedlines.png')] bg-cover bg-center"></div>

            <h1 className="relative text-5xl font-bold text-[var(--accent)]">
                DRAKNINJA NEWS
            </h1>

            <p className="relative mt-4 text-gray-300">
                Notícias de anime afiadas. Conteúdo em ritmo acelerado.
            </p>

            <a
                href="/news"
                className="relative mt-6 inline-block px-6 py-2 border border-[var(--accent)] text-white hover:bg-[var(--accent)] transition rounded"
            >
                VER NOTÍCIAS
            </a>
        </section>
    );
}