/* =========================================================
   SiteQuest Studio — interactions
   ========================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
const store = {
  get(k, d) { try { const v = localStorage.getItem("webloom:" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem("webloom:" + k, JSON.stringify(v)); } catch {} },
};
let briefReady = false;
const eur = n => "€" + Math.round(n).toLocaleString("en-US");

let toastT;
function toast(msg) {
  const t = $("#toast"); t.textContent = msg; t.classList.add("is-on");
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("is-on"), 2600);
}

/* ============ Smooth scroll + GSAP ============ */
let lenis;
if (window.gsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
if (!REDUCED && window.Lenis) {
  lenis = new Lenis({ lerp: .1, smoothWheel: true, prevent: n => !!n.closest(".browser__view, .panel, .modal, .cmp__scroll") });
  if (window.gsap) { lenis.on("scroll", ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
  else { const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
}
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute("href");
  if (a.hasAttribute("data-todo")) { e.preventDefault(); toast("Legal pages are added before launch."); return; }
  if (id.length < 2) return;
  const el = $(id); if (!el) return;
  e.preventDefault();
  $("#nav").classList.remove("is-open"); $("#navMenu").setAttribute("aria-expanded", "false");
  if (lenis) lenis.scrollTo(el, { offset: -70, duration: 1.4 }); else el.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });
});

/* ============ Nav ============ */
(() => {
  const nav = $("#nav"); let last = 0;
  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle("is-scrolled", y > 40);
    nav.classList.toggle("is-hidden", y > last && y > 600 && !nav.classList.contains("is-open"));
    last = y;
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  $("#navMenu").addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    $("#navMenu").setAttribute("aria-expanded", open);
  });
})();

/* ============ Bloom (hero canvas) ============ */
class Bloom {
  constructor(canvas, o = {}) {
    this.c = canvas; this.x = canvas.getContext("2d");
    this.open = o.startOpen ?? 0; this.target = 1; this.scroll = 0; this.t = 0;
    this.mx = 0; this.my = 0; this.tmx = 0; this.tmy = 0; this.speed = o.speed ?? 1;
    this.dark = !!o.dark;
    this.rings = [
      { n: 11, len: .96, w: .3, a: "#0E3B3A", b: "#2C6E67", off: 0, depth: .25, alpha: .96 },
      { n: 9, len: .74, w: .3, a: "#F4B6C2", b: "#FBE3E8", off: .5, depth: .55, alpha: .94 },
      { n: 7, len: .4, w: .26, a: "#F2C14E", b: "#F8DE97", off: .25, depth: .85, alpha: .95 },
    ];
    if (this.dark) { this.rings[0].a = "#F4B6C2"; this.rings[0].b = "#F9D6DD"; this.rings[1].a = "#2C6E67"; this.rings[1].b = "#5BA39A"; }
    this.resize(); addEventListener("resize", () => this.resize());
    if (o.interactive !== false) {
      addEventListener("pointermove", e => { this.tmx = e.clientX / innerWidth - .5; this.tmy = e.clientY / innerHeight - .5; }, { passive: true });
    }
    this.visible = true;
    new IntersectionObserver(([en]) => { this.visible = en.isIntersecting; if (this.visible) this.loop(); }, { threshold: 0 }).observe(canvas);
    if (REDUCED) { this.open = 1; this.draw(); } else this.loop();
  }
  resize() {
    const r = this.c.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
    this.c.width = r.width * d; this.c.height = r.height * d; this.d = d; this.w = r.width; this.h = r.height;
    if (REDUCED) this.draw();
  }
  petal(len, w, ang, a, b, alpha) {
    const x = this.x;
    x.save(); x.rotate(ang);
    const g = x.createLinearGradient(0, 0, 0, -len); g.addColorStop(0, a); g.addColorStop(1, b);
    x.globalAlpha = alpha; x.fillStyle = g;
    x.beginPath(); x.moveTo(0, 0);
    x.bezierCurveTo(w * 1.05, -len * .22, w * .9, -len * .86, 0, -len);
    x.bezierCurveTo(-w * .9, -len * .86, -w * 1.05, -len * .22, 0, 0);
    x.fill();
    x.globalAlpha = alpha * .35; x.strokeStyle = "rgba(8,38,37,.35)"; x.lineWidth = .6; x.stroke();
    x.restore();
  }
  draw() {
    const x = this.x, R = Math.min(this.w, this.h) * .42;
    x.setTransform(this.d, 0, 0, this.d, 0, 0); x.clearRect(0, 0, this.w, this.h);
    const open = Math.min(this.open + this.scroll * .5, 1.5);
    const breath = Math.sin(this.t * .9) * .015;
    this.rings.forEach((r, ri) => {
      x.save();
      x.translate(this.w / 2 + this.mx * 40 * r.depth, this.h * .47 + this.my * 40 * r.depth + (1 - Math.min(open, 1)) * R * .35);
      const spin = this.t * .05 * (ri % 2 ? -1 : 1) * this.speed + this.mx * .3 * r.depth + this.scroll * (ri % 2 ? -.8 : .8);
      for (let i = 0; i < r.n; i++) {
        const base = (i / r.n + r.off / r.n) * Math.PI * 2 + spin;
        const closed = (i / (r.n - 1) - .5) * .7;
        const o = Math.min(open, 1);
        const ang = closed + (base - closed) * o;
        const len = R * r.len * (.45 + .55 * o + breath) * (1 + Math.max(open - 1, 0) * .25);
        this.petal(len, R * r.w * (.55 + .45 * o), ang, r.a, r.b, r.alpha);
      }
      x.restore();
    });
    // core
    x.save(); x.translate(this.w / 2 + this.mx * 40, this.h * .47 + this.my * 40 + (1 - Math.min(open, 1)) * R * .35);
    const cg = x.createRadialGradient(-R * .03, -R * .03, 0, 0, 0, R * .13);
    cg.addColorStop(0, "#FFF6DE"); cg.addColorStop(1, "#E3A92C");
    x.fillStyle = cg; x.beginPath(); x.arc(0, 0, R * .11 * (.6 + .4 * Math.min(open, 1)), 0, Math.PI * 2); x.fill();
    for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2 + this.t * .2; x.fillStyle = "#082625"; x.globalAlpha = .55; x.beginPath(); x.arc(Math.cos(a) * R * .07, Math.sin(a) * R * .07, R * .008, 0, 7); x.fill(); }
    x.restore();
  }
  loop() {
    if (this.raf || !this.visible || REDUCED) return;
    const step = () => {
      this.raf = null;
      if (!this.visible) return;
      this.t += .016; this.mx += (this.tmx - this.mx) * .05; this.my += (this.tmy - this.my) * .05;
      this.draw(); this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }
}
const bloom = new Bloom($("#bloom"));
const bloom2 = new Bloom($("#bloom2"), { dark: true, startOpen: 1, interactive: false, speed: .6 });

/* ============ Hero intro: the one orchestrated moment ============ */
if (window.gsap && !REDUCED) {
  const tl = gsap.timeline({ delay: .15 });
  tl.from(".hero h1 .line > span", { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: .09 })
    .to(bloom, { open: 1, duration: 2.4, ease: "expo.out" }, 0.1)
    .from(".hero__sub > *", { y: 20, opacity: 0, duration: .9, ease: "expo.out", stagger: .1 }, .55)
    .from(".hero__note", { opacity: 0, duration: 1 }, 1.4)
    .from(".nav", { yPercent: -100, duration: .9, ease: "expo.out", clearProps: "transform" }, .3);
  // Safety net: the menu bar must always end up visible, even if the intro was interrupted (e.g. a background tab)
  setTimeout(() => gsap.set(".nav", { clearProps: "transform" }), 2500);
  ScrollTrigger.create({ trigger: ".hero", start: "top top", end: "bottom top", scrub: true, onUpdate: s => { bloom.scroll = s.progress; } });
  gsap.to(".hero__canvas-wrap", { yPercent: 18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  $$(".reveal").forEach(el => gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } }));
  gsap.to(".steps__progress", { scaleX: 1, ease: "none", scrollTrigger: { trigger: "#steps", start: "top 80%", end: "bottom 55%", scrub: true } });
  gsap.from("#steps li", { opacity: 0, y: 30, stagger: .12, duration: .9, ease: "expo.out", scrollTrigger: { trigger: "#steps", start: "top 80%" } });
} else {
  bloom.open = 1; $$(".reveal").forEach(el => { el.style.opacity = 1; el.style.transform = "none"; });
}

/* ============ Personalised hero: your name, blooming into a site ============ */
const slug = n => (n || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "your-business";
const me = Object.assign({ name: "", kind: "bakery", showName: false }, store.get("me", {}));
const saveMe = () => store.set("me", me);
const HERO_KINDS = [["Café", "bakery"], ["Restaurant", "restaurant"], ["Shop", "shop"], ["Trades", "plumber"], ["Clinic", "dental"], ["Salon", "barber"], ["Hotel", "hotel"], ["App", "quill"]];
const hero = (() => {
  const wrap = $(".hero__canvas-wrap"), view = $("#heroView"), input = $("#tryName"), kinds = $("#tryKinds");
  const note = $("#heroNote"), cta = $("#heroCta"), noteText = note.textContent;
  let shown = false, picked = false, last = "", t;
  kinds.innerHTML = HERO_KINDS.map(([l, id]) => `<button class="chip" type="button" data-id="${id}" aria-pressed="false">${l}</button>`).join("");
  const scale = () => { const m = $(".mini:not(.is-old)", view); if (m) m.style.transform = `scale(${view.clientWidth / 1280})`; };
  // Until the visitor types, the hero demonstrates itself with example businesses.
  const DEMO = [["Bakkerij Jansen", "bakery"], ["Studio Mila", "barber"], ["Atelier Noor", "shop"], ["Druppel Loodgieters", "plumber"], ["Hotel De Linde", "hotel"]];
  let demo = null, demoI = 0, demoT, typeT;
  function render() {
    const own = !!me.name || picked;
    const name = me.name || (demo ? demo[0] : ""), kind = own ? me.kind : demo ? demo[1] : me.kind;
    const key = name + "|" + kind;
    $$(".chip", kinds).forEach(b => b.setAttribute("aria-pressed", own ? picked && b.dataset.id === me.kind : !!demo && b.dataset.id === kind));
    if (!name && !picked) {
      wrap.classList.remove("is-site"); shown = false; last = "";
      note.textContent = noteText; cta.textContent = "Get a free quote"; return;
    }
    if (key !== last) {
      last = key;
      $$(".mini", view).forEach(m => { m.classList.add("is-old"); setTimeout(() => m.parentNode && m.parentNode.removeChild(m), 500); });
      view.insertAdjacentHTML("beforeend", `<div class="mini">${renderSite(siteById(kind), { name, motion: 1 })}</div>`);
      scale();
    }
    $("#heroUrl").textContent = (name ? slug(name) : slug(siteById(kind).name)) + ".com";
    if (!shown) { wrap.classList.add("is-site"); shown = true; }
    note.textContent = !own && demo
      ? `For example, ${name}. Type your own business name to see yours.`
      : me.name ? `A first sketch for ${name}. We design the real one around your business, and you only pay once you love it.`
      : "Now type your business name to see it on the page.";
    cta.textContent = me.name ? "Make this real, free quote" : "Get a free quote";
  }
  function typeDemo(text) {
    clearInterval(typeT);
    if (REDUCED) { input.placeholder = text; return; }
    let i = 0; input.placeholder = "";
    typeT = setInterval(() => { input.placeholder = text.slice(0, ++i); if (i >= text.length) clearInterval(typeT); }, 55);
  }
  let heroOn = true;
  new IntersectionObserver(([e]) => { heroOn = e.isIntersecting; }).observe(wrap);
  function stepDemo() {
    // Only cycle while the hero is on screen, to save work further down the page
    if (!heroOn) { demoT = setTimeout(stepDemo, 1500); return; }
    demo = DEMO[demoI++ % DEMO.length];
    typeDemo(demo[0]);
    setTimeout(() => { if (demo) render(); }, REDUCED ? 0 : demo[0].length * 55 + 150);
    demoT = setTimeout(stepDemo, REDUCED ? 6000 : 4600);
  }
  function stopDemo() {
    if (!demo && !demoT) return;
    clearTimeout(demoT); clearInterval(typeT); demoT = null; demo = null;
    input.placeholder = "Your business name"; last = ""; render();
  }
  input.addEventListener("focus", stopDemo);
  kinds.addEventListener("pointerdown", stopDemo);
  if (!me.name) setTimeout(() => { if (!me.name && !picked && document.activeElement !== input) stepDemo(); }, REDUCED ? 300 : 2600);
  // On phones the preview sits above the headline: bring it into view once they've typed or picked.
  const reveal = () => {
    if (!shown || !matchMedia("(max-width: 960px)").matches) return false;
    const r = wrap.getBoundingClientRect(); if (r.top >= 0 && r.bottom <= innerHeight) return false;
    lenis ? lenis.scrollTo(wrap, { offset: -80, duration: 1.1 }) : wrap.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });
    return true;
  };
  input.value = me.name;
  input.addEventListener("change", () => setTimeout(reveal, 260));
  input.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => { me.name = input.value.trim().slice(0, 32); saveMe(); render(); onNameChange(); }, 220); });
  $("#tryForm").addEventListener("submit", e => { e.preventDefault(); input.blur(); });
  kinds.addEventListener("click", e => { const b = e.target.closest(".chip"); if (!b) return; picked = !(picked && me.kind === b.dataset.id); me.kind = b.dataset.id; saveMe(); render(); reveal(); });
  cta.addEventListener("click", () => {
    if (!me.name) return;
    brief.f.bName = me.name;
    const ind = siteById(me.kind).industry;
    saveBrief(); if (calc.step === 4) renderStage(false);
  });
  new ResizeObserver(scale).observe(view);
  // Returning visitors: let the flower open first, then bloom into their site.
  if (me.name) { picked = true; setTimeout(render, REDUCED ? 0 : 2200); }
  return { render, syncInput: () => { if (input !== document.activeElement) input.value = me.name; } };
})();
// Called whenever the visitor's business name changes, from any input on the page.
let nameT;
function onNameChange() {
  hero.syncInput();
  const sn = $("#showName"); if (sn && sn !== document.activeElement) sn.value = me.name;
  if (briefReady) renderStudioPreview();
  if (briefReady && me.showName) { clearTimeout(nameT); nameT = setTimeout(renderGrid, 350); }
}

