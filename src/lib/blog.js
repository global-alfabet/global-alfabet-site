/* global __BLOG_CUTOFF__, __SHOW_SCHEDULED_POSTS__ */
import { marked } from "marked";
import files from "virtual:blog-files";
import { asset } from "./asset.js";

// Every Markdown file in src/content/blog becomes a post. The file name is the address: /blog/<file-name>.
// `files` is that folder's Markdown, minus scheduled posts when the build hides them (scripts/blog-cutoff.js).

// Dated posts: a post goes live on its `date` (YYYY-MM-DD). Until then it is left out of the blog, the home page,
// the sitemap and llms.txt, and its address is a 404. The cutoff is the build date in Indianapolis time, fixed at
// build time (scripts/blog-cutoff.js, vite.config.js); a scheduled daily rebuild publishes posts as their day comes.
// In `npm run dev` and Netlify deploy previews, scheduled posts show with a "Scheduled for" note.
export const blogCutoff = __BLOG_CUTOFF__;
const showScheduled = __SHOW_SCHEDULED_POSTS__;

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

const allPosts = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split("/").pop().replace(/\.md$/, "");
    const { meta, body } = parse(raw);
    // Dates are compared as text, so a mistyped date would publish a post too early or never: stop the build.
    if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date || "")) {
      throw new Error(`Blog post ${slug}.md needs a date written as YYYY-MM-DD, not "${meta.date || ""}".`);
    }
    return {
      slug,
      ...meta,
      scheduled: meta.date > blogCutoff,
      cover: meta.cover ? asset(meta.cover) : "",
      html: marked.parse(body),
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

/** The posts this build shows: live ones, plus scheduled ones in previews (each has `scheduled: true`). */
export const posts = allPosts.filter((p) => !p.scheduled || showScheduled);

/** Live posts only: for the sitemap, llms.txt and anything search engines read. */
export const livePosts = posts.filter((p) => !p.scheduled);

export const postBySlug = Object.fromEntries(posts.map((p) => [p.slug, p]));

export function formatDate(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
