import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DrakNinja News",
  description: "Notícias de anime afiadas e rápidas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <Header />
        <main className="max-w-6xl mx-auto p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}