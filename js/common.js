(function () {
  const DISCORD_URL = "https://dc.dewyofficial.hu";

  const SEARCH_PAGES = [
    { href: "index.html", hu: "Üdvözlünk", en: "Welcome" },
    { href: "dewyairdrops.html", hu: "dewyairdrops", en: "dewyairdrops" },
    { href: "dewyhider.html", hu: "dewyhider", en: "dewyhider" },
    { href: "dewyvoucher.html", hu: "dewyvoucher", en: "dewyvoucher" },
    { href: "dewycrates.html", hu: "dewycrates", en: "dewycrates" },
    { href: "dewyvanish.html", hu: "dewyvanish", en: "dewyvanish" },
  ];

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-lang-block]").forEach((el) => {
      el.hidden = el.getAttribute("data-lang-block") !== lang;
    });
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && typeof t === "function" && t(key, lang)) {
        el.textContent = t(key, lang);
      }
    });
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
    const searchInput = document.getElementById("search-input");
    if (searchInput && typeof t === "function") {
      searchInput.placeholder = t("searchPlaceholder", lang);
    }
  }

  function initTheme() {
    const saved = localStorage.getItem("dewy-docs-theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved === "light" ? "light" : "dark");
  }

  function toggleTheme() {
    const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("dewy-docs-theme", next);
  }

  function setActiveNav() {
    const page = document.body.dataset.page;
    if (!page) return;
    document.querySelectorAll(".nav-item[data-page]").forEach((el) => {
      el.classList.toggle("active", el.dataset.page === page);
    });
  }

  function buildToc() {
    const list = document.getElementById("toc-list");
    if (!list) return;
    const headings = document.querySelectorAll(".content h2, .content h3");
    list.innerHTML = "";
    headings.forEach((h) => {
      if (!h.id) return;
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent.trim();
      if (h.tagName === "H3") a.classList.add("toc-h3");
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function closeMobileSidebar() {
    const sidebar = document.getElementById("sidebar");
    const backdrop = document.getElementById("sidebar-backdrop");
    if (sidebar) sidebar.classList.remove("open");
    if (backdrop) backdrop.hidden = true;
  }

  function openSearch() {
    const overlay = document.getElementById("search-overlay");
    if (!overlay) return;
    overlay.hidden = false;
    const input = document.getElementById("search-input");
    if (input) {
      input.value = "";
      input.focus();
      renderSearch("");
    }
  }

  function closeSearch() {
    const overlay = document.getElementById("search-overlay");
    if (overlay) overlay.hidden = true;
  }

  function renderSearch(q) {
    const ul = document.getElementById("search-results");
    if (!ul) return;
    const lang = typeof currentLang !== "undefined" ? currentLang : "hu";
    const query = q.trim().toLowerCase();
    if (!query) {
      ul.innerHTML = "";
      return;
    }
    ul.innerHTML = SEARCH_PAGES.filter((p) => {
      const label = (lang === "hu" ? p.hu : p.en).toLowerCase();
      return label.includes(query) || p.href.toLowerCase().includes(query);
    })
      .map((p) => {
        const label = lang === "hu" ? p.hu : p.en;
        return '<li><a href="' + p.href + '">' + label + "</a></li>";
      })
      .join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTheme();
    if (typeof setLang === "function") {
      setLang(typeof currentLang !== "undefined" ? currentLang : "hu");
    } else {
      applyLang("hu");
    }
    setActiveNav();
    buildToc();

    document.getElementById("theme-toggle")?.addEventListener("click", toggleTheme);
    document.getElementById("search-btn")?.addEventListener("click", openSearch);
    document.getElementById("search-overlay")?.addEventListener("click", function (e) {
      if (e.target.id === "search-overlay") closeSearch();
    });
    document.getElementById("search-input")?.addEventListener("input", function (e) {
      renderSearch(e.target.value);
    });
    document.getElementById("menu-toggle")?.addEventListener("click", function () {
      document.getElementById("sidebar")?.classList.add("open");
      const backdrop = document.getElementById("sidebar-backdrop");
      if (backdrop) backdrop.hidden = false;
    });
    document.getElementById("sidebar-backdrop")?.addEventListener("click", closeMobileSidebar);

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (typeof setLang === "function") setLang(btn.dataset.lang);
        else applyLang(btn.dataset.lang);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeSearch();
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
    });
  });
})();
