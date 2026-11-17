// `npm run build`: the browser build, the build-time (SSR) build and the prerender step. They run as separate
// processes, so the blog cutoff date is worked out once here and handed to all three. Otherwise a build that
// runs across midnight could list a post in one half and not the other.
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { blogCutoff, showScheduledPosts } from "./blog-cutoff.js";

process.env.BLOG_CUTOFF = blogCutoff();
console.log(
  `Blog: posts dated up to ${process.env.BLOG_CUTOFF} are live` +
    (showScheduledPosts("build") ? "; later posts show as scheduled (preview)." : "; later posts are left out."),
);

const vite = resolve("node_modules/vite/bin/vite.js");
const steps = [
  [vite, "build"],
  [vite, "build", "--ssr", "src/entry-server.jsx", "--outDir", "dist-ssr", "--emptyOutDir"],
  [resolve("scripts/prerender.js")],
];

for (const args of steps) {
  const { status } = spawnSync(process.execPath, args, { stdio: "inherit", env: process.env });
  if (status !== 0) process.exit(status ?? 1);
}
