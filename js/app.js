(() => {
  "use strict";

  const STORE = {
    content: "ga_content_overrides",
    posts: "ga_blog_posts",
    requests: "ga_requests"
  };

  const icons = {
    menu: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    close: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    arrow: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>',
    check: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m5 12 4 4L19 6"/></svg>',
    layers: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></svg>',
    code: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m8 9-4 3 4 3m8-6 4 3-4 3m-2-10-4 14"/></svg>',
    spark: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m12 3-1.5 4.5L6 9l4.5 1.5L12 15l1.5-4.5L18 9l-4.5-1.5L12 3Z"/><path d="m5 14-.8 2.2L2 17l2.2.8L5 20l.8-2.2L8 17l-2.2-.8L5 14Zm14-2-1 3-3 1 3 1 1 3 1-3 3-1-3-1-1-3Z"/></svg>',
    mail: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    phone: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
    pin: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    doc: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h6M9 17h6"/></svg>',
    chat: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/></svg>',
    play: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="m10 8 6 4-6 4Z"/></svg>',
    status: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 18V9m5 9V5m5 13v-7m5 7V3"/></svg>'
  };

  function escapeHTML(value = "") {
    return String(value).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[char]);
  }

  function parseStore(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }

  function getContent() {
    const base = structuredClone(window.GA_DEFAULT_CONTENT || {site:{}, services:[], products:[], posts:[]});
    const overrides = parseStore(STORE.content, {});
    const localPosts = parseStore(STORE.posts, []);
    return {
      ...base,
      site: {...base.site, ...(overrides.site || {})},
      services: overrides.services || base.services,
      products: overrides.products || base.products,
      posts: mergePosts(base.posts || [], localPosts)
    };
  }

  function mergePosts(base, local) {
    const map = new Map(base.map(post => [post.id, post]));
    local.forEach(post => map.set(post.id, post));
    return [...map.values()].filter(post => !post.deleted).sort((a,b) => new Date(b.date) - new Date(a.date));
  }

  function renderHeader() {
    const target = document.querySelector("[data-site-header]");
    if (!target) return;
    const page = document.body.dataset.page || "home";
    const nav = [
      ["home", "index.html", "Home"],
      ["about", "index.html#about", "About"],
      ["services", "index.html#services", "Services"],
      ["products", "products.html", "Our Products"],
      ["blog", "blog.html", "Blog"],
      ["contact", "contact.html", "Contact & Support"]
    ];
    target.innerHTML = `
      <header class="site-header">
        <div class="container nav-wrap">
          <a class="brand" href="index.html" aria-label="Global Alfabet home">
            <img src="assets/images/logo-light.png" width="42" height="42" alt="Global Alfabet logo">
            <span>Global Alfabet</span>
          </a>
          <nav class="main-nav" id="mainNav" aria-label="Primary navigation">
            ${nav.map(([key,href,label]) => `<a href="${href}" ${page === key ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
          </nav>
          <div class="nav-actions">
            <button class="menu-button" type="button" aria-expanded="false" aria-controls="mainNav" aria-label="Open menu">${icons.menu}</button>
            <a class="btn btn-primary" href="contact.html#enquiry">Make an Enquiry</a>
          </div>
        </div>
      </header>`;
    const button = target.querySelector(".menu-button");
    const menu = target.querySelector(".main-nav");
    button?.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      button.innerHTML = open ? icons.close : icons.menu;
    });
    menu?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => menu.classList.remove("open")));
  }

  function renderFooter(content) {
    const target = document.querySelector("[data-site-footer]");
    if (!target) return;
    target.innerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <a class="brand" href="index.html"><img src="assets/images/logo-light.png" alt="" width="42" height="42"><span>Global Alfabet</span></a>
              <p style="margin-top:14px;max-width:320px">${escapeHTML(content.site.tagline)}</p>
            </div>
            <div><h3>Company</h3><div class="footer-links"><a href="index.html#about">About</a><a href="index.html#services">Services</a><a href="blog.html">Blog</a></div></div>
            <div><h3>Products</h3><div class="footer-links"><a href="products.html#shop">Global Alfabet Shop</a><a href="products.html#bizdirect">BizDirect</a><a href="products.html#future">Future Products</a></div></div>
            <div><h3>Support</h3><div class="footer-links"><a href="contact.html#enquiry">Make an Enquiry</a><a href="contact.html#support">Support Request</a><a href="privacy.html">Privacy Policy</a></div></div>
          </div>
          <div class="footer-bottom"><span>© <span data-current-year></span> Global Alfabet. All rights reserved.</span><span>Built for accessible digital growth.</span></div>
        </div>
      </footer>`;
  }

  function renderServices(content) {
    document.querySelectorAll("[data-services]").forEach(container => {
      container.innerHTML = content.services.map(service => `
        <article class="card service-card">
          <div class="icon-box">${icons[service.icon] || icons.spark}</div>
          <h3>${escapeHTML(service.title)}</h3>
          <p>${escapeHTML(service.description)}</p>
          <a class="text-link" href="contact.html#enquiry">Discuss a project ${icons.arrow}</a>
        </article>`).join("");
    });
  }

  function renderProductCards(content) {
    document.querySelectorAll("[data-product-cards]").forEach(container => {
      container.innerHTML = content.products.map(product => `
        <article class="product-card">
          <img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.title)} platform preview" loading="lazy" width="1200" height="820">
          <div class="product-card-content">
            <span class="product-label">${escapeHTML(product.category)}</span>
            <h3>${escapeHTML(product.title)}</h3>
            <p>${escapeHTML(product.description)}</p>
            <a class="btn btn-secondary" href="${escapeHTML(product.url || '#')}" ${product.url && product.url !== '#' ? 'target="_blank" rel="noopener"' : ''}>${escapeHTML(product.buttonText)} ${icons.arrow}</a>
          </div>
        </article>`).join("");
    });
  }

  function renderBlogCards(content, limit) {
    document.querySelectorAll("[data-blog-cards]").forEach(container => {
      const posts = limit ? content.posts.slice(0, limit) : content.posts;
      container.innerHTML = posts.length ? posts.map(post => `
        <article class="card blog-card">
          <a href="article.html?slug=${encodeURIComponent(post.slug)}"><img src="${escapeHTML(post.coverImage || 'assets/images/hero-team.webp')}" alt="${escapeHTML(post.title)}" loading="lazy" width="1200" height="675"></a>
          <div class="blog-card-body">
            <div class="meta"><span>${escapeHTML(post.category)}</span><time datetime="${escapeHTML(post.date)}">${formatDate(post.date)}</time></div>
            <h3><a href="article.html?slug=${encodeURIComponent(post.slug)}" style="text-decoration:none">${escapeHTML(post.title)}</a></h3>
            <p>${escapeHTML(post.summary || post.subtitle || '')}</p>
            <a class="text-link" href="article.html?slug=${encodeURIComponent(post.slug)}">Read article ${icons.arrow}</a>
          </div>
        </article>`).join("") : `<div class="card" style="padding:28px"><h3>No articles yet</h3><p>New company updates and useful digital business insights will appear here.</p></div>`;
    });
  }

  function formatDate(date) {
    try { return new Intl.DateTimeFormat("en", {year:"numeric", month:"long", day:"numeric"}).format(new Date(`${date}T12:00:00`)); }
    catch { return date; }
  }

  function bindSiteFields(content) {
    document.querySelectorAll("[data-site-field]").forEach(el => {
      const key = el.dataset.siteField;
      if (content.site[key] !== undefined) el.textContent = content.site[key];
    });
    document.querySelectorAll("[data-site-href]").forEach(el => {
      const key = el.dataset.siteHref;
      const value = content.site[key];
      if (value) el.setAttribute("href", key.toLowerCase().includes("email") ? `mailto:${value}` : key === "phone" ? `tel:${value.replace(/\s/g,'')}` : value);
    });
  }

  async function handleFormSubmit(form, content) {
    const status = form.querySelector(".form-status");
    const submit = form.querySelector("button[type='submit']");
    const data = new FormData(form);
    const request = {};
    for (const [key, value] of data.entries()) request[key] = value instanceof File ? value.name : value;
    request.id = crypto.randomUUID ? crypto.randomUUID() : `req-${Date.now()}`;
    request.createdAt = new Date().toISOString();
    request.status = "New";
    request.type = form.dataset.requestType || request["form-name"] || "Enquiry";
    delete request["bot-field"];

    const existing = parseStore(STORE.requests, []);
    existing.unshift(request);
    localStorage.setItem(STORE.requests, JSON.stringify(existing));

    submit.disabled = true;
    submit.textContent = "Sending…";
    try {
      if (location.protocol.startsWith("http")) {
        const hasFile = [...data.values()].some(value => value instanceof File && value.name);
        let body;
        let headers;
        if (hasFile) {
          body = data;
        } else {
          const encoded = new URLSearchParams();
          for (const [key, value] of data.entries()) encoded.append(key, value);
          body = encoded.toString();
          headers = {"Content-Type": "application/x-www-form-urlencoded"};
        }
        const response = await fetch("/", {method: "POST", headers, body});
        if (!response.ok) throw new Error("Netlify form request failed");
      }
      status.textContent = "Thank you. Your request has been recorded and our team will respond shortly.";
      status.className = "form-status success";
      form.reset();
    } catch (error) {
      status.textContent = `Your request was saved in this browser. After deploying to Netlify, enable Forms so it can also be delivered to ${content.site.enquiryEmail}.`;
      status.className = "form-status error";
      console.warn(error);
    } finally {
      submit.disabled = false;
      submit.textContent = form.dataset.submitLabel || "Submit";
    }
  }

  function bindForms(content) {
    document.querySelectorAll("form[data-netlify-form]").forEach(form => {
      form.addEventListener("submit", event => {
        event.preventDefault();
        handleFormSubmit(form, content);
      });
    });
  }

  function populateProductDetails(content) {
    content.products.forEach(product => {
      const root = document.querySelector(`[data-product-detail="${product.id}"]`);
      if (!root) return;
      root.querySelector("[data-title]").textContent = product.title;
      root.querySelector("[data-description]").textContent = product.description;
      const img = root.querySelector("img");
      img.src = product.image;
      img.alt = `${product.title} platform preview`;
      const link = root.querySelector("[data-link]");
      link.href = product.url || "#";
      link.textContent = product.buttonText;
      if (product.url && product.url !== "#") { link.target = "_blank"; link.rel = "noopener"; }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const content = getContent();
    window.GA = {content, icons, escapeHTML, formatDate, stores: STORE, getContent};
    renderHeader();
    renderFooter(content);
    bindSiteFields(content);
    renderServices(content);
    renderProductCards(content);
    renderBlogCards(content, document.body.dataset.page === "home" ? 3 : undefined);
    populateProductDetails(content);
    bindForms(content);
    document.querySelectorAll("[data-current-year]").forEach(el => el.textContent = new Date().getFullYear());
    document.querySelectorAll("[data-icon]").forEach(el => { el.innerHTML = icons[el.dataset.icon] || ""; });
  });
})();
