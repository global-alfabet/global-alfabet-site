import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { blogCutoff, showScheduledPosts, blogFiles } from "./scripts/blog-cutoff.js";

export default defineConfig(({ command }) => {
  const cutoff = blogCutoff();
  const show = showScheduledPosts(command);
  return {
    plugins: [blogFiles({ cutoff, show }), react()],
    // Dated blog posts (src/lib/blog.js): which date counts as today, and whether later posts show as scheduled.
    // Fixed at build time so the prerendered pages and the browser show the same posts.
    define: {
      __BLOG_CUTOFF__: JSON.stringify(cutoff),
      __SHOW_SCHEDULED_POSTS__: JSON.stringify(show),
    },
    server: { host: true, port: 5173 },
    preview: { host: true, port: 4173 },
  };
});
