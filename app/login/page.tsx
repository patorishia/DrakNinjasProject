"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin",
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="bg-[var(--panel)] p-8 rounded-xl shadow-xl w-full max-w-sm border border-[var(--accent)]/20">
        
        <h1 className="text-2xl font-bold text-center text-[var(--accent)] mb-6">
          Admin Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          
          <div>
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-black/30 border border-gray-700 text-white focus:border-[var(--accent)] outline-none"
              placeholder="admin@admin.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-black/30 border border-gray-700 text-white focus:border-[var(--accent)] outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black font-bold py-3 rounded-lg transition-all"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
