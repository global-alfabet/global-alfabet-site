document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  if (!window.GA) return;
  const {stores, escapeHTML} = window.GA;
  let content = window.GA.getContent();
  let blocks = [];

  const $ = selector => document.querySelector(selector);
  const parse = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const slugify = value => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

  // Navigation
  document.querySelectorAll("[data-panel-button]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-panel-button]").forEach(item => item.classList.toggle("active", item === button));
    document.querySelectorAll("[data-panel]").forEach(panel => panel.classList.toggle("active", panel.dataset.panel === button.dataset.panelButton));
    $("#adminNav")?.classList.remove("open");
  }));
  $("#adminMenuButton")?.addEventListener("click", () => $("#adminNav")?.classList.toggle("open"));

  function refreshStats() {
    content = window.GA.getContent();
    $("#requestCount").textContent = parse(stores.requests, []).length;
    $("#postCount").textContent = content.posts.length;
    $("#serviceCount").textContent = content.services.length;
    $("#productCount").textContent = content.products.length;
  }

  // Requests
  function renderRequests() {
    const requests = parse(stores.requests, []);
    $("#requestsTable").innerHTML = requests.length ? requests.map(req => `
      <tr>
        <td>${new Date(req.createdAt).toLocaleString()}</td>
        <td><span class="status-pill">${escapeHTML(req.type || "Enquiry")}</span></td>
        <td><strong>${escapeHTML([req.firstName, req.lastName].filter(Boolean).join(" ") || req.name || "Unknown")}</strong><br><small>${escapeHTML(req.email || "")}</small></td>
        <td>${escapeHTML(req.subject || req.product || req.interest || "—")}</td>
        <td><select data-request-status="${req.id}"><option ${req.status === "New" ? "selected" : ""}>New</option><option ${req.status === "In Progress" ? "selected" : ""}>In Progress</option><option ${req.status === "Resolved" ? "selected" : ""}>Resolved</option></select></td>
        <td><button class="btn btn-danger btn-small" data-delete-request="${req.id}">Delete</button></td>
      </tr>`).join("") : '<tr><td colspan="6"><p>No requests have been saved in this browser.</p></td></tr>';
    document.querySelectorAll("[data-request-status]").forEach(select => select.addEventListener("change", () => {
      const all = parse(stores.requests, []); const item = all.find(req => req.id === select.dataset.requestStatus); if (item) item.status = select.value; save(stores.requests, all); refreshStats();
    }));
    document.querySelectorAll("[data-delete-request]").forEach(button => button.addEventListener("click", () => {
      if (!confirm("Delete this locally saved request?")) return;
      save(stores.requests, parse(stores.requests, []).filter(req => req.id !== button.dataset.deleteRequest)); renderRequests(); refreshStats();
    }));
  }

  $("#exportRequests")?.addEventListener("click", () => {
    const rows = parse(stores.requests, []); if (!rows.length) return alert("No requests to export.");
    const keys = [...new Set(rows.flatMap(Object.keys))];
    const csv = [keys.join(","), ...rows.map(row => keys.map(key => `"${String(row[key] ?? "").replace(/"/g, '""')}"`).join(","))].join("\n");
    download("global-alfabet-requests.csv", csv, "text/csv");
  });

  // Site content
  function populateSiteForm() {
    const site = content.site;
    ["companyName","tagline","heroTitle","heroText","enquiryEmail","supportEmail","location","shopUrl","bizDirectUrl"].forEach(key => { const el = $(`#${key}`); if (el) el.value = site[key] || ""; });
    $("#companyPhone").value = site.phone || "";
    $("#serviceEditors").innerHTML = content.services.map((service, index) => `<div class="card" style="padding:18px"><div class="field"><label>Service ${index + 1} title</label><input data-service-title="${index}" value="${escapeHTML(service.title)}"></div><div class="field" style="margin-top:12px"><label>Description</label><textarea data-service-description="${index}" style="min-height:130px">${escapeHTML(service.description)}</textarea></div></div>`).join("");
  }

  $("#siteContentForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const site = {};
    new FormData(event.currentTarget).forEach((value,key) => site[key] = value);
    site.phone = site.phone || $("#companyPhone").value;
    const services = content.services.map((service,index) => ({...service, title: document.querySelector(`[data-service-title="${index}"]`).value.trim(), description: document.querySelector(`[data-service-description="${index}"]`).value.trim()}));
    const products = content.products.map(product => ({...product, url: product.id === "shop" ? site.shopUrl : product.id === "bizdirect" ? site.bizDirectUrl : product.url}));
    save(stores.content, {site, services, products});
    $("#contentStatus").textContent = "Saved. Public pages in this browser will use the updated content."; $("#contentStatus").className = "form-status success";
    refreshStats();
  });

  // Blog editor
  function addBlock(type, data = {}) {
    blocks.push({id: crypto.randomUUID ? crypto.randomUUID() : `block-${Date.now()}-${Math.random()}`, type, ...data});
    renderBlocks();
  }

  function renderBlocks() {
    $("#blockList").innerHTML = blocks.length ? blocks.map((block,index) => `
      <div class="content-block" data-block-id="${block.id}">
        <div class="block-toolbar"><strong>${block.type[0].toUpperCase() + block.type.slice(1)} block</strong><div class="block-actions"><button type="button" class="btn btn-ghost btn-small" data-move-up="${block.id}" ${index === 0 ? "disabled" : ""}>↑</button><button type="button" class="btn btn-ghost btn-small" data-move-down="${block.id}" ${index === blocks.length-1 ? "disabled" : ""}>↓</button><button type="button" class="btn btn-danger btn-small" data-remove-block="${block.id}">Remove</button></div></div>
        ${blockEditor(block)}
      </div>`).join("") : '<div class="notice">Add a description, heading, image or quote to begin building the article.</div>';
    bindBlockEvents();
  }

  function blockEditor(block) {
    if (block.type === "image") return `<div class="admin-form-grid"><div class="field"><label>Image address</label><input data-block-field="src" value="${escapeHTML(block.src || '')}" placeholder="assets/images/... or https://..."></div><div class="field"><label>Or upload image</label><input type="file" accept="image/*" data-block-upload></div><div class="field"><label>Alternative text</label><input data-block-field="alt" value="${escapeHTML(block.alt || '')}"></div><div class="field"><label>Caption</label><input data-block-field="caption" value="${escapeHTML(block.caption || '')}"></div>${block.src ? `<div class="field full"><img src="${escapeHTML(block.src)}" alt="" style="max-height:230px;object-fit:cover;border-radius:14px"></div>` : ""}</div>`;
    const label = block.type === "heading" ? "Heading" : block.type === "quote" ? "Quote" : "Description";
    return `<div class="field"><label>${label}</label><textarea data-block-field="text" style="min-height:${block.type === 'paragraph' ? '150px' : '90px'}">${escapeHTML(block.text || '')}</textarea></div>`;
  }

  function bindBlockEvents() {
    document.querySelectorAll("[data-block-field]").forEach(field => field.addEventListener("input", () => {
      const id = field.closest("[data-block-id]").dataset.blockId; const block = blocks.find(item => item.id === id); if (block) block[field.dataset.blockField] = field.value;
    }));
    document.querySelectorAll("[data-block-upload]").forEach(input => input.addEventListener("change", async () => {
      const file = input.files[0]; if (!file) return; const id = input.closest("[data-block-id]").dataset.blockId; const block = blocks.find(item => item.id === id); block.src = await fileToDataURL(file); renderBlocks();
    }));
    document.querySelectorAll("[data-remove-block]").forEach(button => button.addEventListener("click", () => { blocks = blocks.filter(item => item.id !== button.dataset.removeBlock); renderBlocks(); }));
    document.querySelectorAll("[data-move-up]").forEach(button => button.addEventListener("click", () => moveBlock(button.dataset.moveUp, -1)));
    document.querySelectorAll("[data-move-down]").forEach(button => button.addEventListener("click", () => moveBlock(button.dataset.moveDown, 1)));
  }

  function moveBlock(id, direction) { const index = blocks.findIndex(item => item.id === id); const target = index + direction; if (index < 0 || target < 0 || target >= blocks.length) return; [blocks[index], blocks[target]] = [blocks[target], blocks[index]]; renderBlocks(); }
  document.querySelectorAll("[data-add-block]").forEach(button => button.addEventListener("click", () => addBlock(button.dataset.addBlock)));
  $("#postTitle")?.addEventListener("input", () => { if (!$("#postId").value || !$("#postSlug").dataset.edited) $("#postSlug").value = slugify($("#postTitle").value); });
  $("#postSlug")?.addEventListener("input", event => event.target.dataset.edited = "true");
  $("#coverImageUrl")?.addEventListener("input", event => showCoverPreview(event.target.value));
  $("#coverImageFile")?.addEventListener("change", async event => { const file = event.target.files[0]; if (!file) return; const dataUrl = await fileToDataURL(file); $("#coverImageUrl").value = dataUrl; showCoverPreview(dataUrl); });

  function showCoverPreview(src) { const img = $("#coverPreview"); if (src) { img.src = src; img.style.display = "block"; } else { img.removeAttribute("src"); img.style.display = "none"; } }
  function resetBlogForm() {
    $("#blogForm").reset(); $("#postId").value = ""; $("#postAuthor").value = "Global Alfabet Team"; $("#postDate").value = new Date().toISOString().slice(0,10); $("#postSlug").dataset.edited = ""; blocks = []; renderBlocks(); showCoverPreview(""); $("#blogFormTitle").textContent = "Create a Blog Post";
  }
  $("#resetBlogForm")?.addEventListener("click", resetBlogForm);

  $("#blogForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const id = $("#postId").value || (crypto.randomUUID ? crypto.randomUUID() : `post-${Date.now()}`);
    const post = {id, slug: slugify($("#postSlug").value || $("#postTitle").value), title: $("#postTitle").value.trim(), subtitle: $("#postSubtitle").value.trim(), author: $("#postAuthor").value.trim(), date: $("#postDate").value, category: $("#postCategory").value.trim(), coverImage: $("#coverImageUrl").value.trim() || "assets/images/hero-team.webp", summary: $("#postSummary").value.trim(), blocks: blocks.map(({id: _id, ...block}) => block)};
    if (!post.title || !post.date || !post.category) return;
    const posts = parse(stores.posts, []); const index = posts.findIndex(item => item.id === id); if (index >= 0) posts[index] = post; else posts.push(post); save(stores.posts, posts);
    $("#blogStatus").textContent = "Post saved locally. Export content.js when you are ready to publish it."; $("#blogStatus").className = "form-status success"; resetBlogForm(); renderPosts(); refreshStats();
  });

  function renderPosts() {
    content = window.GA.getContent();
    $("#postsTable").innerHTML = content.posts.length ? content.posts.map(post => `<tr><td>${escapeHTML(post.date)}</td><td><strong>${escapeHTML(post.title)}</strong><br><small>${escapeHTML(post.slug)}</small></td><td>${escapeHTML(post.category)}</td><td><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn-ghost btn-small" data-edit-post="${post.id}">Edit</button><a class="btn btn-secondary btn-small" href="article.html?slug=${encodeURIComponent(post.slug)}" target="_blank">Preview</a><button class="btn btn-danger btn-small" data-delete-post="${post.id}">Delete</button></div></td></tr>`).join("") : '<tr><td colspan="4">No posts available.</td></tr>';
    document.querySelectorAll("[data-edit-post]").forEach(button => button.addEventListener("click", () => editPost(button.dataset.editPost)));
    document.querySelectorAll("[data-delete-post]").forEach(button => button.addEventListener("click", () => deletePost(button.dataset.deletePost)));
  }

  function editPost(id) {
    const post = window.GA.getContent().posts.find(item => item.id === id); if (!post) return;
    $("#postId").value = post.id; $("#postTitle").value = post.title; $("#postSubtitle").value = post.subtitle || ""; $("#postDate").value = post.date; $("#postAuthor").value = post.author; $("#postCategory").value = post.category; $("#postSlug").value = post.slug; $("#postSlug").dataset.edited = "true"; $("#postSummary").value = post.summary || ""; $("#coverImageUrl").value = post.coverImage || ""; showCoverPreview(post.coverImage); blocks = (post.blocks || []).map(block => ({id: crypto.randomUUID ? crypto.randomUUID() : `block-${Math.random()}`, ...block})); renderBlocks(); $("#blogFormTitle").textContent = "Edit Blog Post"; window.scrollTo({top:0,behavior:"smooth"});
  }

  function deletePost(id) {
    if (!confirm("Delete this post from the local dashboard?")) return;
    const local = parse(stores.posts, []); const localIndex = local.findIndex(item => item.id === id);
    if (localIndex >= 0) local.splice(localIndex,1); else local.push({id, deleted:true});
    save(stores.posts, local); renderPosts(); refreshStats();
  }

  // Export/import
  $("#exportContentJs")?.addEventListener("click", () => {
    const current = window.GA.getContent();
    const output = `window.GA_DEFAULT_CONTENT = ${JSON.stringify({site:current.site, services:current.services, products:current.products, posts:current.posts}, null, 2)};\n`;
    download("content.js", output, "text/javascript");
  });
  $("#exportBackup")?.addEventListener("click", () => download("global-alfabet-dashboard-backup.json", JSON.stringify({content:parse(stores.content,{}), posts:parse(stores.posts,[]), requests:parse(stores.requests,[])}, null, 2), "application/json"));
  $("#importBackup")?.addEventListener("change", async event => {
    const file = event.target.files[0]; if (!file) return;
    try { const data = JSON.parse(await file.text()); if (data.content) save(stores.content,data.content); if (data.posts) save(stores.posts,data.posts); if (data.requests) save(stores.requests,data.requests); location.reload(); } catch { alert("That backup file could not be read."); }
  });
  $("#resetAll")?.addEventListener("click", () => { if (!confirm("Remove all local Global Alfabet dashboard data?")) return; Object.values(stores).forEach(key => localStorage.removeItem(key)); location.reload(); });

  function download(filename, text, type) { const blob = new Blob([text], {type}); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = filename; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }
  function fileToDataURL(file) { return new Promise((resolve,reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); }); }

  populateSiteForm(); resetBlogForm(); renderRequests(); renderPosts(); refreshStats();
});
