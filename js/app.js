/* ============================================================
   Be Craftee — app.js
   Handles: theme toggle, mobile nav, rendering makes + journal
   entries from data.js, search/filter, single-post rendering,
   reading progress, and the contact/newsletter forms.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- theme toggle ---------- */
  const THEME_KEY = "bc-theme";
  const root = document.documentElement;
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) root.setAttribute("data-theme", saved);

  function initThemeToggle() {
    const btn = document.querySelector("[data-theme-toggle]");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  /* ---------- mobile nav ---------- */
  function initMobileNav() {
    const toggle = document.querySelector("[data-menu-toggle]");
    const nav = document.querySelector("[data-main-nav]");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  /* ---------- helpers ---------- */
  function formatDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  function findProduct(id) {
    return PRODUCTS.find((p) => p.id === id);
  }
  function findPost(slug) {
    return POSTS.find((p) => p.slug === slug);
  }

  /* ---------- render: makes / shop grid ---------- */
  function makeCard(product, { withDetails = false } = {}) {
    const el = document.createElement(withDetails ? "div" : "a");
    if (!withDetails) {
      el.href = `shop.html#${product.id}`;
      el.className = "make-card";
      el.style.setProperty("--r", (Math.random() * 6 - 3).toFixed(1) + "deg");
      el.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="tag">${product.tag}</span>
        <h3>${product.name}</h3>
        <p>${product.blurb}</p>`;
      return el;
    }
    el.className = "shop-card";
    el.id = product.id;
    el.innerHTML = `
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <div class="inner">
        <span class="tag">${product.tag}</span>
        <h3>${product.name}</h3>
        <p>${product.details}</p>
        <a class="btn btn-primary" href="contact.html?item=${encodeURIComponent(product.name)}">Message to order</a>
      </div>`;
    return el;
  }

  function renderMakes() {
    const grid = document.querySelector("[data-makes-grid]");
    if (!grid) return;
    const limit = grid.dataset.limit ? Number(grid.dataset.limit) : PRODUCTS.length;
    grid.innerHTML = "";
    PRODUCTS.slice(0, limit).forEach((p) => grid.appendChild(makeCard(p)));
  }

  function renderShop() {
    const grid = document.querySelector("[data-shop-grid]");
    if (!grid) return;
    grid.innerHTML = "";
    PRODUCTS.forEach((p) => grid.appendChild(makeCard(p, { withDetails: true })));
  }

  /* ---------- render: journal list ---------- */
  function journalEntry(post) {
    const a = document.createElement("a");
    a.className = "journal-entry";
    a.href = `post.html?slug=${post.slug}`;
    a.innerHTML = `
      <img src="${post.cover}" alt="" loading="lazy">
      <div>
        <div class="journal-meta"><span class="cat">${post.category}</span> · ${formatDate(post.date)}</div>
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
      </div>
      <span class="read-time">${post.readMinutes} min read</span>`;
    return a;
  }

  function renderJournalPreview() {
    const list = document.querySelector("[data-journal-preview]");
    if (!list) return;
    const sorted = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
    list.innerHTML = "";
    sorted.slice(0, 3).forEach((p) => list.appendChild(journalEntry(p)));
  }

  function renderJournalList() {
    const list = document.querySelector("[data-journal-list]");
    if (!list) return;
    const searchInput = document.querySelector("[data-journal-search]");
    const chips = document.querySelectorAll("[data-journal-chip]");
    const empty = document.querySelector("[data-journal-empty]");
    let activeCategory = "all";

    function draw() {
      const term = (searchInput && searchInput.value.trim().toLowerCase()) || "";
      const sorted = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));
      const filtered = sorted.filter((p) => {
        const matchesCat = activeCategory === "all" || p.category === activeCategory;
        const matchesTerm =
          !term ||
          p.title.toLowerCase().includes(term) ||
          p.excerpt.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term);
        return matchesCat && matchesTerm;
      });
      list.innerHTML = "";
      filtered.forEach((p) => list.appendChild(journalEntry(p)));
      if (empty) empty.hidden = filtered.length !== 0;
    }

    if (searchInput) searchInput.addEventListener("input", draw);
    chips.forEach((chip) =>
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.setAttribute("aria-pressed", "false"));
        chip.setAttribute("aria-pressed", "true");
        activeCategory = chip.dataset.journalChip;
        draw();
      })
    );
    draw();
  }

  /* ---------- render: single post ---------- */
  function renderPost() {
    const container = document.querySelector("[data-post]");
    if (!container) return;
    const params = new URLSearchParams(window.location.search);
    const post = findPost(params.get("slug"));

    if (!post) {
      container.innerHTML = `
        <p>We couldn't find that journal entry — it may have moved.</p>
        <a class="btn btn-ghost" href="blog.html">Back to the journal</a>`;
      document.title = "Entry not found · Be Craftee";
      return;
    }

    document.title = `${post.title} · Be Craftee`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", post.excerpt);

    container.innerHTML = `
      <div class="journal-meta"><span class="cat">${post.category}</span> · ${formatDate(post.date)} · ${post.readMinutes} min read</div>
      <h1>${post.title}</h1>
      <div class="post-cover"><img src="${post.cover}" alt="${post.title}"></div>
      <div class="post-body">${post.body.map((p) => `<p>${p}</p>`).join("")}</div>`;

    const related = document.querySelector("[data-post-related]");
    if (related) {
      const others = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
      related.innerHTML = "";
      others.forEach((p) => related.appendChild(journalEntry(p)));
    }
  }

  function initReadingProgress() {
    const bar = document.querySelector("[data-progress-bar]");
    const article = document.querySelector("[data-post]");
    if (!bar || !article) return;
    window.addEventListener("scroll", () => {
      const total = article.scrollHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(window.scrollY - article.offsetTop + 200, 0), total);
      bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : "0%";
    });
  }

  /* ---------- forms ---------- */
  function initContactForm() {
    const form = document.querySelector("[data-contact-form]");
    if (!form) return;

    const params = new URLSearchParams(window.location.search);
    const item = params.get("item");
    if (item) {
      const message = form.querySelector("#message");
      if (message) message.value = `Hi! I'd love to order the ${item}. Could you tell me more about availability?`;
    }

    form.addEventListener("submit", (e) => {
      const status = form.querySelector("[data-form-status]");
      const name = form.querySelector("#name");
      const email = form.querySelector("#email");
      const message = form.querySelector("#message");
      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        e.preventDefault();
        if (status) {
          status.textContent = "Please fill in every field before sending.";
          status.dataset.state = "error";
        }
        return;
      }
      if (status) {
        status.textContent = "Opening your email app to send this along…";
        status.dataset.state = "ok";
      }
    });
  }

  function initNewsletterForm() {
    const form = document.querySelector("[data-newsletter-form]");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = form.querySelector("[data-form-status]");
      const email = form.querySelector("input[type=email]").value.trim();
      if (!email) return;
      if (status) status.textContent = "You're on the list — thank you!";
      form.reset();
    });
  }

  /* ---------- footer year ---------- */
  function setYear() {
    document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
    initMobileNav();
    renderMakes();
    renderShop();
    renderJournalPreview();
    renderJournalList();
    renderPost();
    initReadingProgress();
    initContactForm();
    initNewsletterForm();
    setYear();
  });
})();