/* Signature demo: beans and cup drift with the pointer and with scrolling inside the preview. */
if (!REDUCED) {
  document.addEventListener("pointermove", e => {
    const h = e.target.closest && e.target.closest(".sig-hero"); if (!h) return;
    const r = h.getBoundingClientRect();
    h.style.setProperty("--mx", ((e.clientX - r.left) / r.width - .5).toFixed(3));
    h.style.setProperty("--my", ((e.clientY - r.top) / r.height - .5).toFixed(3));
  }, { passive: true });
  document.addEventListener("pointerout", e => {
    const h = e.target.closest && e.target.closest(".sig-hero");
    if (h && !h.contains(e.relatedTarget)) { h.style.setProperty("--mx", 0); h.style.setProperty("--my", 0); }
  }, { passive: true });
  document.addEventListener("scroll", e => {
    const t = e.target; if (!(t instanceof Element)) return;
    const h = t.querySelector(".sig-hero"); if (h) h.style.setProperty("--sy", Math.round(t.scrollTop));
  }, { capture: true, passive: true });
}

/* ============ Marquee ============ */
(() => {
  const words = ["Restaurants", "Hotels", "Fashion", "Dentists", "Bakeries", "Gyms", "Lawyers", "Architects", "Online stores", "Photographers", "Builders", "Salons"];
  const html = words.map(w => `<span>${w}</span>`).join("");
  if ($("#marquee")) $("#marquee").innerHTML = html + html;
})();

/* ============ Shared: segmented control pill ============ */
function segPill(seg) {
  const on = $("button[aria-pressed=true]", seg), pill = $(".seg__pill", seg);
  if (!on || !pill) return;
  pill.style.width = on.offsetWidth + "px"; pill.style.transform = `translateX(${on.offsetLeft}px)`;
}
addEventListener("resize", () => $$(".seg").forEach(segPill));

/* ============ Demo-site interactions (inside any browser view) ============ */
document.addEventListener("click", e => {
  const view = e.target.closest(".browser__view, .card__thumb");
  if (!view || view.classList.contains("card__thumb")) return;
  const go = e.target.closest("[data-goto]");
  if (go) {
    e.preventDefault();
    const t = view.querySelector("#" + go.dataset.goto);
    const scroller = view.closest(".modal__body") || view;
    if (t) scroller.scrollTo({ top: t.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - (scroller === view ? 0 : 60), behavior: REDUCED ? "auto" : "smooth" });
    return;
  }
  if (e.target.closest("[data-demo]")) { e.preventDefault(); toast("This is a demo site. Buttons like this work on the real one."); }
});
function deviceToggle(browser, onChange) {
  $$("[data-device]", browser).forEach(b => b.addEventListener("click", () => {
    $$("[data-device]", browser).forEach(x => x.setAttribute("aria-pressed", x === b));
    browser.classList.toggle("is-mobile", b.dataset.device === "mobile");
    onChange && onChange(b.dataset.device);
  }));
}

/* ============ Pricing config (single source of truth) ============ */
const PACKAGES = {
  essential: { name: "Essential", price: 499, pages: 5, days: 7, for: "For freelancers, starters and small local businesses.",
    feats: ["Up to 5 pages", "Custom design in your colours and fonts", "Looks great on phone and desktop", "Contact form", "Basic SEO and fast loading", "Subtle animations", "SSL and launch included"] },
  business: { name: "Business", price: 999, pages: 10, days: 14, for: "For established businesses that want to stand out and sell more.",
    feats: ["Up to 10 pages", "More custom layouts and sections", "Richer animations and interactions", "Advanced forms and Google Maps", "Analytics set up", "Stronger SEO structure", "Edit your own text and photos (CMS)"], newFrom: 1 },
  signature: { name: "Signature", price: 1999, pages: 20, days: 21, for: "For brands that want a site people talk about.",
    feats: ["Up to 20 pages", "Fully bespoke design and storytelling", "Advanced animation and scroll effects", "Custom functionality included", "Advanced SEO set up", "Blog included", "Priority planning and support"], newFrom: 1 },
};
const PK_ORDER = ["essential", "business", "signature"];
const ADDONS = [
  { group: "Branding", items: [
    { id: "logo", name: "Logo design", desc: "3 concepts, 2 revisions, all file formats.", price: 99, feature: true },
    { id: "mini", name: "Mini brand identity", desc: "Logo, colours, fonts and a one-page guide.", price: 199 },
    { id: "brand", name: "Complete brand identity", desc: "Mini identity plus icons, patterns and full guidelines.", price: 349 },
    { id: "cards", name: "Business card design", desc: "Print-ready front and back.", price: 39 },
    { id: "social", name: "Social media kit", desc: "Profile images, covers and 6 post templates.", price: 59 },
  ]},
  { group: "Features", items: [
    { id: "booking", name: "Online booking", desc: "Connect Calendly, Cal.com or similar.", price: 99 },
    { id: "form", name: "Advanced contact form", desc: "Multi-step, file uploads, auto-replies.", price: 39, inc: ["business", "signature"] },
    { id: "maps", name: "Google Maps", desc: "Interactive map with your location.", price: 19, inc: ["business", "signature"] },
    { id: "whatsapp", name: "WhatsApp button", desc: "Customers message you in one tap.", price: 29 },
    { id: "newsletter", name: "Newsletter signup", desc: "Mailchimp, Brevo or similar.", price: 49 },
    { id: "blog", name: "Blog", desc: "Write and publish posts yourself.", price: 79, inc: ["signature"] },
    { id: "login", name: "Customer login", desc: "Accounts and a private area. Starting price.", price: 199, from: true },
  ]},
  { group: "Online store", note: "Payment provider fees (for example Mollie or Stripe) are paid by you to the provider and are not included.", items: [
    { id: "store", name: "Online store", desc: "Cart, checkout and order emails. Starting price.", price: 299, from: true },
    { id: "catalog", name: "Product setup", desc: "We add up to 30 products for you.", price: 99 },
    { id: "filter", name: "Product filters", desc: "Filter by size, colour, price.", price: 79 },
    { id: "coupons", name: "Discount codes", desc: "Coupons and sale prices.", price: 39 },
  ]},
  { group: "SEO and content", note: "We never promise rankings or sales. We do set everything up properly.", items: [
    { id: "analytics", name: "Analytics setup", desc: "Privacy-friendly visitor stats.", price: 49, inc: ["business", "signature"] },
    { id: "seo", name: "Advanced SEO", desc: "Structured data, redirects, speed tuning.", price: 149, inc: ["signature"] },
    { id: "local", name: "Local SEO", desc: "Show up for searches near you.", price: 99 },
    { id: "gbp", name: "Google Business Profile", desc: "We set up or tidy your profile.", price: 49 },
    { id: "copy", name: "Copywriting", desc: "We write your text. Per page.", price: 49, perPage: true },
    { id: "ai", name: "AI-assisted copy", desc: "Drafted with AI, edited by us. Per page.", price: 19, perPage: true },
    { id: "translate", name: "Professional translation", desc: "Priced per word after we see your text.", quote: true },
  ]},
];
const CARE = [
  { id: "none", name: "No plan", price: 0, desc: "You host it yourself. We hand over everything." },
  { id: "basic", name: "Basic", price: 29, desc: "Hosting, updates, daily backups." },
  { id: "plus", name: "Plus", price: 49, desc: "Basic plus 1 hour of edits a month." },
  { id: "pro", name: "Pro", price: 99, desc: "Plus 3 hours of edits, priority support, monthly report." },
];
const ALL_ADDONS = ADDONS.flatMap(g => g.items);

/* ============ Packages + live demos ============ */
const pkState = { pk: "essential" };
function renderPkInfo() {
  const p = PACKAGES[pkState.pk], idx = PK_ORDER.indexOf(pkState.pk);
  const prev = idx > 0 ? PACKAGES[PK_ORDER[idx - 1]].name : null;
  $("#pkInfo").innerHTML = `
    <div class="pk__name">${p.name}</div>
    <div class="pk__price"><b>${eur(p.price)}</b><span>starting price, excl. VAT</span></div>
    <p class="pk__for">${p.for}</p>
    ${prev ? `<p class="kicker">Everything in ${prev}, plus:</p>` : ""}
    <ul class="pk__feat">${p.feats.map(f => `<li class="${prev ? "new" : ""}">${f}</li>`).join("")}</ul>
    <div class="pk__meta"><span>Live ${p.days} days after you approve the preview</span><span>Two revision rounds included</span><span>Pay nothing until you approve</span></div>
    <a href="#pricing" class="btn" data-pick="${pkState.pk}">Choose ${p.name}</a>`;
  $("#pkInfo [data-pick]").addEventListener("click", () => { calc.minPk = pkState.pk; if (calc.kind === "brand") setKind("website"); calc.step = 2; renderCalc(); });
}
function renderPkView() {
  const v = $("#pkView");
  v.innerHTML = HALDEN[pkState.pk]();
  v.scrollTop = 0;
  if (window.gsap && !REDUCED) gsap.fromTo(v.firstElementChild, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .6, ease: "expo.out" });
  $("#pkUrl").textContent = { essential: "halden-coffee.com", business: "halden-coffee.com/shop", signature: "halden-coffee.com/harvest-26" }[pkState.pk];
}
function renderCompare() {
  const rows = [
    ["Pages", "Up to 5", "Up to 10", "Up to 20"],
    ["Design", "Custom, from our system", "More custom layouts", "Fully bespoke"],
    ["Mobile and desktop", 1, 1, 1],
    ["Contact form", 1, "Advanced", "Advanced"],
    ["Animations", "Subtle", "Rich", "Advanced, scroll-driven"],
    ["Edit your own content", 0, 1, 1],
    ["Analytics", 0, 1, 1],
    ["Google Maps", 0, 1, 1],
    ["Blog", 0, 0, 1],
    ["SEO", "Basic", "Enhanced", "Advanced"],
    ["Custom functionality", 0, "Small extras", 1],
    ["Revision rounds", "2", "2", "3"],
    ["Live after approval", "7 days", "14 days", "21 days"],
  ];
  const cell = v => v === 1 ? `<span class="yes">Included</span>` : v === 0 ? `<span class="no">Add-on</span>` : v;
  const act = i => PK_ORDER[i] === pkState.pk ? "is-active" : "";
  $("#cmpTable").innerHTML = `<thead><tr><th></th>${PK_ORDER.map((k, i) => `<th class="${act(i)}">${PACKAGES[k].name}<small>from ${eur(PACKAGES[k].price)}</small></th>`).join("")}</tr></thead>
    <tbody>${rows.map(r => `<tr><th scope="row">${r[0]}</th>${r.slice(1).map((v, i) => `<td class="${act(i)}">${cell(v)}</td>`).join("")}</tr>`).join("")}</tbody>`;
}
(() => {
  const seg = $("#pkSeg");
  $$("button", seg).forEach(b => b.addEventListener("click", () => {
    $$("button", seg).forEach(x => x.setAttribute("aria-pressed", x === b));
    pkState.pk = b.dataset.pk; segPill(seg); renderPkInfo(); renderPkView(); renderCompare();
  }));
  deviceToggle($("#pkBrowser"));
  renderPkInfo(); renderPkView(); renderCompare();
  requestAnimationFrame(() => segPill(seg));
  document.fonts && document.fonts.ready.then(() => segPill(seg));
})();

