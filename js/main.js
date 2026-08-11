/* Bootstrap, état global, navigation, i18n, reveals, glitch, formulaire. */

const state = { page: "home", lang: "fr", menuOpen: false };

let closeMobileMenu = function () {};
let stackedRevealModules = [];

/* ---------- Helpers ---------- */
function clamp01(v) { return Math.min(1, Math.max(0, v)); }
function lerp(a, b, t) { return a + (b - a) * t; }
function easeOutCubic(p) { return 1 - Math.pow(1 - p, 3); }
function easeOutQuad(p) { return 1 - (1 - p) * (1 - p); }

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

function buildCardTicker(title) {
  const text = `${title.toUpperCase()}&nbsp;&nbsp;&nbsp;◈&nbsp;&nbsp;&nbsp;`;
  return `<div class="stack-ticker"><div class="stack-ticker-track"><span>${text}</span><span>${text}</span></div></div>`;
}

function buildHomeProjectCards() {
  const stage = document.getElementById("proj-stage");
  if (!stage) return;
  const cardsHtml = PROJECTS.map((p, i) => {
    const svcCount = I18N.fr.projects[i].services.length;
    return `
    <div class="proj-stacked-card" data-card-index="${i}">
      ${buildCardTicker(I18N.fr.projects[i].title)}
      <div class="proj-card-wrap">
        <div class="proj-card-head">
          <span class="proj-tag" data-i18n="projects.${i}.tag"></span>
          <a class="proj-visit" href="${p.url}" target="_blank" rel="noopener noreferrer" data-i18n="visit"></a>
        </div>
        <div class="proj-home-card">
          <img class="proj-screen-bg" src="${p.img}" alt="" loading="lazy">
          <div class="proj-home-info">
            <div class="proj-niche" data-i18n="projects.${i}.niche"></div>
            <div class="proj-home-title" data-i18n="projects.${i}.title"></div>
            <div class="proj-tags">
              ${Array.from({ length: svcCount }, (_, j) => `<span data-i18n="projects.${i}.services.${j}"></span>`).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }).join("");
  stage.innerHTML = cardsHtml;
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
  stage.innerHTML = cardsHtml;
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
  stackedRevealModules.forEach((m) => m.start());
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

/* ---------- Stacked scroll reveal (boucle rAF autonome) ---------- */
/* Page Projets : simple translateY + fondu. */
function cardPhaseFlat(local, isFirst) {
  if (local < -0.32 || local > 1.02) {
    return { opacity: 0, transform: "none", zIndex: 0, interactive: false };
  }
  const entryEnd = isFirst ? 0.3 : 0;
  if (local < entryEnd) {
    const entryStart = isFirst ? 0 : -0.3;
    const p = easeOutCubic(clamp01((local - entryStart) / (entryEnd - entryStart)));
    const ty = lerp(44, 0, p);
    return { opacity: clamp01(p * 1.5), transform: ty === 0 ? "none" : `translateY(${ty}px)`, zIndex: 2, interactive: true };
  }
  if (local >= 0.7) {
    const p = easeOutQuad(clamp01((local - 0.7) / 0.3));
    const ty = lerp(0, -44, p);
    return { opacity: clamp01(1 - p * 1.3), transform: ty === 0 ? "none" : `translateY(${ty}px)`, zIndex: 1, interactive: true };
  }
  return { opacity: 1, transform: "none", zIndex: 2, interactive: true };
}

/* Accueil : bascule 3D — la carte se relève depuis le bas (rotateX 55°→0°), tient le plateau,
   puis se rabat vers l'avant (rotateX 0°→-80°) pendant que la suivante se lève derrière elle. */
function cardPhase3D(local, isFirst) {
  if (local < -0.37 || local > 1.02) {
    return { opacity: 0, transform: "none", zIndex: 0, interactive: false };
  }
  const riseStart = isFirst ? 0 : -0.35;
  const riseEnd = isFirst ? 0.35 : 0;
  if (local < riseEnd) {
    const p = easeOutCubic(clamp01((local - riseStart) / (riseEnd - riseStart)));
    const rotateX = lerp(55, 0, p);
    const scale = lerp(0.92, 1, p);
    return {
      opacity: clamp01(p * 1.5),
      transform: `perspective(900px) rotateX(${rotateX}deg) scale(${scale})`,
      zIndex: isFirst ? 2 : 1,
      interactive: true,
    };
  }
  if (local < 0.65) {
    return { opacity: 1, transform: "none", zIndex: 2, interactive: true };
  }
  const p = easeOutQuad(clamp01((local - 0.65) / 0.35));
  const rotateX = lerp(0, -80, p);
  const scale = lerp(1, 0.92, p);
  return {
    opacity: clamp01(1 - p * 1.3),
    transform: `perspective(900px) rotateX(${rotateX}deg) scale(${scale})`,
    zIndex: 3,
    interactive: true,
  };
}

function createStackedReveal({ spacerId, stageId, cardSelector, pageKey, phaseFn = cardPhaseFlat }) {
  let spacer = null;
  let stage = null;
  let cards = [];
  let perCard = 1;
  let rafId = null;
  let ready = false;

  function resolveEls() {
    spacer = document.getElementById(spacerId);
    stage = document.getElementById(stageId);
    cards = stage ? Array.from(stage.querySelectorAll(cardSelector)) : [];
    if (!spacer || !stage || !cards.length) return false;
    perCard = 1 / cards.length;
    return true;
  }

  function hideStage() {
    stage.style.opacity = "0";
    stage.style.visibility = "hidden";
    stage.style.pointerEvents = "none";
  }

  function applyCards(progress) {
    cards.forEach((card, i) => {
      const local = (progress - i * perCard) / perCard;
      const ph = phaseFn(local, i === 0);
      card.style.transform = ph.transform;
      card.style.opacity = ph.opacity;
      card.style.zIndex = ph.zIndex;
      card.style.pointerEvents = ph.interactive ? "auto" : "none";
    });
  }

  function frame() {
    if (state.page !== pageKey) {
      rafId = null; // auto-annulation : on quitte la page, pas de reschedule
      return;
    }

    const rect = spacer.getBoundingClientRect();
    const spacerH = spacer.offsetHeight;
    const viewH = window.innerHeight;
    const scrolled = -rect.top;
    const range = Math.max(spacerH - viewH, 1);

    if (scrolled < 0 || scrolled > range) {
      hideStage();
    } else {
      stage.style.opacity = "1";
      stage.style.visibility = "visible";
      stage.style.pointerEvents = "auto";

      const progress = clamp01(scrolled / range);
      if (!ready) cards.forEach((card) => { card.style.transition = "none"; });
      applyCards(progress);
      if (!ready) {
        void stage.offsetWidth; // force le rendu de la frame sans transition avant de la réactiver
        cards.forEach((card) => { card.style.transition = ""; });
        ready = true;
      }
    }

    rafId = requestAnimationFrame(frame);
  }

  function start() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    if (!resolveEls()) {
      setTimeout(start, 150);
      return;
    }
    ready = false;
    rafId = requestAnimationFrame(frame);
  }

  start();
  return { start };
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
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&";

function scrambleText(el) {
  if (el._scrambleRaf) cancelAnimationFrame(el._scrambleRaf);
  if (!el.dataset.orig) el.dataset.orig = el.textContent;
  const original = el.dataset.orig;
  const duration = 400;
  const start = performance.now();
  function step(now) {
    const p = clamp01((now - start) / duration);
    const resolved = Math.floor(p * original.length);
    el.textContent = original
      .split("")
      .map((c, i) => (i < resolved ? c : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]))
      .join("");
    if (p < 1) {
      el._scrambleRaf = requestAnimationFrame(step);
    } else {
      el.textContent = original;
      el._scrambleRaf = null;
    }
  }
  el._scrambleRaf = requestAnimationFrame(step);
}

function resetScramble(el) {
  if (el._scrambleRaf) {
    cancelAnimationFrame(el._scrambleRaf);
    el._scrambleRaf = null;
  }
  if (el.dataset.orig) el.textContent = el.dataset.orig;
}

function animateDisplacement(card, filterEl) {
  if (card._glitchRaf) cancelAnimationFrame(card._glitchRaf);
  const duration = 350;
  const peakScale = 5;
  const start = performance.now();
  card.style.filter = "url(#svc-glitch)";
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    const scale = p < 0.4 ? (p / 0.4) * peakScale : (1 - (p - 0.4) / 0.6) * peakScale;
    filterEl.setAttribute("scale", scale.toFixed(2));
    if (p < 1) {
      card._glitchRaf = requestAnimationFrame(step);
    } else {
      filterEl.setAttribute("scale", "0");
      card.style.filter = "";
      card._glitchRaf = null;
    }
  }
  card._glitchRaf = requestAnimationFrame(step);
}

function resetDisplacement(card, filterEl) {
  if (card._glitchRaf) {
    cancelAnimationFrame(card._glitchRaf);
    card._glitchRaf = null;
  }
  if (filterEl) filterEl.setAttribute("scale", "0");
  card.style.filter = "";
}

function setupGlitch() {
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;
  const filterEl = document.querySelector("#svc-glitch feDisplacementMap");
  document.querySelectorAll(".svc-card, .svc-page-card").forEach((card) => {
    const tagEl = card.querySelector(".svc-num");
    if (card._glitchEnter) card.removeEventListener("mouseenter", card._glitchEnter);
    if (card._glitchLeave) {
      card.removeEventListener("mouseleave", card._glitchLeave);
      card.removeEventListener("touchend", card._glitchLeave);
    }
    function onEnter() {
      if (tagEl) scrambleText(tagEl);
      if (filterEl) animateDisplacement(card, filterEl);
    }
    function onLeave() {
      if (tagEl) resetScramble(tagEl);
      if (filterEl) resetDisplacement(card, filterEl);
    }
    card._glitchEnter = onEnter;
    card._glitchLeave = onLeave;
    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("touchstart", onEnter, { passive: true });
    card.addEventListener("mouseleave", onLeave);
    card.addEventListener("touchend", onLeave);
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

  const homeReveal = createStackedReveal({ spacerId: "proj-scroll-spacer", stageId: "proj-stage", cardSelector: ".proj-stacked-card", pageKey: "home", phaseFn: cardPhase3D });
  const projectsReveal = createStackedReveal({ spacerId: "projpage-scroll-spacer", stageId: "projpage-stage", cardSelector: ".projpage-card", pageKey: "projects", phaseFn: cardPhaseFlat });
  stackedRevealModules = [homeReveal, projectsReveal].filter(Boolean);

  initNavScroll();
  setPage("home", { skipScroll: true });

  if (typeof initHeroScene === "function") initHeroScene();
});
