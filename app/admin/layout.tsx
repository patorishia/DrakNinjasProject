"use client";

import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#0d0d0d] text-white">

      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 p-6 space-y-6">
        <h2 className="text-2xl font-bold">Admin</h2>

        <nav className="flex flex-col space-y-3">
          <Link href="/admin" className="hover:text-[var(--accent)]">
            Dashboard
          </Link>

          <Link href="/admin/news" className="hover:text-[var(--accent)]">
            Notícias
          </Link>

          <Link href="/admin/news/create" className="hover:text-[var(--accent)]">
            Criar Notícia
          </Link>

          <Link href="/admin/settings" className="hover:text-[var(--accent)]">
            Configurações
          </Link>
        </nav>

        <div className="pt-10">
          <LogoutButton />
        </div>
      </aside>

      {/* Conteúdo */}
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}