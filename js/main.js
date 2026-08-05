/* Bootstrap, état global, navigation, i18n, reveals, glitch, formulaire. */

const state = { page: "home", lang: "fr", menuOpen: false };

let closeMobileMenu = function () {};
let stackedRevealModules = [];

/* ---------- Helpers ---------- */
function clamp01(v) { return Math.min(1, Math.max(0, v)); }
function lerp(a, b, t) { return a + (b - a) * t; }

function t(lang, path) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), I18N[lang]);
}

function getInitialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "fr" || saved === "en") return saved;
  } catch (e) { /* localStorage indisponible (navigation privée...) */ }
  return "fr";
}

/* ---------- Construction des cartes dynamiques (une seule fois au boot) ---------- */
const SVC_MOCKUPS = [
  `<div class="mock-browser">
     <div class="mock-browser-bar"><span></span><span></span><span></span></div>
     <div class="mock-browser-body">
       <div class="mock-line" style="width:60%"></div>
       <div class="mock-line" style="width:85%"></div>
       <div class="mock-line" style="width:70%"></div>
     </div>
   </div>`,
  `<svg width="40" height="40" viewBox="0 0 24 24" fill="#111111"><path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"/></svg>`,
  `<svg width="72" height="46" viewBox="0 0 100 60">
     <polyline points="8,46 40,32 92,10" fill="none" stroke="#b0b0b0" stroke-width="1.5" stroke-dasharray="4 3"/>
     <rect x="4" y="34" width="16" height="22" fill="#dadada"/>
     <rect x="38" y="22" width="16" height="34" fill="#999999"/>
     <rect x="72" y="8" width="16" height="48" fill="#111111"/>
   </svg>`,
];

function buildHomeServiceCards() {
  const grid = document.getElementById("svc-grid-home");
  if (!grid) return;
  grid.innerHTML = SERVICES_META.map((meta, i) => `
    <div class="svc-card" style="--point-color:${meta.pointColor}">
      <div class="svc-visual">${SVC_MOCKUPS[i] || ""}</div>
      <div class="svc-title"><span data-i18n="services.${i}.title"></span><i class="svc-blink">⌖</i></div>
      <div class="svc-num">${meta.num}</div>
      <p class="svc-desc" data-i18n="services.${i}.desc"></p>
      <div class="svc-price" data-i18n="services.${i}.price"></div>
    </div>
  `).join("");
}

function buildServicesPageCards() {
  const grid = document.getElementById("svc-page-grid");
  if (!grid) return;
  grid.innerHTML = SERVICES_META.map((meta, i) => {
    const pointsCount = I18N.fr.services[i].points.length;
    return `
    <div class="svc-page-card" style="--point-color:${meta.pointColor}">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
        <span class="svc-page-title" data-i18n="services.${i}.title"></span>
        <i class="svc-blink">⌖</i>
      </div>
      <div class="svc-num" style="margin-bottom:12px;">${meta.num}</div>
      <p class="svc-page-desc" data-i18n="services.${i}.desc"></p>
      <hr class="svc-page-sep">
      <div class="svc-page-price" data-i18n="services.${i}.price"></div>
      <ul class="svc-page-points">
        ${Array.from({ length: pointsCount }, (_, j) => `<li data-i18n="services.${i}.points.${j}"></li>`).join("")}
      </ul>
      <button type="button" class="btn btn-secondary" data-goto="contact" data-i18n="servicesCta"></button>
    </div>`;
  }).join("");
}

function buildProjectTicker() {
  return I18N.fr.projects.map((p) => p.title.toUpperCase()).join("&nbsp;&nbsp;&nbsp;◈&nbsp;&nbsp;&nbsp;") + "&nbsp;&nbsp;&nbsp;◈&nbsp;&nbsp;&nbsp;";
}

