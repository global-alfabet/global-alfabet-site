document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("[data-article]");
  if (!root || !window.GA) return;
  const slug = new URLSearchParams(location.search).get("slug");
  const post = window.GA.content.posts.find(item => item.slug === slug) || window.GA.content.posts[0];
  if (!post) {
    root.innerHTML = '<div class="article-header"><h1>Article not found</h1><p>The article may have been removed or is not available in this browser.</p><a class="btn btn-primary" href="blog.html">Back to Blog</a></div>';
    return;
  }
  document.title = `${post.title} | Global Alfabet`;
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = post.summary || post.subtitle;
  root.innerHTML = `
    <header class="article-header">
      <span class="eyebrow">${window.GA.escapeHTML(post.category)}</span>
      <h1 style="margin-top:18px">${window.GA.escapeHTML(post.title)}</h1>
      <p class="lead">${window.GA.escapeHTML(post.subtitle || post.summary || '')}</p>
      <div class="meta" style="justify-content:center"><span>By ${window.GA.escapeHTML(post.author)}</span><time datetime="${window.GA.escapeHTML(post.date)}">${window.GA.formatDate(post.date)}</time></div>
    </header>
    <img class="article-cover" src="${window.GA.escapeHTML(post.coverImage || 'assets/images/hero-team.webp')}" alt="${window.GA.escapeHTML(post.title)}" width="1200" height="675">
    <div class="article-content">${renderBlocks(post.blocks || [])}</div>`;

  const schema = {
    "@context":"https://schema.org",
    "@type":"BlogPosting",
    headline: post.title,
    description: post.summary || post.subtitle,
    datePublished: post.date,
    author: {"@type":"Organization", name: post.author || "Global Alfabet"},
    publisher: {"@type":"Organization", name:"Global Alfabet", logo:{"@type":"ImageObject", url:new URL("assets/images/logo-blue.png", location.href).href}},
    image: new URL(post.coverImage || "assets/images/hero-team.webp", location.href).href,
    mainEntityOfPage: location.href
  };
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);

  function renderBlocks(blocks) {
    return blocks.map(block => {
      switch (block.type) {
        case "heading": return `<h2>${window.GA.escapeHTML(block.text)}</h2>`;
        case "image": return `<figure><img src="${window.GA.escapeHTML(block.src)}" alt="${window.GA.escapeHTML(block.alt || '')}" loading="lazy"><figcaption>${window.GA.escapeHTML(block.caption || '')}</figcaption></figure>`;
        case "quote": return `<blockquote>${window.GA.escapeHTML(block.text)}</blockquote>`;
        default: return `<p>${window.GA.escapeHTML(block.text || '')}</p>`;
      }
    }).join("");
  }
});
