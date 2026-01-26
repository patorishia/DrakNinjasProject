# DrakNinjas Anime News

A modern anime news platform built with **Next.js 15**, **MongoDB**, and a custom **scraping engine**.  
Includes an admin panel for editing, publishing and managing news.

---

## 🚀 Features

- 🔥 Scraping engine for Anime News Network RSS
- 📰 Dynamic news pages with clean URLs
- 🛠 Admin panel for editing and publishing news
- 🖼 Image support (Cloudinary integration coming soon)
- 🔐 Authentication (NextAuth integration planned)
- 🎨 Custom UI with TailwindCSS
- ⚙️ API routes for CRUD operations

---

## 📦 Tech Stack

- **Next.js 15 (App Router)**
- **MongoDB + Mongoose**
- **TailwindCSS**
- **Cheerio (HTML scraping)**
- **Axios**
- **TypeScript**

---

## 📂 Project Structure

```
app/
 ├─ api/
 │   ├─ news/
 │   │   ├─ route.ts
 │   │   └─ [slug]/route.ts
 │   ├─ news-by-id/
 │   │   └─ [id]/route.ts
 │   └─ news-fetch/
 │       └─ route.ts
 ├─ admin/
 │   └─ news/
 │       ├─ page.tsx
 │       └─ [id]/page.tsx
 └─ news/
     └─ [slug]/page.tsx
```

---

## 🧪 Development

```bash
npm install
npm run dev

Open http://localhost:3000 to view the project.
