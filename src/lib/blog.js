import { marked } from "marked";
import { asset } from "./asset.js";

// Every Markdown file in src/content/blog becomes a post. The file name is the address: /blog/<file-name>.
const files = import.meta.glob("../content/blog/*.md", { query: "?raw", import: "default", eager: true });

function parse(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const meta = {};
  if (match) {
    for (const line of match[1].split(/\r?\n/)) {
      const i = line.indexOf(":");
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
  }
  return { meta, body: match ? match[2] : raw };
}

export const posts = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split("/").pop().replace(/\.md$/, "");
    const { meta, body } = parse(raw);
    return { slug, ...meta, cover: meta.cover ? asset(meta.cover) : "", html: marked.parse(body) };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const postBySlug = Object.fromEntries(posts.map((p) => [p.slug, p]));

export function formatDate(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