/* ============ Design studio ============ */
const PALETTES = [
  { name: "Night bloom", c: { bg: "#F4F5F2", surface: "#FFFFFF", ink: "#18201F", muted: "#5C6866", btn: "#0E3B3A", btnText: "#F4F5F2", accent: "#F4B6C2", surface2: "#E3E8E4" } },
  { name: "Minimal mono", c: { bg: "#FAFAFA", surface: "#FFFFFF", ink: "#111111", muted: "#666666", btn: "#111111", btnText: "#FFFFFF", accent: "#BDBDBD", surface2: "#EBEBEB" } },
  { name: "Warm luxury", c: { bg: "#F6EFE7", surface: "#FFF9F2", ink: "#2A1E16", muted: "#7A6858", btn: "#6B3E26", btnText: "#FFF9F2", accent: "#C9A27A", surface2: "#E6D6C3" } },
  { name: "Modern tech", c: { bg: "#0B0F1A", surface: "#131A2B", ink: "#E8EDFF", muted: "#8B95B8", btn: "#6E7BFF", btnText: "#0B0F1A", accent: "#4FE3C1", surface2: "#1E2742" } },
  { name: "Soft pastel", c: { bg: "#FBF7FF", surface: "#FFFFFF", ink: "#2D2340", muted: "#6E6585", btn: "#7C5CC4", btnText: "#FFFFFF", accent: "#FFC7D9", surface2: "#EDE4FA" } },
  { name: "Nature", c: { bg: "#F2F4EC", surface: "#FFFFFF", ink: "#1F2A1C", muted: "#5F6B58", btn: "#3D6B35", btnText: "#FFFFFF", accent: "#D9B44A", surface2: "#DCE3CF" } },
  { name: "Elegant dark", c: { bg: "#121212", surface: "#1C1C1C", ink: "#F1EEE8", muted: "#A19C93", btn: "#E9DFCE", btnText: "#121212", accent: "#B89B6A", surface2: "#2A2A2A" } },
  { name: "Editorial beige", c: { bg: "#EFE9DF", surface: "#F7F3EC", ink: "#231F1A", muted: "#6D655A", btn: "#231F1A", btnText: "#EFE9DF", accent: "#B4532A", surface2: "#DDD3C3" } },
  { name: "Bold creative", c: { bg: "#FFF4E0", surface: "#FFFFFF", ink: "#1A1A2E", muted: "#5B5B73", btn: "#FF4F3A", btnText: "#FFFFFF", accent: "#2E5BFF", surface2: "#FFE0A8" } },
  { name: "Black and gold", c: { bg: "#0D0D0D", surface: "#171717", ink: "#F5F1E6", muted: "#A39E8F", btn: "#D4AF37", btnText: "#0D0D0D", accent: "#D4AF37", surface2: "#262626" } },
];
const SWATCHES = [["bg", "Background"], ["surface", "Cards"], ["ink", "Text"], ["muted", "Secondary text"], ["btn", "Buttons"], ["btnText", "Button text"], ["accent", "Accent"], ["surface2", "Image tint"]];
const FONTS = [
  { name: "Modern minimal", head: F.brico, body: F.geist, hw: 600, sample: "Aa" },
  { name: "Luxury editorial", head: F.corm, body: F.geist, hw: 600, sample: "Aa" },
  { name: "Elegant serif", head: F.play, body: F.geist, hw: 500, sample: "Aa" },
  { name: "Creative", head: F.syne, body: F.geist, hw: 800, sample: "Aa" },
  { name: "Corporate", head: F.space, body: F.geist, hw: 600, sample: "Aa" },
  { name: "Friendly", head: F.nunito, body: F.nunito, hw: 800, sample: "Aa" },
];
const CORNERS = [["Sharp", 0], ["Soft", 10], ["Round", 22]];
const MOTION = [["Minimal", 0, "Essential"], ["Subtle", 1, "Essential"], ["Rich", 2, "Business"], ["Immersive", 3, "Signature"]];
const STUDIO_SITES = ["bakery", "dental", "shop", "restaurant", "hotel", "personal", "plumber", "quill", "aurelia", "icecream"];
const STUDIO_LABEL = { bakery: "Bakery", dental: "Dental clinic", shop: "Online store", restaurant: "Restaurant", hotel: "Hotel", personal: "Coach", plumber: "Plumber", quill: "App", aurelia: "Jewellery", icecream: "Ice cream" };
const DEFAULT_DESIGN = { pal: 0, colors: { ...PALETTES[0].c }, font: 0, corner: 1, spacing: 1, motion: 1, industry: "bakery" };
// Shared design links: every setting lives in ?d=, so a link opens the exact same design.
const SW_KEYS = ["bg", "surface", "ink", "muted", "btn", "btnText", "accent", "surface2"];
function designToLink() {
  const o = { c: SW_KEYS.map(k => design.colors[k].slice(1)), p: design.pal, f: design.font, k: design.corner, s: design.spacing, m: design.motion, i: design.industry, n: me.name || undefined };
  const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  return location.origin + location.pathname + "?d=" + b64 + "#studio";
}
function designFromLink() {
  const raw = new URLSearchParams(location.search).get("d"); if (!raw) return null;
  try {
    const o = JSON.parse(decodeURIComponent(escape(atob(raw.replace(/-/g, "+").replace(/_/g, "/")))));
    const hex = v => /^[0-9a-f]{6}$/i.test(v) ? "#" + v.toUpperCase() : null;
    const colors = Object.fromEntries(SW_KEYS.map((k, i) => [k, hex(o.c[i])]));
    if (Object.values(colors).some(v => !v)) return null;
    const int = (v, max, d) => Number.isInteger(v) && v >= 0 && v <= max ? v : d;
    if (typeof o.n === "string" && o.n.trim() && !me.name) { me.name = o.n.trim().slice(0, 32); saveMe(); }
    return { pal: Number.isInteger(o.p) && o.p < PALETTES.length ? o.p : -1, colors, font: int(o.f, FONTS.length - 1, 0), corner: int(o.k, 2, 1), spacing: int(o.s, 2, 1), motion: int(o.m, 3, 1), industry: STUDIO_SITES.includes(o.i) ? o.i : "bakery" };
  } catch { return null; }
}
const sharedDesign = designFromLink();
let design = sharedDesign || store.get("design", null) || structuredClone(DEFAULT_DESIGN);
const hist = { past: [], future: [] };
function commit(mut) {
  hist.past.push(structuredClone(design)); if (hist.past.length > 60) hist.past.shift();
  hist.future = []; mut(design); renderStudio();
}
const siteById = id => SITES.find(s => s.id === id);

