export default function Header() {
    return (
        <header className="border-b border-[var(--accent)] bg-[var(--panel)] shadow-[0_0_15px_#e50914]">
            <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <img
                        src="/drakninja-logo.png"
                        alt="DrakNinja logo"
                        className="h-10 w-auto"
                    />
                    <h1 className="text-xl font-bold tracking-wide text-white">
                        DRAKNINJA NEWS
                    </h1>
                </div>

                <nav className="flex gap-6 text-sm uppercase text-gray-300">
                    <a href="/">Home</a>
                    <a href="/news">Notícias</a>
                    <a href="/sobre">Sobre</a>
                    <a href="/contacto">Contacto</a>
                </nav>
            </div>
        </header>
    );
}