function buildHomeProjectCards() {
  const stage = document.getElementById("proj-stage");
  if (!stage) return;
  const cardsHtml = PROJECTS.map((p, i) => {
    const svcCount = I18N.fr.projects[i].services.length;
    return `
    <div class="proj-stacked-card" data-card-index="${i}">
      <div class="proj-home-card">
        <span class="proj-tag" data-i18n="projects.${i}.tag"></span>
        <a class="proj-visit" href="${p.url}" target="_blank" rel="noopener noreferrer" data-i18n="visit"></a>
        <img class="proj-screen-bg" src="${p.img}" alt="" loading="lazy">
        <div class="proj-home-info">
          <div class="proj-niche" data-i18n="projects.${i}.niche"></div>
          <div class="proj-home-title" data-i18n="projects.${i}.title"></div>
          <div class="proj-tags">
            ${Array.from({ length: svcCount }, (_, j) => `<span data-i18n="projects.${i}.services.${j}"></span>`).join("")}
          </div>
        </div>
      </div>
    </div>`;
  }).join("");
  stage.innerHTML = `<div class="stack-ticker" id="proj-ticker">${buildProjectTicker()}</div>` + cardsHtml;
}

function buildProjectsPageCards() {
  const stage = document.getElementById("projpage-stage");
  if (!stage) return;
  const cardsHtml = PROJECTS.map((p, i) => {
    const svcCount = I18N.fr.projects[i].services.length;
    return `
    <div class="projpage-card" data-card-index="${i}">
      <div class="projpage-card-inner">
        <div class="projpage-copy">
          <div class="projpage-niche" data-i18n="projects.${i}.niche"></div>
          <h3 class="projpage-title" data-i18n="projects.${i}.title"></h3>
          <p class="projpage-desc" data-i18n="projects.${i}.desc"></p>
          <div class="projpage-tags">
            ${Array.from({ length: svcCount }, (_, j) => `<span data-i18n="projects.${i}.services.${j}"></span>`).join("")}
          </div>
          <a class="projpage-btn" href="${p.url}" target="_blank" rel="noopener noreferrer"><span data-i18n="seeProject"></span> →</a>
        </div>
        <div class="projpage-img"><img src="${p.img}" alt="" loading="lazy"></div>
      </div>
    </div>`;
  }).join("");
  stage.innerHTML = `<div class="stack-ticker" id="projpage-ticker">${buildProjectTicker()}</div>` + cardsHtml;
}

/* ---------- i18n ---------- */
function applyLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const val = t(lang, el.dataset.i18n);
    if (val != null) el.textContent = val;
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const val = t(lang, el.dataset.i18nPlaceholder);
    if (val != null) el.placeholder = val;
  });

  const toggleLabel = lang === "fr" ? "EN" : "FR";
  document.querySelectorAll(".js-lang-toggle").forEach((btn) => { btn.textContent = toggleLabel; });

  try { localStorage.setItem("lang", lang); } catch (e) { /* ignore */ }
}

function wireLangToggle() {
  document.querySelectorAll(".js-lang-toggle").forEach((btn) => {
    btn.addEventListener("click", () => applyLanguage(state.lang === "fr" ? "en" : "fr"));
  });
}

/* ---------- Navigation / changement de page ---------- */
function setPage(page, opts) {
  opts = opts || {};
  state.page = page;

  document.querySelectorAll(".page-section").forEach((sec) => {
    sec.classList.toggle("is-active", sec.id === "page-" + page);
  });
  document.querySelectorAll(".nav-link[data-goto]").forEach((el) => {
    el.classList.toggle("is-current", el.dataset.goto === page);
  });

  closeMobileMenu();
  if (!opts.skipScroll) window.scrollTo({ top: 0, behavior: "auto" });
  stackedRevealModules.forEach((m) => m.update());
}

function wireNavigation() {
  document.querySelectorAll("[data-goto]").forEach((el) => {
    el.addEventListener("click", () => setPage(el.dataset.goto));
  });
}