function studioOverride() {
  const f = FONTS[design.font];
  return Object.assign({}, design.colors, { head: f.head, body: f.body, hw: f.hw, hls: "-.02em", upper: false, radius: CORNERS[design.corner][1], pillButtons: design.corner === 2, shadow: design.corner > 0 });
}
// The design studio section is optional: everything below does nothing when it isn't on the page.
function renderStudioPreview() {
  if (!$("#stView")) return;
  const s = siteById(design.industry);
  const v = $("#stView"); const top = v.scrollTop;
  v.innerHTML = renderSite(s, { name: me.name, override: studioOverride(), spacing: design.spacing, motion: design.motion, anim: ["none", "none", "float pulse", "float rise pulse"][design.motion] });
  v.scrollTop = top;
  $("#stUrl").textContent = slug(me.name || s.name) + ".com";
}
function fixColor(fg, bg, target = 4.5) {
  // Move fg toward black or white until it reaches the target contrast.
  const towards = lum(bg) > .35 ? [0, 0, 0] : [255, 255, 255];
  const [r, g, b] = hexToRgb(fg);
  for (let t = 0; t <= 1.0001; t += .02) {
    const c = [r, g, b].map((v, i) => Math.round(v + (towards[i] - v) * t));
    const hex = "#" + c.map(v => v.toString(16).padStart(2, "0")).join("").toUpperCase();
    if (contrast(hex, bg) >= target) return hex;
  }
  return towards[0] ? "#FFFFFF" : "#000000";
}
function renderContrast() {
  const c = design.colors, box = $("#contrast");
  const checks = [
    { k: "ink", on: "bg", label: "Text on background", min: 4.5 },
    { k: "muted", on: "bg", label: "Secondary text on background", min: 4.5 },
    { k: "btnText", on: "btn", label: "Button text on button", min: 4.5 },
    { k: "ink", on: "surface", label: "Text on cards", min: 4.5 },
  ].map(x => ({ ...x, r: contrast(c[x.k], c[x.on]) }));
  const bad = checks.filter(x => x.r < x.min);
  box.hidden = false;
  box.classList.toggle("ok", !bad.length);
  box.innerHTML = bad.length
    ? `<strong>${bad.length === 1 ? "One combination is" : bad.length + " combinations are"} hard to read.</strong>
       <span>${bad[0].label} has a contrast of ${bad[0].r.toFixed(1)}:1. People need at least ${bad[0].min}:1 to read it comfortably (WCAG AA).</span>
       <div><button class="btn btn--sm btn--petal" type="button" id="fixContrast">Fix it for me</button></div>`
    : `<div class="contrast__rows">${checks.map(x => `<span>${x.label}: <b>${x.r.toFixed(1)}:1</b> · readable</span>`).join("")}</div>`;
  const fx = $("#fixContrast");
  if (fx) fx.addEventListener("click", () => {
    commit(d => bad.forEach(x => { d.colors[x.k] = fixColor(d.colors[x.k], d.colors[x.on]); }));
    toast("Colours adjusted so everything is readable.");
  });
}
function renderStudio() {
  if (!$("#palettes")) { store.set("design", design); return; }
  $$("#palettes .pal").forEach((b, i) => b.setAttribute("aria-pressed", i === design.pal));
  $("#palName").textContent = design.pal >= 0 ? PALETTES[design.pal].name : "Custom";
  SWATCHES.forEach(([k]) => { const v = design.colors[k].toUpperCase(); $(`#c_${k}`).value = v; $(`#h_${k}`).value = v; });
  $$("#fonts .font-opt").forEach((b, i) => b.setAttribute("aria-pressed", i === design.font));
  $$("#corners .chip").forEach((b, i) => b.setAttribute("aria-pressed", i === design.corner));
  $$("#motion .chip").forEach((b, i) => b.setAttribute("aria-pressed", i === design.motion));
  $$("#industries .chip").forEach(b => b.setAttribute("aria-pressed", b.dataset.id === design.industry));
  $("#spacing").value = design.spacing; $("#spaceVal").textContent = ["Compact", "Balanced", "Airy"][design.spacing];
  const m = MOTION[design.motion];
  $("#motionNote").textContent = m[1] >= 2 ? `${m[0]} motion comes with the ${m[2]} package, or as an add-on.` : `${m[0]} motion is included in every package.`;
  $("#undo").disabled = !hist.past.length; $("#redo").disabled = !hist.future.length;
  renderContrast(); renderStudioPreview();
  store.set("design", design);
}
(() => {
  if (!$("#studio")) return;
  $("#palettes").innerHTML = PALETTES.map((p, i) => `<button class="pal" type="button" aria-label="${p.name} palette" title="${p.name}">${["bg", "btn", "accent", "ink"].map(k => `<i style="background:${p.c[k]}"></i>`).join("")}</button>`).join("");
  $$("#palettes .pal").forEach((b, i) => b.addEventListener("click", () => commit(d => { d.pal = i; d.colors = { ...PALETTES[i].c }; })));
  $("#swatches").innerHTML = SWATCHES.map(([k, l]) => `<div class="sw"><input type="color" id="c_${k}" aria-label="${l} colour"><div style="min-width:0"><label for="h_${k}">${l}</label><input type="text" id="h_${k}" maxlength="7" spellcheck="false"></div></div>`).join("");
  SWATCHES.forEach(([k]) => {
    let pending;
    $(`#c_${k}`).addEventListener("input", e => {
      // live update without flooding history
      if (!pending) { hist.past.push(structuredClone(design)); hist.future = []; }
      clearTimeout(pending); pending = setTimeout(() => pending = null, 400);
      design.colors[k] = e.target.value.toUpperCase(); design.pal = -1; renderStudio();
    });
    $(`#h_${k}`).addEventListener("change", e => {
      let v = e.target.value.trim(); if (!v.startsWith("#")) v = "#" + v;
      if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)) { if (v.length === 4) v = "#" + v.slice(1).split("").map(c => c + c).join(""); commit(d => { d.colors[k] = v.toUpperCase(); d.pal = -1; }); }
      else { e.target.value = design.colors[k]; toast("Use a hex code like #0E3B3A."); }
    });
  });
  $("#randomPal").addEventListener("click", () => commit(d => {
    const h = Math.random() * 360, dark = Math.random() < .35;
    const hsl = (H, S, L) => { S /= 100; L /= 100; const k = n => (n + H / 30) % 12, a = S * Math.min(L, 1 - L); const f = n => L - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))); return "#" + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, "0")).join("").toUpperCase(); };
    const comp = (h + 150 + Math.random() * 60) % 360;
    d.colors = dark
      ? { bg: hsl(h, 25, 7), surface: hsl(h, 22, 12), ink: hsl(h, 20, 93), muted: hsl(h, 12, 66), btn: hsl(comp, 75, 64), btnText: hsl(h, 25, 7), accent: hsl(comp, 70, 70), surface2: hsl(h, 20, 18) }
      : { bg: hsl(h, 30, 96), surface: "#FFFFFF", ink: hsl(h, 30, 11), muted: hsl(h, 10, 38), btn: hsl(h, 55, 28), btnText: "#FFFFFF", accent: hsl(comp, 70, 72), surface2: hsl(h, 25, 86) };
    d.pal = -1;
  }));
  $("#fonts").innerHTML = FONTS.map(f => `<button class="font-opt" type="button"><b style="font-family:${f.head};font-weight:${f.hw}">${f.sample}g</b><span>${f.name}</span></button>`).join("");
  $$("#fonts .font-opt").forEach((b, i) => b.addEventListener("click", () => commit(d => d.font = i)));
  $("#corners").innerHTML = CORNERS.map(c => `<button class="chip" type="button">${c[0]}</button>`).join("");
  $$("#corners .chip").forEach((b, i) => b.addEventListener("click", () => commit(d => d.corner = i)));
  $("#motion").innerHTML = MOTION.map(m => `<button class="chip" type="button">${m[0]}</button>`).join("");
  $$("#motion .chip").forEach((b, i) => b.addEventListener("click", () => commit(d => d.motion = i)));
  $("#spacing").addEventListener("input", e => commit(d => d.spacing = +e.target.value));
  $("#industries").innerHTML = STUDIO_SITES.map(id => `<button class="chip" type="button" data-id="${id}">${STUDIO_LABEL[id]}</button>`).join("");
  $$("#industries .chip").forEach(b => b.addEventListener("click", () => commit(d => d.industry = b.dataset.id)));
  $("#undo").addEventListener("click", () => { if (!hist.past.length) return; hist.future.push(structuredClone(design)); design = hist.past.pop(); renderStudio(); });
  $("#redo").addEventListener("click", () => { if (!hist.future.length) return; hist.past.push(structuredClone(design)); design = hist.future.pop(); renderStudio(); });
  $("#resetDesign").addEventListener("click", () => commit(d => Object.assign(d, structuredClone(DEFAULT_DESIGN))));
  $("#saveDesign").addEventListener("click", () => { store.set("designSaved", true); toast("Design added to your menu."); renderSummary(); });
  $("#shareDesign").addEventListener("click", async () => {
    const url = designToLink();
    try { await navigator.clipboard.writeText(url); toast("Link copied. Anyone who opens it sees this exact design."); }
    catch { prompt("Copy this link:", url); }
  });
  $("#moodBoard").addEventListener("click", moodBoard);
  deviceToggle($("#stBrowser"));
  renderStudio();
  if (sharedDesign) {
    history.replaceState(null, "", location.pathname + "#studio");
    setTimeout(() => { lenis ? lenis.scrollTo("#studio", { offset: -60, immediate: true }) : $("#studio").scrollIntoView(); toast("This design was shared with you. Change anything you like."); }, 600);
  }
})();

/* Mood board: palette, type and saved concepts as one image to keep or send. */
async function moodBoard() {
  const W = 1600, H = 1000, cv = document.createElement("canvas"); cv.width = W; cv.height = H;
  const x = cv.getContext("2d"), c = design.colors, f = FONTS[design.font];
  const head = f.head, body = "Geist, system-ui, sans-serif";
  try { await Promise.all([document.fonts.load(`${f.hw} 120px ${head}`), document.fonts.load(`400 24px ${body}`), document.fonts.load(`600 24px ${body}`)]); } catch {}
  const r = [0, 14, 36][design.corner];
  const box = (X, Y, w, hh, fill, rr = r) => { x.fillStyle = fill; x.beginPath(); x.roundRect(X, Y, w, hh, rr); x.fill(); };
  x.fillStyle = c.bg; x.fillRect(0, 0, W, H);
  // Title
  const name = me.name || "Your business";
  x.fillStyle = c.ink; x.textBaseline = "alphabetic";
  let size = 132; x.font = `${f.hw} ${size}px ${head}`;
  while (x.measureText(name).width > W - 160 && size > 48) { size -= 4; x.font = `${f.hw} ${size}px ${head}`; }
  x.fillText(name, 80, 80 + size);
  x.font = `400 26px ${body}`; x.fillStyle = c.muted;
  x.fillText(`Mood board · ${design.pal >= 0 ? PALETTES[design.pal].name : "Custom palette"} · ${f.name} type`, 84, 130 + size);
  // Swatches
  const sy = 300, sw = (W - 160 - 7 * 16) / 8;
  SWATCHES.forEach(([k, label], i) => {
    const X = 80 + i * (sw + 16);
    box(X, sy, sw, 300, c[k]);
    x.globalAlpha = .35; x.strokeStyle = c.muted; x.lineWidth = 2; x.beginPath(); x.roundRect(X, sy, sw, 300, r); x.stroke(); x.globalAlpha = 1;
    x.fillStyle = c.ink; x.font = `600 20px ${body}`; x.fillText(label, X, sy + 340);
    x.fillStyle = c.muted; x.font = `400 20px ${body}`; x.fillText(c[k].toUpperCase(), X, sy + 368);
  });
  // Type and button sample
  const ty = 740;
  box(80, ty, 700, 180, c.surface);
  x.fillStyle = c.ink; x.font = `${f.hw} 92px ${head}`; x.fillText("Aa", 116, ty + 120);
  const tx = 116 + x.measureText("Aa").width + 36;
  x.font = `${f.hw} 30px ${head}`; x.fillText(f.name, tx, ty + 78);
  x.fillStyle = c.muted; x.font = `400 22px ${body}`;
  x.fillText(`${["Sharp", "Soft", "Round"][design.corner]} corners, ${["compact", "balanced", "airy"][design.spacing]} spacing`, tx, ty + 116);
  x.fillText(`${MOTION[design.motion][0]} motion`, tx, ty + 146);
  box(820, ty + 50, 280, 80, c.btn, design.corner === 2 ? 40 : r);
  x.fillStyle = c.btnText; x.font = `600 26px ${body}`; x.textAlign = "center"; x.fillText("Book now", 960, ty + 99); x.textAlign = "left";
  // Saved concepts
  const saved = [...favs].map(siteById).filter(Boolean).slice(0, 4).map(s => s.name);
  x.fillStyle = c.ink; x.font = `600 22px ${body}`; x.fillText(saved.length ? "Saved inspiration" : "Made in the SiteQuest studio", 1150, ty + 40);
  x.fillStyle = c.muted; x.font = `400 22px ${body}`;
  (saved.length ? saved : ["Change it any time in the studio,", "or send it to us with your brief."]).forEach((s, i) => x.fillText(s, 1150, ty + 78 + i * 32));
  x.fillStyle = c.muted; x.font = `400 18px ${body}`; x.fillText("sitequest.studio", 80, H - 30);
  cv.toBlob(b => {
    const a = document.createElement("a"); a.href = URL.createObjectURL(b);
    a.download = `${slug(me.name || "sitequest")}-mood-board.png`; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    toast("Mood board downloaded.");
  }, "image/png");
}

/* ============ Showroom ============ */
const favs = new Set(store.get("favs", []));
const esc = v => String(v).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
const myName = () => me.showName ? me.name : "";
(() => {
  const tg = $("#showMe"), inp = $("#showName");
  inp.value = me.name; tg.checked = me.showName && !!me.name;
  if (!me.name) me.showName = false;
  tg.addEventListener("change", () => {
    if (tg.checked && !me.name) { tg.checked = false; inp.focus(); toast("Type your business name first."); return; }
    me.showName = tg.checked; saveMe(); renderGrid();
  });
  let t;
  inp.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => {
    me.name = inp.value.trim().slice(0, 32);
    const was = me.showName; me.showName = !!me.name; tg.checked = me.showName; saveMe();
    hero.render(); onNameChange(); if (was !== me.showName) renderGrid();
  }, 250); });
})();
const show = { industry: "All", style: "All", cx: "All", pk: "All", all: false };
const INDUSTRY_GROUPS = ["All", ...GROUPS.filter(g => SITES.some(s => s.group === g))];
const STYLES = ["All", ...STYLE_IDS];
// Interleave by layout so the first screen shows as many different designs as possible.
// The strongest concepts open the showroom; the rest follow, interleaved by layout for variety.
const FEATURED = ["auto", "spa", "cyber", "shop", "gilded", "bnb", "pizza", "nimbus", "skincare", "kaleido", "bikes", "hotel"];
const ORDERED = (() => {
  const first = FEATURED.map(siteById).filter(Boolean);
  const byLayout = {}; SITES.filter(s => !FEATURED.includes(s.id)).forEach(s => (byLayout[s.layout] ||= []).push(s));
  const out = [...first], queues = Object.values(byLayout);
  while (out.length < SITES.length) queues.forEach(q => q.length && out.push(q.shift()));
  return out;
})();
$("#showTotal").textContent = SITES.length;
function chipRow(el, list, key) {
  el.insertAdjacentHTML("beforeend", list.map(v => `<button class="chip" type="button" data-v="${v}" aria-pressed="${show[key] === v}">${v}</button>`).join(""));
  el.addEventListener("click", e => {
    const b = e.target.closest(".chip"); if (!b) return;
    show[key] = b.dataset.v; $$(".chip", el).forEach(x => x.setAttribute("aria-pressed", x === b)); renderGrid(); syncClear();
  });
}
chipRow($("#fIndustry"), INDUSTRY_GROUPS, "industry");

