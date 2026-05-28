const I18N = {
  hu: {
    siteTitle: "Dewy Studios",
    "nav.welcome": "Üdvözlünk",
    "nav.pluginsBeta": "Pluginek (Béta)",
    "nav.planned": "Tervezett pluginek",
    "nav.support": "Támogatás",
    "nav.discord": "Discord",
    "toc.title": "Ezen az oldalon",
    lastModified: "Utoljára módosítva",
    betaWarning: "Ez a plugin béta állapotban van — egyes funkciók és beállítások változhatnak!",
    globalBeta: "Az összes Dewy Studios plugin jelenleg béta. A letöltések és funkciók fokozatosan érkeznek.",
    downloadBeta: "Béta letöltés",
    comingSoon: "Hamarosan",
    downloadNote: "A béta JAR hamarosan elérhető lesz itt. Addig is a Discord szerveren kérhetsz hozzáférést.",
    downloadDiscord: "Kérés a Discordon",
    noDownload: "Ez a plugin még nem tölthető le.",
    plannedBadge: "Tervezett",
    searchPlaceholder: "Keresés…",
  },
  en: {
    siteTitle: "Dewy Studios",
    "nav.welcome": "Welcome",
    "nav.pluginsBeta": "Plugins (Beta)",
    "nav.planned": "Planned plugins",
    "nav.support": "Support",
    "nav.discord": "Discord",
    "toc.title": "On this page",
    lastModified: "Last modified",
    betaWarning: "This plugin is in beta — some features and settings may still change!",
    globalBeta: "All Dewy Studios plugins are currently in beta. Downloads and features are rolling out gradually.",
    downloadBeta: "Download Beta",
    comingSoon: "Coming soon",
    downloadNote: "The beta JAR will be available here soon. Until then, request access on our Discord server.",
    downloadDiscord: "Request on Discord",
    noDownload: "This plugin is not available for download yet.",
    plannedBadge: "Planned",
    searchPlaceholder: "Search…",
  },
};

function t(key, lang) {
  const l = lang || currentLang;
  return I18N[l]?.[key] ?? I18N.en[key] ?? key;
}

var currentLang = localStorage.getItem("dewy-docs-lang") || "hu";

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("dewy-docs-lang", lang);
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key && I18N[lang][key]) el.textContent = I18N[lang][key];
  });
  document.querySelectorAll("[data-lang-block]").forEach((el) => {
    el.hidden = el.getAttribute("data-lang-block") !== lang;
  });
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.placeholder = t("searchPlaceholder", lang);
}