function wireMobileMenu() {
  const menu = document.querySelector(".mobile-menu");
  const openBtn = document.querySelector(".js-menu-open");
  const closeBtn = document.querySelector(".js-menu-close");
  if (!menu) return;

  function openMenu() {
    menu.classList.add("is-open");
    document.body.classList.add("no-scroll");
    state.menuOpen = true;
  }
  function closeMenu() {
    menu.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    state.menuOpen = false;
  }

  if (openBtn) openBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.menuOpen) closeMenu();
  });

  closeMobileMenu = closeMenu;
}

/* ---------- Nav blur + coordination du scroll ---------- */
function initNavScroll() {
  const nav = document.querySelector(".nav");
  let ticking = false;

  function tick() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("nav-solid", y > 40);
    stackedRevealModules.forEach((m) => m.update());
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(tick);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();
}

/* ---------- Stacked scroll reveal (factorisé, réutilisé Home + Projects) ---------- */
function cardPhase(local) {
  if (local <= -0.15 || local >= 1.15) {
    return { opacity: 0, rotateX: local < 0 ? 55 : -80, translateY: local < 0 ? 44 : -44 };
  }
  if (local < 0.35) {
    const p = clamp01(local / 0.35);
    return { opacity: p, rotateX: lerp(55, 0, p), translateY: lerp(44, 0, p) };
  }
  if (local < 0.65) {
    return { opacity: 1, rotateX: 0, translateY: 0 };
  }
  const p = clamp01((local - 0.65) / 0.35);
  return { opacity: 1 - p, rotateX: lerp(0, -80, p), translateY: lerp(0, -44, p) };
}

function createStackedReveal({ spacerId, stageId, cardSelector, tickerId, pageKey }) {
  const spacer = document.getElementById(spacerId);
  const stage = document.getElementById(stageId);
  const cards = stage ? Array.from(stage.querySelectorAll(cardSelector)) : [];
  const ticker = tickerId ? document.getElementById(tickerId) : null;
  if (!spacer || !stage || !cards.length) return null;

  const n = cards.length;
  const perCard = 1 / n;
  let tickerWidth = 0;

  function update() {
    if (pageKey && state.page !== pageKey) {
      stage.classList.remove("is-visible");
      return;
    }

    const rect = spacer.getBoundingClientRect();
    const spacerH = spacer.offsetHeight;
    const viewH = window.innerHeight;
    const active = rect.top < viewH && rect.bottom > 0;

    stage.classList.toggle("is-visible", active);
    if (!active) return;

    const scrolled = -rect.top;
    const progress = clamp01(scrolled / Math.max(spacerH - viewH, 1));

    cards.forEach((card, i) => {
      const local = (progress - i * perCard) / perCard;
      const { opacity, rotateX, translateY } = cardPhase(local);
      card.style.opacity = opacity;
      card.style.transform = `perspective(1200px) translateY(${translateY}px) rotateX(${rotateX}deg)`;
      card.style.zIndex = i + 1;
    });

    if (ticker) {
      if (!tickerWidth) tickerWidth = ticker.scrollWidth;
      const maxShift = Math.max(tickerWidth - window.innerWidth, 0);
      ticker.style.transform = `translateY(-50%) translateX(${-progress * maxShift}px)`;
    }
  }

  return { update };
}

/* ---------- About : animation d'entrée rejouable ---------- */
function setupAboutReveal() {
  const section = document.querySelector(".about-sec");
  if (!section) return;

  const label = section.querySelector(".about-label-row");
  const title = section.querySelector(".about-title");
  const bio = section.querySelector(".about-bio");
  const pills = Array.from(section.querySelectorAll(".about-pill"));
  const stats = Array.from(section.querySelectorAll(".about-stat"));
  const all = [label, title, bio, ...pills, ...stats].filter(Boolean);

  let timers = [];
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  function playIn() {
    clearTimers();
    all.forEach((el) => { el.classList.remove("anim-in"); void el.offsetWidth; });
    if (label) label.classList.add("anim-in");
    timers.push(setTimeout(() => title && title.classList.add("anim-in"), 100));
    timers.push(setTimeout(() => bio && bio.classList.add("anim-in"), 150));
    pills.forEach((p, i) => timers.push(setTimeout(() => p.classList.add("anim-in"), 350 + i * 70)));
    stats.forEach((s, i) => timers.push(setTimeout(() => s.classList.add("anim-in"), 550 + i * 100)));
  }
  function playOut() {
    clearTimers();
    all.forEach((el) => el.classList.remove("anim-in"));
  }

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) playIn(); else playOut();
  }, { threshold: 0.2 });
  observer.observe(section);
}