/* Choice menus: a button that opens a popover of options. */
const picks = {};
function makePick(el, key, label, options, cls = "") {
  const close = () => { el.classList.remove("is-open"); const b = $(".pick__btn", el); if (b) b.setAttribute("aria-expanded", "false"); };
  const render = () => {
    const cur = options.find(o => o.v === show[key]) || options[0];
    el.innerHTML = `<button class="pick__btn${show[key] !== "All" ? " is-set" : ""}" type="button" aria-haspopup="listbox" aria-expanded="false"><small>${label}</small><span>${cur.v === "All" ? cur.all || cur.label : cur.label || cur.v}</span><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></button>
      <div class="pick__pop ${cls}" role="listbox" aria-label="${label}">${options.map(o => `<button class="pick__opt" type="button" role="option" data-v="${o.v}" aria-selected="${o.v === show[key]}">${o.tile || ""}<span><b>${o.label || o.v}</b>${o.sub ? `<small>${o.sub}</small>` : ""}</span></button>`).join("")}</div>`;
  };
  render();
  el.addEventListener("click", e => {
    const opt = e.target.closest(".pick__opt");
    if (opt) { show[key] = opt.dataset.v; close(); render(); renderGrid(); syncClear(); $(".pick__btn", el).focus(); return; }
    if (e.target.closest(".pick__btn")) {
      const open = !el.classList.contains("is-open");
      Object.values(picks).forEach(p => p.close());
      if (open) { el.classList.add("is-open"); $(".pick__btn", el).setAttribute("aria-expanded", "true"); const sel = $(".pick__opt[aria-selected=true]", el); if (sel) sel.focus({ preventScroll: true }); }
    }
  });
  el.addEventListener("keydown", e => {
    if (e.key === "Escape") { close(); $(".pick__btn", el).focus(); }
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "ArrowRight" || e.key === "ArrowLeft") {
      const os = $$(".pick__opt", el), i = os.indexOf(document.activeElement); if (i < 0) return; e.preventDefault();
      os[(i + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1) + os.length) % os.length].focus();
    }
  });
  picks[key] = { render, close };
}
document.addEventListener("click", e => { if (!e.target.closest(".pick")) Object.values(picks).forEach(p => p.close()); });
const countBy = (k, v) => SITES.filter(s => s[k] === v).length;
makePick($("#pStyle"), "style", "Style", [{ v: "All", label: "All styles", all: "All 20 styles", sub: `${SITES.length} concepts` }, ...DESIGN_STYLES.map(st => ({ v: st.id, tile: styleTile(st), sub: `${countBy("style", st.id)} concepts` }))], "pick__pop--styles");
makePick($("#pCx"), "cx", "Detail", [{ v: "All", label: "Any detail" }, { v: "Minimal", sub: "Calm and simple" }, { v: "Balanced", sub: "A bit of everything" }, { v: "Rich", sub: "Lots of motion and depth" }]);
makePick($("#pPk"), "pk", "Package", [{ v: "All", label: "Any package" }, { v: "Essential", sub: "from €499" }, { v: "Business", sub: "from €999" }, { v: "Signature", sub: "from €1,999" }, { v: "Saved", label: "My saved concepts", sub: "Tap the heart to save one" }]);
function syncClear() { $("#fClear").hidden = show.industry === "All" && show.style === "All" && show.cx === "All" && show.pk === "All"; }
$("#fClear").addEventListener("click", () => {
  show.industry = show.style = show.cx = show.pk = "All";
  $$("#fIndustry .chip").forEach(c => c.setAttribute("aria-pressed", c.dataset.v === "All"));
  Object.values(picks).forEach(p => p.render()); syncClear(); renderGrid();
});
function setStyleFilter(v) { show.style = v; picks.style.render(); syncClear(); renderGrid(); }

const thumbIO = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  const th = en.target; thumbIO.unobserve(th);
  const s = siteById(th.dataset.id);
  th.insertAdjacentHTML("beforeend", `<div class="mini">${renderSite(s, { motion: 1, thumb: true, name: myName() })}</div>`);
  sizeThumb(th);
}), { rootMargin: "300px" });
function sizeThumb(th) {
  const m = $(".mini", th); if (!m) return;
  const sc = th.clientWidth / 1280; m.style.transform = `scale(${sc})`;
  th.style.setProperty("--scroll-to", -Math.max(0, m.offsetHeight * sc - th.clientHeight) + "px");
}
const thumbRO = new ResizeObserver(es => es.forEach(e => sizeThumb(e.target)));

function renderGrid() {
  const list = ORDERED.filter(s =>
    (show.industry === "All" || s.group === show.industry) &&
    (show.style === "All" || s.style === show.style) &&
    (show.cx === "All" || s.cx === show.cx) &&
    (show.pk === "All" || (show.pk === "Saved" ? favs.has(s.id) : s.pk === show.pk)));
  const filtered = show.industry !== "All" || show.style !== "All" || show.cx !== "All" || show.pk !== "All";
  const visible = show.all || filtered ? list : list.slice(0, 12);
  $("#showMore").hidden = show.all || filtered || list.length <= 12;
  $("#showMore").textContent = `Show all ${list.length} concepts`;
  $("#showCount").textContent = `${list.length} concept${list.length === 1 ? "" : "s"}${filtered ? " match your filters" : ""}`;
  const g = $("#grid");
  if (!list.length) {
    g.innerHTML = show.pk === "Saved"
      ? `<div class="empty"><b>No saved concepts yet.</b><span>Tap the heart on any design to save it to your brief.</span></div>`
      : `<div class="empty"><b>No concept matches all of these filters.</b><button class="btn btn--sm btn--ghost" type="button" id="clearF">Clear filters</button></div>`;
    const cf = $("#clearF"); if (cf) cf.addEventListener("click", () => $("#fClear").click());
    return;
  }
  g.innerHTML = visible.map(s => `
    <article class="card">
      <button class="card__thumb" type="button" data-id="${s.id}" aria-label="Open ${s.name}, ${s.industry} concept"><span class="card__tag">Concept</span></button>
      <button class="card__fav" type="button" data-fav="${s.id}" aria-pressed="${favs.has(s.id)}" aria-label="Save ${s.name}"><svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg></button>
      <div class="card__meta"><div><h3>${esc(myName() || s.name)}</h3><p>${s.industry} · ${s.style} · ${s.cx} · ${ANIM_LABEL[s.anim] || "Still"}</p></div><span class="card__pk">${s.pk}</span></div>
    </article>`).join("");
  $$(".card__thumb", g).forEach(t => { thumbIO.observe(t); thumbRO.observe(t); });
  if (window.gsap && !REDUCED) gsap.from($$(".card", g), { opacity: 0, y: 20, duration: .6, stagger: .04, ease: "expo.out" });
}
$("#grid").addEventListener("click", e => {
  const f = e.target.closest("[data-fav]");
  if (f) {
    const id = f.dataset.fav; favs.has(id) ? favs.delete(id) : favs.add(id);
    f.setAttribute("aria-pressed", favs.has(id)); store.set("favs", [...favs]);
    toast(favs.has(id) ? "Saved to your menu." : "Removed from your menu."); renderSummary();
    if (show.pk === "Saved") renderGrid();
    return;
  }
  const t = e.target.closest(".card__thumb"); if (t) openModal(t.dataset.id, t);
});
$("#showMore").addEventListener("click", () => { show.all = true; renderGrid(); });
renderGrid();

