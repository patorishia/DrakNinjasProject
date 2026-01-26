import axios from "axios";
import { parseStringPromise } from "xml2js";
import * as cheerio from "cheerio";
import News from "@/models/News";
import { connectDB } from "./mongodb";

/**
 * Fetches the Anime News Network RSS feed, parses it, and scrapes each article
 * to extract full HTML content and images. New articles are saved to MongoDB.
 *
 * ## Workflow
 * 1. Fetch RSS XML from ANN.
 * 2. Convert XML → JSON using xml2js.
 * 3. Loop through each RSS item.
 * 4. Generate a slug from the title.
 * 5. Skip if the article already exists in the database.
 * 6. Fetch the full article HTML using Axios.
 * 7. Extract the main content block using Cheerio.
 * 8. Extract the first valid image (og:image or inline <img>).
 * 9. Save the article to MongoDB.
 *
 * ## Returns
 * - `{ saved: number }` → number of new articles inserted.
 * - `{ error: string }` → if something goes wrong.
 *
 * ## Notes
 * - ANN pages have inconsistent HTML structures, so multiple selectors are tested.
 * - If scraping fails, the RSS description is used as fallback.
 * - This function should be called manually or via cron.
 *
 * @returns Promise<{ saved: number } | { error: string }>
 */


export async function fetchAnimeNews() {
  await connectDB();

  const url = "https://www.animenewsnetwork.com/news/rss.xml";

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const xml = response.data;
    const json = await parseStringPromise(xml);
    const items = json.rss.channel[0].item || [];

    let saved = 0;

    for (const item of items) {
      const title = item.title?.[0] || "";
      const link = item.link?.[0] || "";
      const description = item.description?.[0] || "";
      const pubDate = item.pubDate?.[0] || "";

      if (!title || !link) continue;

      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const exists = await News.findOne({ slug });
      if (exists) continue;

      let fullContentHtml = description;
      let imageUrl = "";

      try {
        const articleRes = await axios.get(link, {
          headers: {
            "User-Agent": "Mozilla/5.0",
          },
        });

        const $ = cheerio.load(articleRes.data);

        // Tenta vários seletores possíveis
        const possibleSelectors = [
          ".meat",
          ".news", 
          "article",
          ".text",
          ".herald",
          ".main",
        ];

        let contentBlock: any = null;

        for (const selector of possibleSelectors) {
          const found = $(selector);
          if (found.length > 0) {
            contentBlock = found;
            break;
          }
        }

        if (contentBlock) {
          contentBlock.find("script, style, noscript, iframe, .ad").remove();
          fullContentHtml = contentBlock.html() || description;
        }

        // Tenta apanhar imagem
        const img =
          $("meta[property='og:image']").attr("content") ||
          $("img").first().attr("src") ||
          "";

        if (img) {
          imageUrl = img.startsWith("http")
            ? img
            : new URL(img, "https://www.animenewsnetwork.com").href;
        }
      } catch (scrapeError) {
        console.error("Scraping error:", link);
      }

      await News.create({
        title,
        slug,
        excerpt: description.replace(/<[^>]+>/g, "").slice(0, 150),
        content: fullContentHtml,
        imageUrl,
        tags: ["anime", "news"],
        publishedAt: pubDate ? new Date(pubDate) : new Date(),
        isPublished: true,
      });

      saved++;
    }

    return { saved };
  } catch (error) {
    console.error("Error fetching ANN news:", error);
    return { error: "Failed to fetch ANN news" };
  }
}
