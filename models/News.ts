import mongoose, { Schema, Document, Model } from "mongoose"


/**
 * Mongoose schema for news articles.
 *
 * ## Fields
 * - `title` — article title
 * - `slug` — URL-friendly identifier
 * - `excerpt` — short summary
 * - `content` — full HTML content
 * - `imageUrl` — main image URL
 * - `tags` — array of strings
 * - `publishedAt` — publication date
 * - `isPublished` — controls visibility on the site
 *
 * ## Notes
 * - Slug must be unique.
 * - Content may contain HTML from scraping or manual editing.
 */


export interface INews extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  imageUrl?: string
  tags: string[]
  publishedAt: Date
  isPublished: boolean
  image?: string
}

const NewsSchema: Schema<INews> = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    tags: [{ type: String }],
    publishedAt: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: true },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
)

const News: Model<INews> =
  mongoose.models.News || mongoose.model<INews>("News", NewsSchema)

export default News