/* Modal */
let modalSite, lastFocus, closeT;
function openModal(id, from) {
  clearTimeout(closeT);
  modalSite = siteById(id); lastFocus = from;
  $("#mTitle").textContent = myName() || modalSite.name;
  $("#mSub").textContent = `${modalSite.industry} · ${LAYOUT_LABEL[modalSite.layout]} layout · ${ANIM_LABEL[modalSite.anim] || "Still"} motion · ${modalSite.pk} package · fictional concept`;
  $("#mUrl").textContent = slug(myName() || modalSite.name) + ".com";
  $("#mView").innerHTML = renderSite(modalSite, { motion: 2, name: myName() });
  const m = $("#modal"); m.classList.add("is-open");
  requestAnimationFrame(() => { m.classList.add("is-in"); segPill($("#mDevice")); });
  document.body.style.overflow = "hidden"; lenis && lenis.stop();
  $(".modal__body").scrollTop = 0;
  setTimeout(() => $("#modal [data-close].btn").focus(), 50);
}
function closeModal() {
  const m = $("#modal"); m.classList.remove("is-in");
  closeT = setTimeout(() => { m.classList.remove("is-open"); $("#mView").innerHTML = ""; }, 400);
  document.body.style.overflow = ""; lenis && lenis.start(); lastFocus && lastFocus.focus();
}
$$("#modal [data-close]").forEach(b => b.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {
  if (!$("#modal").classList.contains("is-open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "Tab") {
    const f = $$('#modal button, #modal a, #modal input').filter(x => x.offsetParent);
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
    else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
  }
});
$$("#mDevice button").forEach(b => b.addEventListener("click", () => {
  $$("#mDevice button").forEach(x => x.setAttribute("aria-pressed", x === b));
  $("#mBrowser").classList.toggle("is-mobile", b.dataset.device === "mobile"); segPill($("#mDevice"));
}));
$("#mInspire").addEventListener("click", () => {
  // Liking a concept saves it as inspiration and sets its style in the site menu
  const s = modalSite;
  favs.add(s.id); store.set("favs", [...favs]); renderGrid();
  calc.style = s.style; renderCalc();
  closeModal();
  setTimeout(() => toast(`Saved. ${s.name} and the ${s.style} style are in your site menu.`), 300);
});

/* ============ Our work + founder (from portfolio.js) ============ */
(() => {
  const work = typeof PORTFOLIO !== "undefined" ? PORTFOLIO : [];
  const f = typeof FOUNDER !== "undefined" ? FOUNDER : {};
  const starRow = n => `<span class="case__stars" aria-hidden="true">${"★".repeat(n)}${"☆".repeat(5 - n)}</span>`;
  // Big alternating case studies: the work is the proof, so it gets the room
  $("#workGrid").innerHTML = work.map((p, i) => `
    <article class="case${i % 2 ? " case--flip" : ""}">
      <a class="case__img" ${p.url ? `href="${esc(p.url)}" target="_blank" rel="noopener"` : ""} aria-label="Visit ${esc(p.name)}">${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)} homepage" loading="lazy">` : ""}</a>
      <div class="case__body">
        <span class="case__kind">${esc(p.kind || "")}</span>
        <h3>${esc(p.name)}</h3>
        ${p.built ? `<p class="case__built">${esc(p.built)}</p>` : ""}
        ${p.result ? `<p class="case__result">${esc(p.result)}</p>` : ""}
        ${p.quote ? `<blockquote class="case__quote">${p.stars ? starRow(p.stars) : ""}<p>“${esc(p.quote)}”</p>${p.by ? `<cite>${esc(p.by)}</cite>` : ""}</blockquote>`
          : p.stars ? `<p class="case__rating">${starRow(p.stars)}<span>Rated ${p.stars} out of 5 by ${esc(p.by || p.name)}</span></p>` : ""}
        ${p.url ? `<a class="case__link" href="${esc(p.url)}" target="_blank" rel="noopener">Visit ${esc(p.url.replace(/^https?:\/\//, ""))} <span aria-hidden="true">↗</span></a>` : ""}
      </div>
    </article>`).join("");
  // Average rating, only from real ratings
  const rated = work.filter(p => p.stars);
  if (rated.length) {
    const avg = rated.reduce((a, p) => a + p.stars, 0) / rated.length;
    $("#workScore").innerHTML = `${starRow(Math.round(avg))}<b>${avg.toFixed(1)}</b><span>from ${rated.length} client${rated.length > 1 ? "s" : ""}</span>`;
  } else $("#workScore").hidden = true;
  // The founder block only appears once there is a real story to tell (fill FOUNDER in portfolio.js)
  if (!f.story) { $("#founder").hidden = true; return; }
  $("#founder").innerHTML = `
    ${f.photo ? `<div class="founder__photo"><img src="${esc(f.photo)}" alt="${esc(f.name)}"></div>` : ""}
    <div>
      <blockquote>${esc(f.story)}</blockquote>
      ${f.name ? `<cite>${esc(f.name)}, ${esc(f.role || "Founder")}</cite>` : ""}
    </div>`;
})();

/* Live proof: how fast this page loaded in the visitor's own browser */
addEventListener("load", () => setTimeout(() => {
  const n = performance.getEntriesByType("navigation")[0]; const el = $("#speed");
  if (!n || !el || !n.loadEventEnd) return;
  el.textContent = `This page loaded in ${(n.loadEventEnd / 1000).toFixed(1)} s on your device.`;
}, 0));

/* ============ Calculator ============ */
const calc = Object.assign({ kind: "website", style: null, step: 0, pk: "essential", minPk: "essential", pagesSel: ["Home", "About us", "Services", "Contact"], pages: 0, langs: 0, addons: [], care: "basic" }, store.get("calc", {}));
if (!PACKAGES[calc.pk]) calc.pk = "essential";
if (!Array.isArray(calc.pagesSel)) calc.pagesSel = ["Home", "About us", "Services", "Contact"];

/* What the client tells us in their own words */
const brief = Object.assign({ f: {} }, store.get("brief", {}));
brief.f = Object.assign({ wants: [], call: false, callTime: "Afternoon", bWhen: "As soon as possible" }, brief.f);
let menuFiles = store.get("files", []);
const saveBrief = () => store.set("brief", brief);
let filesWarned = false;
const saveFiles = () => {
  try { localStorage.setItem("webloom:files", JSON.stringify(menuFiles)); }
  catch {
    // Too big for browser storage: the files stay on this page, but a reload would lose them
    if (!filesWarned) { filesWarned = true; toast("Your files are added. Send your menu before closing this page, or they’ll need adding again."); }
  }
};

/* ============ Make your own site menu ============ */
const ICON = {
  website: `<svg viewBox="0 0 48 48"><rect x="5" y="9" width="38" height="30" rx="4"/><path d="M5 17h38"/><circle cx="10" cy="13" r="1"/><circle cx="14" cy="13" r="1"/><rect x="11" y="23" width="14" height="9" rx="1.5"/><path d="M29 24h8M29 29h6"/></svg>`,
  store: `<svg viewBox="0 0 48 48"><path d="M9 17h30l-2.5 22h-25z"/><path d="M17 17v-3a7 7 0 0 1 14 0v3"/><path d="M19 26a5 5 0 0 0 10 0"/></svg>`,
  app: `<svg viewBox="0 0 48 48"><rect x="14" y="5" width="20" height="38" rx="5"/><path d="M21 9h6"/><rect x="18" y="15" width="12" height="7" rx="1.5"/><path d="M18 27h12M18 32h8"/></svg>`,
  brand: `<svg viewBox="0 0 48 48"><path d="M24 6 34 24 24 42 14 24z"/><path d="M24 6v15"/><circle cx="24" cy="24" r="3"/></svg>`,
};
const KINDS = [
  { id: "website", name: "A website", d: "Show who you are and get more customers.", from: 499 },
  { id: "store", name: "An online shop", d: "Sell your products online.", from: 798 },
  { id: "app", name: "An app or portal", d: "Bookings, logins or your own tool.", from: 1198 },
  { id: "brand", name: "Just a logo", d: "A logo and brand colours, no website.", from: 99 },
];
const PAGE_OPTS = [
  ["Home", "Your front page"], ["About us", "Your story and team"], ["Services", "What you offer"], ["Prices", "What things cost"],
  ["Products", "Things you sell"], ["Our work", "Photos of your work"], ["Reviews", "What customers say"], ["Team", "Who works here"],
  ["Book online", "Customers book a time"], ["Blog / news", "Updates and articles"], ["Questions", "Answers to common questions"],
  ["Vacancies", "Jobs at your business"], ["Contact", "Address, map and form"],
];
const SIZES = { essential: "Small", business: "Medium", signature: "Large" };
/* Line icons for the site menu (24px grid, stroke) */
const ICO = {
  home: "M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z",
  users: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21v-1a6 6 0 0 1 12 0v1M16 3.5a4 4 0 0 1 0 7.5M22 21v-1a6 6 0 0 0-4-5.6",
  spark: "M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z",
  tag: "M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9zM7.5 7.5h.01",
  bag: "M5 8h14l-1 13H6zM9 8V6a3 3 0 0 1 6 0v2",
  image: "M4 5h16v14H4zM4 16l5-5 4 4 2-2 5 5M15 9.5h.01",
  star: "M12 3l2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z",
  calendar: "M4 6h16v15H4zM4 10h16M8 3v4M16 3v4",
  doc: "M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5",
  help: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9a2.5 2.5 0 0 1 4.9.6c0 1.7-2.4 2.1-2.4 3.9M12 17h.01",
  brief: "M4 8h16v12H4zM9 8V5h6v3M4 13h16",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  pen: "M12 19l7-7 3 3-7 7zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18zM2 2l7.6 7.6M11 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  palette: "M12 21a9 9 0 1 1 9-9c0 2.5-2 3-3.5 3H15a2 2 0 0 0-1.5 3.3A1.6 1.6 0 0 1 12 21zM7.5 10.5h.01M10.5 7h.01M15 7.5h.01",
  card: "M3 6h18v12H3zM7 10h5M7 14h8",
  phone: "M8 2h8v20H8zM11 18h2",
  chat: "M4 5h16v11H9l-5 4zM8 10h8",
  inbox: "M3 13l3-8h12l3 8v6H3zM3 13h5l1 2h6l1-2h5",
  map: "M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14",
  pin: "M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  lock: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4",
  box: "M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10",
  filter: "M3 5h18l-7 8v6l-4 2v-8z",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z",
  store: "M4 9l1-5h14l1 5M4 9v11h16V9M4 9h16M9 20v-6h6v6",
  wand: "M15 4V2M15 10V8M11 6h2M17 6h2M4 20l11-11 2 2L6 22z",
};
const ico = k => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICO[k] || ICO.spark}"/></svg>`;
const PAGE_ICON = { Home: "home", "About us": "users", Services: "spark", Prices: "tag", Products: "bag", "Our work": "image", Reviews: "star", Team: "users", "Book online": "calendar", "Blog / news": "doc", Questions: "help", Vacancies: "brief", Contact: "mail" };
const ADDON_ICON = { logo: "pen", mini: "palette", brand: "palette", cards: "card", social: "phone", booking: "calendar", form: "inbox", maps: "map", whatsapp: "chat", newsletter: "mail", blog: "doc", login: "lock", store: "store", catalog: "box", filter: "filter", coupons: "tag", analytics: "chart", seo: "search", local: "pin", gbp: "store", copy: "pen", ai: "wand", translate: "globe" };
const POPULAR = ["logo", "booking", "whatsapp", "newsletter", "blog", "copy", "local", "gbp"];

const BUILD_STEPS = ["What", "Look", "Pages", "Extras", "You", "Your menu"];
const isBrand = () => calc.kind === "brand";
const BRAND_IDS = ADDONS.find(g => g.group === "Branding").items.map(a => a.id);
const PK_RANK = { essential: 0, business: 1, signature: 2 };

// The package follows the number of pages, so nobody has to understand packages.
function autoPk() {
  const n = calc.pagesSel.length;
  let pk = n <= 5 ? "essential" : n <= 10 ? "business" : "signature";
  if (calc.kind === "app" && PK_RANK[pk] < 1) pk = "business";
  if (PK_RANK[calc.minPk] > PK_RANK[pk]) pk = calc.minPk;
  calc.pk = pk;
  calc.pages = Math.max(0, n - PACKAGES[pk].pages);
}
function setKind(k) {
  const auto = { store: ["store"], app: ["login"] };
  const set = new Set(calc.addons);
  Object.values(auto).flat().forEach(id => set.delete(id));
  (auto[k] || []).forEach(id => set.add(id));
  if (k === "brand" && !BRAND_IDS.some(id => set.has(id))) set.add("logo");
  if (k === "store" && !calc.pagesSel.includes("Products")) calc.pagesSel.splice(1, 0, "Products");
  calc.kind = k; calc.addons = [...set];
}
function toggleAddon(id) {
  const set = new Set(calc.addons), on = !set.has(id);
  on ? set.add(id) : set.delete(id);
  // never charge twice: a logo is part of every brand identity, and the two writing options exclude each other
  if (on && (id === "mini" || id === "brand")) { set.delete("logo"); set.delete(id === "mini" ? "brand" : "mini"); }
  if (on && id === "logo" && (set.has("mini") || set.has("brand"))) { set.delete("logo"); toast("A logo is already part of the brand identity you picked."); }
  if (on && id === "copy") set.delete("ai");
  if (on && id === "ai") set.delete("copy");
  if (on && id === "booking" && !calc.pagesSel.includes("Book online")) calc.pagesSel.push("Book online");
  calc.addons = [...set];
}
function calcTotals() {
  if (!isBrand()) autoPk();
  const p = PACKAGES[calc.pk];
  const pagesTotal = calc.pagesSel.length;
  const lines = isBrand() ? [] : [{ l: `${SIZES[calc.pk]} website (${p.name}), ${pagesTotal} pages`, v: p.price }];
  if (!isBrand() && calc.pages) lines.push({ l: `${calc.pages} extra page${calc.pages > 1 ? "s" : ""}`, v: calc.pages * 49 });
  if (!isBrand() && calc.langs) lines.push({ l: `${calc.langs} extra language${calc.langs > 1 ? "s" : ""}`, v: calc.langs * 5 });
  let quote = false;
  calc.addons.forEach(id => {
    const a = ALL_ADDONS.find(x => x.id === id); if (!a) return;
    if (isBrand() && !BRAND_IDS.includes(id)) return;
    if (!isBrand() && a.inc && a.inc.includes(calc.pk)) { lines.push({ l: a.name, inc: true }); return; }
    if (a.quote) { quote = true; lines.push({ l: a.name, q: true }); return; }
    // per-page extras are charged for the pages the client picked, never for empty package room
    const n = Math.min(pagesTotal, 10);
    const v = a.perPage ? a.price * n : a.price;
    lines.push({ l: a.name + (a.perPage ? ` (${n} pages)` : "") + (a.from ? ", from" : ""), v });
  });
  const one = lines.reduce((s, x) => s + (x.v || 0), 0);
  const care = isBrand() ? CARE[0] : CARE.find(c => c.id === calc.care);
  const days = isBrand() ? 7 : p.days + (calc.addons.includes("store") ? 7 : 0) + (calc.addons.includes("login") ? 7 : 0);
  return { lines, one, care, quote, pagesTotal, days };
}

/* --- Step screens --- */
const field = (id, label, opts = {}) => `<div class="field${opts.wide ? " field--wide" : ""}"><label for="${id}">${label}${opts.req ? "" : ` <small>(optional)</small>`}</label>${opts.area ? `<textarea id="${id}" data-f="${id}" placeholder="${opts.ph || ""}">${esc(brief.f[id] || "")}</textarea>` : `<input id="${id}" data-f="${id}" type="${opts.type || "text"}" ${opts.auto ? `autocomplete="${opts.auto}"` : ""} placeholder="${opts.ph || ""}" value="${esc(brief.f[id] || "")}" ${opts.req ? "required" : ""}>`}${opts.req ? `<span class="err" hidden>${opts.err}</span>` : ""}</div>`;
function stepHTML(i) {
  const t = calcTotals(), f = brief.f;
  if (i === 0) return `<h3>What do you need?</h3><p class="bs-sub">Pick the closest one. You can change it later.</p>
    <div class="bk-grid">${KINDS.map(k => `<button class="bk" type="button" data-kind="${k.id}" aria-pressed="${calc.kind === k.id}">${ICON[k.id]}<b>${k.name}</b><span>${k.d}</span><em>from ${eur(k.from)}</em></button>`).join("")}</div>`;
  if (i === 1) {
    const st = DESIGN_STYLES.find(s => s.id === calc.style);
    const n = st ? SITES.filter(s => s.style === st.id).length : 0;
    return `<h3>Which look do you like?</h3><p class="bs-sub">Tap the one that feels most like you. This doesn’t change the price.</p>
    <div class="bs-grid"><button class="bs bs--none" type="button" data-style="" aria-pressed="${!calc.style}"><span class="stile stile--none"><b>?</b></span><b>Not sure yet</b></button>${DESIGN_STYLES.map(s => `<button class="bs" type="button" data-style="${s.id}" aria-pressed="${calc.style === s.id}">${styleTile(s)}<b>${s.id}</b></button>`).join("")}</div>
    <p class="bs-pick">${st ? `<b>${st.id}.</b> ${st.d} <a href="#showroom" data-see="${st.id}">See ${n} example${n === 1 ? "" : "s"}</a>` : "No problem. We’ll suggest a look that suits your business."}</p>`;
  }
  if (i === 2) {
    if (isBrand()) return `<h3>Which pages?</h3><div class="bz-empty"><p>You picked just a logo, so there are no pages. Want a website too?</p><button class="btn btn--ghost" type="button" data-kind="website">Yes, add a website</button></div>`;
    const p = PACKAGES[calc.pk];
    return `<h3>Pick your pages.</h3><p class="bs-sub">Tap to add or remove. Most businesses start with four to six.</p>
    <div class="pg-grid">${PAGE_OPTS.map(([n, d]) => `<button class="pg" type="button" data-page="${n}" aria-pressed="${calc.pagesSel.includes(n)}" ${n === "Home" ? "disabled" : ""} title="${n === "Home" ? "Always included" : d}">${ico(PAGE_ICON[n])}<b>${n}</b></button>`).join("")}</div>
    <div class="pg-fit"><span class="pg-fit__n">${t.pagesTotal}</span><span><b>${t.pagesTotal === 1 ? "page" : "pages"} = our ${SIZES[calc.pk].toLowerCase()} website, ${eur(p.price)}</b><small>Live about ${p.days} days after you approve your free preview.</small></span></div>
    <div class="pg-opts">
      <label class="tog"><input type="checkbox" data-special ${calc.minPk === "signature" ? "checked" : ""}><i aria-hidden="true"></i><span><b>Make it extra special</b><small>Our most detailed design and rich animation</small></span></label>
      <div class="tog tog--step"><span><b>Other languages</b><small>${eur(5)} each, you supply the text</small></span><div class="stepper"><button type="button" data-step="langs" data-d="-1" aria-label="Fewer languages">−</button><output>${calc.langs}</output><button type="button" data-step="langs" data-d="1" aria-label="More languages">+</button></div></div>
    </div>`;
  }
  if (i === 3) {
    // Popular extras first, as big icon tiles; everything else folds away so the step stays short.
    const pop = isBrand() ? BRAND_IDS : [...POPULAR, ...(calc.kind === "store" || calc.addons.includes("store") ? ["catalog", "coupons", "filter"] : []), ...(calc.kind === "app" ? ["login"] : [])];
    const rest = isBrand() ? [] : ALL_ADDONS.map(a => a.id).filter(id => !pop.includes(id) && id !== "store" && !(id === "login" && calc.kind === "app") && (!["catalog", "coupons", "filter"].includes(id) || calc.kind === "store"));
    const tile = id => {
      const a = ALL_ADDONS.find(x => x.id === id), inc = !isBrand() && a.inc && a.inc.includes(calc.pk), on = inc || calc.addons.includes(id);
      return `<button class="xt${inc ? " is-inc" : ""}" type="button" data-addon="${id}" aria-pressed="${on}" ${inc ? "disabled" : ""} title="${a.desc}">${ico(ADDON_ICON[id] || "spark")}<b>${a.name}</b><em>${inc ? "Included" : a.quote ? "Quote" : (a.from ? "from " : "") + eur(a.price) + (a.perPage ? "/page" : "")}</em><span class="xt__tick" aria-hidden="true"></span></button>`;
    };
    const restOn = rest.filter(id => calc.addons.includes(id)).length;
    const openMore = xtOpen || restOn > 0;
    return `<h3>${isBrand() ? "Build your logo package." : "Add some extras."}</h3><p class="bs-sub">${isBrand() ? "Tap what you need." : "All optional. Tap to add, tap again to remove."}</p>
    <div class="xt-grid">${pop.map(tile).join("")}</div>
    ${rest.length ? `<details class="xt-more"${openMore ? " open" : ""}><summary>More extras${restOn ? ` · ${restOn} added` : ""}</summary><div class="xt-grid xt-grid--sm">${rest.map(tile).join("")}</div></details>` : ""}
    ${isBrand() ? "" : `<div class="care2"><span><b>Who looks after your site?</b><small>Hosting, updates and backups. First month free, cancel any time.</small></span>
      <div class="care2__seg" role="radiogroup" aria-label="Care plan">${CARE.map(c => `<button type="button" role="radio" data-care="${c.id}" aria-checked="${calc.care === c.id}" aria-pressed="${calc.care === c.id}" title="${c.desc}"><b>${c.id === "none" ? "Myself" : c.name}</b><small>${c.price ? eur(c.price) + "/mo" : "€0"}</small></button>`).join("")}</div></div>`}`;
  }
  if (i === 4) return `<h3>Last step: who are you?</h3><p class="bs-sub">Only the first three are needed. The rest helps us nail your free preview.</p>
    <div class="wish">
      <div class="field-row field-row--3">${field("bName", "Business name", { req: true, auto: "organization", err: "What’s your business called?" })}${field("bPerson", "Your name", { req: true, auto: "name", err: "What’s your name?" })}${field("bEmail", "Email", { req: true, type: "email", auto: "email", err: "Add an email like name@business.com." })}</div>
      <div class="field"><span class="lbl">When would you like it live?</span><div class="chips">${["As soon as possible", "Within a month", "In 1–3 months", "No rush"].map(x => `<button class="chip" type="button" data-when="${x}" aria-pressed="${f.bWhen === x}">${x}</button>`).join("")}</div></div>
      <div class="wish__opt"><span class="wish__label">Make it yours <small>(optional)</small></span>
        <div class="wish__grid">
          <div class="wish__col">
            <div class="field"><span class="lbl">Must-haves on your site</span>
              <div class="wants">${(f.wants || []).map((w, j) => `<span class="want">${esc(w)}<button type="button" data-unwant="${j}" aria-label="Remove ${esc(w)}">×</button></span>`).join("")}</div>
              <div class="wants__add"><input id="wantIn" placeholder="A photo gallery of our cakes" aria-label="Something you really want"><button class="btn btn--sm btn--ghost" type="button" data-want>Add</button></div></div>
            ${field("bNotes", "Comments or ideas", { area: true, ph: "Colours you love, sites you like, things to avoid." })}
          </div>
          <div class="wish__col">
            <div class="field"><span class="lbl">Logo, photos or examples</span>
              <label class="drop" for="fileIn"><input id="fileIn" type="file" multiple accept="image/*,.pdf"><b>Drop files or tap to choose</b><small>Images or PDF, up to 10</small></label>
              <div class="files">${menuFiles.map((x, j) => `<figure class="file">${x.data ? `<img src="${x.data}" alt="">` : `<span class="file__doc">PDF</span>`}<figcaption>${esc(x.name)}</figcaption><button type="button" data-unfile="${j}" aria-label="Remove ${esc(x.name)}">×</button></figure>`).join("")}</div></div>
            ${field("bSite", "Your current website", { type: "url", ph: "https://", auto: "url" })}
          </div>
        </div>
        <label class="tog"><input type="checkbox" data-call ${f.call ? "checked" : ""}><i aria-hidden="true"></i><span><b>I’d like a short call</b><small>Only if you prefer to talk. Everything else happens online.</small></span></label>
        ${f.call ? `<div class="call">${field("bPhone", "Phone number", { type: "tel", req: true, auto: "tel", err: "Add a number so we can call you." })}<div class="field"><span class="lbl">Best time</span><div class="chips">${["Morning", "Afternoon", "Evening"].map(x => `<button class="chip" type="button" data-calltime="${x}" aria-pressed="${f.callTime === x}">${x}</button>`).join("")}</div></div></div>` : ""}
      </div>
    </div>`;
  // Step 6: the menu card they send to us
  const st = DESIGN_STYLES.find(s => s.id === calc.style), h1 = Math.ceil(t.one / 2);
  const extras = t.lines.slice(isBrand() ? 0 : 1);
  const sec = (title, step, body) => `<div class="mc__sec"><div class="mc__h"><h4>${title}</h4><button type="button" data-goto-step="${step}">Change</button></div>${body}</div>`;
  return `<div class="mc">
    <div class="mc__top"><span>Your site menu</span><h3>${esc(f.bName || "Your business")}</h3><small>${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</small></div>
    ${sec("You need", 0, `<p>${KINDS.find(k => k.id === calc.kind).name}${st ? `, in a <b>${st.id}</b> style` : ""}.</p>`)}
    ${isBrand() ? "" : sec("Pages", 2, `<p>${calc.pagesSel.join(" · ")}</p>`)}
    ${sec("Extras", 3, extras.length ? `<ul>${extras.map(x => `<li><span>${x.l}</span><span>${x.inc ? "Included" : x.q ? "Quote" : eur(x.v)}</span></li>`).join("")}</ul>` : "<p>None</p>")}
    ${favs.size ? sec("Examples you liked", 1, `<p>${[...favs].map(siteById).filter(Boolean).map(s => esc(s.name)).join(" · ")}</p>`) : ""}
    ${sec("Your wishes", 4, `${(f.wants || []).length ? `<ul class="mc__wants">${f.wants.map(w => `<li>${esc(w)}</li>`).join("")}</ul>` : ""}${f.bNotes ? `<p class="mc__note">“${esc(f.bNotes)}”</p>` : ""}${f.bSite ? `<p>Current site: ${esc(f.bSite)}</p>` : ""}${menuFiles.length ? `<div class="files files--sm">${menuFiles.map(x => `<figure class="file">${x.data ? `<img src="${x.data}" alt="">` : `<span class="file__doc">PDF</span>`}<figcaption>${esc(x.name)}</figcaption></figure>`).join("")}</div>` : ""}${!(f.wants || []).length && !f.bNotes && !f.bSite && !menuFiles.length ? "<p>Nothing added yet</p>" : ""}${f.call ? `<p class="mc__call">Would like a call · ${esc(f.callTime || "")}${f.bPhone ? ` · ${esc(f.bPhone)}` : ""}</p>` : ""}`)}
    <div class="mc__total"><span>One-time price</span><b class="est__total" data-to="${t.one}">${eur(0)}</b><small>excl. VAT (${eur(t.one * 1.21)} incl.)${t.care.price ? ` · plus ${eur(t.care.price)}/mo` : ""}</small></div>
    <div class="est__split"><div><small>Today</small><b>€0</b><span>Free preview</span></div><div><small>After you approve</small><b>${eur(h1)}</b><span>Half to start</span></div><div><small>At launch</small><b>${eur(t.one - h1)}</b><span>About ${t.days} days later</span></div></div>
    <div class="mc__send">
      <button class="btn btn--petal mc__go" type="button" data-brief-action="send">Get my free quote</button>
      <button class="btn btn--ghost" type="button" data-brief-action="print">Save as PDF</button>
      <button class="btn btn--ghost" type="button" data-brief-action="copy">Copy</button>
    </div>
    <p class="est__fine">Your menu downloads and an email to us opens: attach the files and press send. We reply within two working days, and you pay nothing until you love your preview.</p>
    <p class="mc__help">Questions first? Email <a href="mailto:hello@sitequest.studio">hello@sitequest.studio</a>.</p>
  </div>`;
}

let lastLines = [], xtOpen = false;
function renderTicket() {
  const t = calcTotals();
  const isNew = x => !lastLines.includes(x.l);
  $("#tKind").textContent = KINDS.find(k => k.id === calc.kind).name + (calc.style ? ` · ${calc.style}` : "");
  $("#rLines").innerHTML = (t.lines.length ? t.lines : [{ l: "Pick what you need", empty: true }]).map(x => `<div class="ticket__line${isNew(x) && lastLines.length ? " is-new" : ""}${x.empty ? " is-empty" : ""}"><span>${x.l}</span>${x.inc ? `<span class="inc">Included</span>` : x.q ? `<span class="inc">Quote</span>` : x.empty ? "" : `<span>${eur(x.v)}</span>`}</div>`).join("");
  lastLines = t.lines.map(x => x.l);
  countTo($("#rTotal"), t.one);
  $("#rMonthly").textContent = t.care.price ? `${eur(t.care.price)}/mo` : "€0";
  const el = $("#ticket"); el.classList.remove("is-bump"); void el.offsetWidth; el.classList.add("is-bump");
}
function countTo(el, to, dur = .7) {
  if (!window.gsap || REDUCED) { el.textContent = eur(to); el.dataset.v = to; return; }
  const o = { v: +el.dataset.v || 0 }; el.dataset.v = to;
  gsap.to(o, { v: to, duration: dur, ease: "expo.out", onUpdate: () => el.textContent = eur(o.v) });
}
function renderRail() {
  $("#bRail").innerHTML = BUILD_STEPS.map((s, i) => `<li><button type="button" data-goto-step="${i}" class="${i === calc.step ? "is-on" : i < calc.step ? "is-done" : ""}" ${i === calc.step ? 'aria-current="step"' : ""}><i>${i < calc.step ? "✓" : i + 1}</i><span>${s}</span></button></li>`).join("");
  $("#bRail").style.setProperty("--p", calc.step / (BUILD_STEPS.length - 1));
}
function renderStage(animate) {
  const stage = $("#bStage"), act = document.activeElement;
  // Keep keyboard focus on the same control after re-rendering
  const KEYS = ["data-kind", "data-style", "data-page", "data-addon", "data-care", "data-calltime", "data-when"];
  const fk = act && stage.contains(act) ? (act.dataset.step ? `[data-step="${act.dataset.step}"][data-d="${act.dataset.d}"]` : act.id ? `#${act.id}` : (k => k ? `[${k}="${CSS.escape(act.getAttribute(k))}"]` : null)(KEYS.find(k => act.hasAttribute(k)))) : null;
  stage.innerHTML = `<div class="bstep">${stepHTML(calc.step)}</div>`;
  const last = calc.step === BUILD_STEPS.length - 1;
  $("#bBack2").style.visibility = calc.step ? "visible" : "hidden";
  $("#bNext2").hidden = last; $("#tNext").hidden = last;
  $("#bNext2").textContent = $("#tNext").textContent = calc.step === 4 ? "See my menu" : calc.step === 0 ? "Start" : "Next";
  if (fk) { const el = $(fk, stage); if (el) el.focus({ preventScroll: true }); }
  if (last) {
    const tot = $(".est__total", stage);
    if (animate) { countTo(tot, +tot.dataset.to, 1.6); petals($(".mc", stage)); } else { tot.textContent = eur(+tot.dataset.to); }
  }
  if (animate && window.gsap && !REDUCED) gsap.from($$(".bstep > *, .bk, .bs, .pg, .bx, .bc, .mc__sec", stage).slice(0, 40), { opacity: 0, y: 14, duration: .55, stagger: .018, ease: "expo.out" });
}
function validWishes(show) {
  const req = ["bName", "bPerson", "bEmail", ...(brief.f.call ? ["bPhone"] : [])];
  const ok = id => { const v = (brief.f[id] || "").trim(); return id === "bEmail" ? /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) : !!v; };
  const bad = req.filter(id => !ok(id));
  if (show) {
    req.forEach(id => { const el = $("#" + id); if (!el) return; el.setAttribute("aria-invalid", bad.includes(id)); const e = el.parentElement.querySelector(".err"); if (e) e.hidden = !bad.includes(id); });
    if (bad.length) $("#" + bad[0])?.focus();
  }
  return !bad.length;
}
function goBuild(i, scroll) {
  i = Math.max(0, Math.min(BUILD_STEPS.length - 1, i));
  if (i > 4 && !validWishes(false)) { if (calc.step !== 4) { calc.step = 4; renderRail(); renderStage(true); } validWishes(true); toast("Fill in your business name, name and email first."); return; }
  calc.step = i;
  renderRail(); renderStage(true); store.set("calc", calc);
  if (scroll) { const top = $("#bRail").getBoundingClientRect().top; if (top < 0 || top > innerHeight * .5) lenis ? lenis.scrollTo("#bRail", { offset: -90 }) : $("#bRail").scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" }); }
}
function petals(host) {
  if (REDUCED || !host) return;
  const colors = ["#F4B6C2", "#F2C14E", "#0E3B3A", "#FBE3E8"];
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("i"); p.className = "petal";
    const a = Math.random() * Math.PI * 2, d = 120 + Math.random() * 220;
    p.style.cssText = `--x:${Math.cos(a) * d}px;--y:${Math.sin(a) * d - 60}px;--r:${Math.random() * 540 - 270}deg;background:${colors[i % 4]};animation-delay:${Math.random() * .15}s`;
    host.appendChild(p); setTimeout(() => p.parentNode && p.parentNode.removeChild(p), 1600);
  }
}
function renderCalc() {
  renderTicket(); renderRail(); renderStage(false);
  store.set("calc", calc);
}
// Kept for older callers (studio, showroom): the menu card is always up to date.
function renderSummary() {}

/* Files: images are shrunk in the browser so they fit in the menu; PDFs keep their name only. */
function addFiles(list) {
  [...list].slice(0, 10 - menuFiles.length).forEach(file => {
    if (!file.type.startsWith("image/")) { menuFiles.push({ name: file.name, type: file.type, size: file.size }); saveFiles(); renderStage(false); return; }
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const s = Math.min(1, 900 / Math.max(img.width, img.height)), c = document.createElement("canvas");
      c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      menuFiles.push({ name: file.name, type: file.type, size: file.size, data: c.toDataURL(file.type === "image/png" ? "image/png" : "image/jpeg", .82) });
      URL.revokeObjectURL(url); saveFiles(); renderStage(false);
    };
    img.src = url;
  });
  if (list.length + menuFiles.length > 10) toast("Up to 10 files. Send more after we reply.");
}

(() => {
  const stage = $("#bStage");
  stage.addEventListener("click", e => {
    const b = e.target.closest("button, a"); if (!b) return;
    if (b.dataset.kind) { setKind(b.dataset.kind); renderCalc(); if (calc.step === 0) setTimeout(() => goBuild(1, true), 260); return; }
    if (b.dataset.style !== undefined) { calc.style = b.dataset.style || null; renderCalc(); return; }
    if (b.dataset.see) { e.preventDefault(); setStyleFilter(b.dataset.see); lenis ? lenis.scrollTo("#showroom", { offset: -60 }) : $("#showroom").scrollIntoView(); return; }
    if (b.dataset.page) { const s = new Set(calc.pagesSel); s.has(b.dataset.page) ? s.delete(b.dataset.page) : s.add(b.dataset.page); calc.pagesSel = PAGE_OPTS.map(p => p[0]).filter(n => s.has(n)); renderCalc(); return; }
    if (b.dataset.step) { const k = b.dataset.step; calc[k] = Math.max(0, Math.min(7, calc[k] + +b.dataset.d)); renderCalc(); return; }
    if (b.dataset.addon) { toggleAddon(b.dataset.addon); renderCalc(); return; }
    if (b.dataset.care) { calc.care = b.dataset.care; renderCalc(); return; }
    if (b.dataset.want !== undefined) { const v = $("#wantIn").value.trim(); if (v) { brief.f.wants.push(v.slice(0, 120)); saveBrief(); renderStage(false); $("#wantIn").focus(); } return; }
    if (b.dataset.unwant) { brief.f.wants.splice(+b.dataset.unwant, 1); saveBrief(); renderStage(false); return; }
    if (b.dataset.unfile) { menuFiles.splice(+b.dataset.unfile, 1); saveFiles(); renderStage(false); return; }
    if (b.dataset.when) { brief.f.bWhen = b.dataset.when; saveBrief(); renderStage(false); return; }
    if (b.dataset.calltime) { brief.f.callTime = b.dataset.calltime; saveBrief(); renderStage(false); return; }
    if (b.dataset.gotoStep) { goBuild(+b.dataset.gotoStep, true); }
  });
  stage.addEventListener("input", e => { const k = e.target.dataset.f; if (k) { brief.f[k] = e.target.value; saveBrief(); if (e.target.getAttribute("aria-invalid") === "true") validWishes(true); if (k === "bName") { me.name = e.target.value.trim(); saveMe(); hero.syncInput(); } } });
  stage.addEventListener("change", e => {
    if (e.target.id === "fileIn") { addFiles(e.target.files); return; }
    if (e.target.dataset.special !== undefined) { calc.minPk = e.target.checked ? "signature" : "essential"; renderCalc(); return; }
    if (e.target.dataset.call !== undefined) { brief.f.call = e.target.checked; saveBrief(); renderStage(false); if (brief.f.call) $("#bPhone")?.focus(); }
  });
  stage.addEventListener("toggle", e => { if (e.target.classList && e.target.classList.contains("xt-more")) xtOpen = e.target.open; }, true);
  stage.addEventListener("keydown", e => { if (e.key === "Enter" && e.target.id === "wantIn") { e.preventDefault(); stage.querySelector("[data-want]").click(); } });
  stage.addEventListener("dragover", e => { const d = e.target.closest(".drop"); if (d) { e.preventDefault(); d.classList.add("is-over"); } });
  stage.addEventListener("dragleave", e => { const d = e.target.closest(".drop"); if (d) d.classList.remove("is-over"); });
  stage.addEventListener("drop", e => { const d = e.target.closest(".drop"); if (d) { e.preventDefault(); d.classList.remove("is-over"); addFiles(e.dataTransfer.files); } });
  $("#bRail").addEventListener("click", e => { const b = e.target.closest("[data-goto-step]"); if (b) goBuild(+b.dataset.gotoStep); });
  const next = () => { if (calc.step === 4 && !validWishes(true)) return; goBuild(calc.step + 1, true); };
  $("#bNext2").addEventListener("click", next); $("#tNext").addEventListener("click", next);
  $("#bBack2").addEventListener("click", () => goBuild(calc.step - 1, true));
  // On phones the ticket becomes a slim bar at the bottom while this section is on screen.
  new IntersectionObserver(([en]) => $("#ticket").classList.toggle("is-docked", en.isIntersecting), { rootMargin: "-30% 0px -30% 0px" }).observe($("#pricing"));
  if (calc.step === 5 && !validWishes(false)) calc.step = 4;
  renderTicket(); renderRail(); renderStage(false);
  briefReady = true;
})();

/* What we know, in one object (used by the project brief document) */
function briefPayload() {
  const t = calcTotals(), f = brief.f;
  const goal = calc.kind === "store" ? "Sell online" : calc.kind === "app" ? "Run part of the business online" : calc.kind === "brand" ? "Look professional" : calc.pagesSel.includes("Book online") || calc.addons.includes("booking") ? "Take bookings" : "Get more customers";
  return {
    business: { name: f.bName, website: f.bSite, description: f.bDesc },
    goals: { goal, type: KINDS.find(k => k.id === calc.kind).name, pages: calc.pagesSel },
    wishes: { wants: f.wants || [], notes: f.bNotes || "", files: menuFiles.map(x => x.name) },
    call: f.call ? { phone: f.bPhone || "", time: f.callTime } : null,
    brand: { logo: calc.addons.some(id => ["logo", "mini", "brand"].includes(id)) ? "Needs a logo" : menuFiles.length ? "Sent files (may include a logo)" : "Not mentioned", content: calc.addons.includes("copy") ? "SiteQuest Studio writes it" : calc.addons.includes("ai") ? "AI-assisted, edited by SiteQuest Studio" : "Client supplies the text" },
    design: { palette: design.pal >= 0 ? PALETTES[design.pal].name : "Custom", colors: design.colors, fonts: FONTS[design.font].name, corners: CORNERS[design.corner][0], spacing: ["Compact", "Balanced", "Airy"][design.spacing], motion: MOTION[design.motion][0], inspiration: [...favs].map(id => siteById(id)?.name).filter(Boolean) },
    estimate: { kind: KINDS.find(k => k.id === calc.kind).name, style: calc.style || "Not chosen", package: isBrand() ? "Logo only" : PACKAGES[calc.pk].name, extraLanguages: calc.langs, addons: calc.addons, oneTimeExVat: t.one, carePlan: t.care.name, monthlyExVat: t.care.price },
    timing: { launch: f.bWhen || "As soon as possible" },
    contact: { name: f.bPerson, email: f.bEmail, phone: f.bPhone || "" },
    created: new Date().toISOString(),
  };
}

/* ============ FAQ ============ */
(() => {
  const Q = [
    ["Do I really pay nothing upfront?", "Yes. We design your homepage first and show it to you on a private link. You only pay once you approve it: half to start building, half when your site goes live. If you don’t like it, you owe nothing."],
    ["What happens if I don’t like the preview?", "Tell us what’s off and we’ll take another pass. If it still isn’t right, you walk away. No invoice, no hard feelings. We keep the design files."],
    ["Who owns my website?", "You do. Your domain, your content and the finished site are yours once it’s paid. If you ever leave, we hand everything over."],
    ["Are there monthly costs?", "Only if you choose a care plan, which covers hosting, updates and backups. You can also host it yourself. Your domain name renews yearly with your registrar, usually around €10–15."],
    ["How long does it take?", "Essential sites go live about 7 days after you approve the preview, Business about 14, Signature about 21. It depends on how quickly we get your text and photos."],
    ["Do I need technical knowledge?", "No. We handle the technical side. With Business and Signature you can edit your own text and photos in a simple editor."],
    ["Can I add pages or languages later?", "Yes. Extra pages are €49 each, extra languages €5 each to set up. Translation is quoted separately, or you supply your own text."],
    ["Can I move my site to another provider?", "Yes, any time. We give you the files and help you move. No lock-in."],
    ["How do I reach you?", "Email hello@sitequest.studio. A real person replies within two working days. Prefer to talk? Tick “I’d like a short call” in your site menu and we’ll ring you."],
  ];
  $("#faqList").innerHTML = Q.map(q => `<details><summary>${q[0]}<i aria-hidden="true"></i></summary><p>${q[1]}</p></details>`).join("");
})();