/* ---------- Reveal générique des cartes services ---------- */
function setupCardReveal() {
  const cards = document.querySelectorAll(".svc-card");
  if (!cards.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  cards.forEach((card) => observer.observe(card));
}

/* ---------- Glitch hover (cartes services Home) ---------- */
function scrambleText(el) {
  const original = el.textContent;
  const chars = "01#*+-◆◇○●";
  const totalFrames = 12;
  let frame = 0;
  const interval = setInterval(() => {
    frame++;
    if (frame >= totalFrames) {
      el.textContent = original;
      clearInterval(interval);
      return;
    }
    el.textContent = original
      .split("")
      .map((c, i) => (i < frame ? c : chars[Math.floor(Math.random() * chars.length)]))
      .join("");
  }, 400 / totalFrames);
}

function animateDisplacement(card, filterEl) {
  const duration = 420;
  const peakScale = 35;
  const start = performance.now();
  card.classList.add("is-glitching");
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const scale = p < 0.5 ? (p / 0.5) * peakScale : (1 - (p - 0.5) / 0.5) * peakScale;
    filterEl.setAttribute("scale", scale.toFixed(2));
    if (p < 1) {
      requestAnimationFrame(step);
    } else {
      filterEl.setAttribute("scale", "0");
      card.classList.remove("is-glitching");
    }
  }
  requestAnimationFrame(step);
}

function setupGlitch() {
  const filterEl = document.querySelector("#svc-glitch feDisplacementMap");
  document.querySelectorAll(".svc-card, .svc-page-card").forEach((card) => {
    const numEl = card.querySelector(".svc-num");
    function trigger() {
      if (numEl) scrambleText(numEl);
      if (filterEl) animateDisplacement(card, filterEl);
    }
    card.addEventListener("mouseenter", trigger);
    card.addEventListener("touchstart", trigger, { passive: true });
  });
}

/* ---------- Formulaire de contact ---------- */
function wireContactForm() {
  const form = document.querySelector(".contact-form");
  const success = document.querySelector(".contact-success");
  if (!form || !success) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.classList.add("is-hidden");
    success.classList.remove("is-hidden");
  });
}

/* ---------- Bootstrap ---------- */
document.addEventListener("DOMContentLoaded", () => {
  buildHomeServiceCards();
  buildServicesPageCards();
  buildHomeProjectCards();
  buildProjectsPageCards();

  applyLanguage(getInitialLang());

  wireNavigation();
  wireLangToggle();
  wireMobileMenu();
  wireContactForm();
  setupAboutReveal();
  setupCardReveal();
  setupGlitch();

  const homeReveal = createStackedReveal({ spacerId: "proj-scroll-spacer", stageId: "proj-stage", cardSelector: ".proj-stacked-card", tickerId: "proj-ticker", pageKey: "home" });
  const projectsReveal = createStackedReveal({ spacerId: "projpage-scroll-spacer", stageId: "projpage-stage", cardSelector: ".projpage-card", tickerId: "projpage-ticker", pageKey: "projects" });
  stackedRevealModules = [homeReveal, projectsReveal].filter(Boolean);

  initNavScroll();
  setPage("home", { skipScroll: true });

  if (typeof initHeroScene === "function") initHeroScene();
});
