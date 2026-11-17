// Dated blog posts: a post goes live on its `date`. The build decides which posts are out by comparing each date
// with the build date in one time zone, Global Alfabet's working time zone (Indianapolis), so a post dated
// 1 December appears in the first build on or after 1 December there. The result is baked into the build
// (vite.config.js `define`), so the prerendered pages and the browser always agree.
import { readdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

export const BLOG_TIME_ZONE = "America/Indiana/Indianapolis";

/** Today's date in the company time zone, as YYYY-MM-DD. BLOG_CUTOFF=2026-12-01 overrides it (for testing). */
export function blogCutoff(now = new Date()) {
  const forced = process.env.BLOG_CUTOFF;
  if (forced) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(forced)) throw new Error(`BLOG_CUTOFF must be YYYY-MM-DD, not "${forced}".`);
    return forced;
  }
  // en-CA formats dates as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: BLOG_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Scheduled posts show (with a "Scheduled for" note) in `npm run dev`, Netlify deploy previews and SHOW_FUTURE_POSTS=1. */
export function showScheduledPosts(command) {
  return command === "serve" || process.env.SHOW_FUTURE_POSTS === "1";
}

const BLOG_DIR = "src/content/blog";
const MODULE = "virtual:blog-files";

/**
 * Vite plugin: `import files from "virtual:blog-files"` gives every post's Markdown, keyed by file path. When scheduled
 * posts are hidden, posts dated after the cutoff are left out of the glob, so nothing about them (not their words,
 * not their address) is in the build or the JavaScript the browser downloads.
 */
export function blogFiles({ cutoff, show }) {
  return {
    name: "blog-files",
    resolveId: (id) => (id === MODULE ? `\0${MODULE}` : null),
    load(id) {
      if (id !== `\0${MODULE}`) return null;
      const withheld = show ? [] : scheduledFiles(cutoff);
      const patterns = [`/${BLOG_DIR}/*.md`, ...withheld.map((file) => `!/${BLOG_DIR}/${file}`)];
      return `export default import.meta.glob(${JSON.stringify(patterns)}, { query: "?raw", import: "default", eager: true });`;
    },
  };
}

/** Post files dated after the cutoff. Stops the build if a post's date isn't YYYY-MM-DD (it would publish wrongly). */
function scheduledFiles(cutoff) {
  return readdirSync(resolve(BLOG_DIR))
    .filter((file) => file.endsWith(".md"))
    .filter((file) => {
      const raw = readFileSync(resolve(BLOG_DIR, file), "utf8");
      const date = raw.match(/^---\r?\n[\s\S]*?^date:[ \t]*(.*?)[ \t\r]*$/m)?.[1] || "";
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        throw new Error(`Blog post ${file} needs a date written as YYYY-MM-DD, not "${date}".`);
      }
      return date > cutoff;
    });
}
