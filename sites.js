/* =========================================================
   SiteQuest Studio mini-site engine
   Renders realistic, fictional example websites from data.
   Every mini site is a container-query layout, so it adapts
   to desktop and mobile previews on its own.
   ========================================================= */

const NOISE = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* Abstract art direction in place of stock photos */
function art(kind, a, b, c) {
  const k = {
    sun: `radial-gradient(circle at 68% 58%, ${a} 0 21%, transparent 21.4%), linear-gradient(to top, ${b} 0 34%, ${c} 34% 100%)`,
    arch: `radial-gradient(ellipse 26% 42% at 50% 100%, ${a} 0 99%, transparent 100%), radial-gradient(ellipse 40% 64% at 50% 100%, ${b} 0 99%, transparent 100%), ${c}`,
    rings: `repeating-radial-gradient(circle at 24% 110%, ${a} 0 20px, ${b} 20px 40px)`,
    stripes: `repeating-linear-gradient(118deg, ${a} 0 26px, ${b} 26px 52px)`,
    mesh: `radial-gradient(at 18% 28%, ${a} 0, transparent 52%), radial-gradient(at 82% 18%, ${b} 0, transparent 50%), radial-gradient(at 62% 92%, ${a} 0, transparent 48%), ${c}`,
    cone: `conic-gradient(from 210deg at 38% 62%, ${a}, ${b}, ${c}, ${a})`,
    pill: `radial-gradient(ellipse 18% 34% at 50% 50%, ${a} 0 99%, transparent 100%), radial-gradient(circle at 50% 50%, ${b} 0 38%, transparent 38.4%), ${c}`,
    blinds: `linear-gradient(to bottom, ${a} 0 18%, ${b} 18% 36%, ${a} 36% 54%, ${b} 54% 72%, ${a} 72% 90%, ${c} 90%)`,
    horizon: `linear-gradient(to bottom, ${c} 0 55%, ${a} 55% 57%, ${b} 57%)`,
    dots: `radial-gradient(circle at center, ${a} 0 3px, transparent 3.5px) 0 0 / 22px 22px, ${b}`,
    split: `linear-gradient(90deg, ${a} 0 50%, ${b} 50% 100%)`,
    grid: `linear-gradient(${a} 1px, transparent 1px) 0 0 / 28px 28px, linear-gradient(90deg, ${a} 1px, transparent 1px) 0 0 / 28px 28px, ${b}`,
  };
  return k[kind] || k.mesh;
}
const ARTS = ["sun", "arch", "rings", "stripes", "mesh", "cone", "pill", "blinds", "horizon", "dots", "split", "grid"];

/* ---------------- Mini-site stylesheet ---------------- */
(function injectMiniCSS() {
  const css = `
  .ms{--gap:clamp(48px,7cqi,96px);container-type:inline-size;background:var(--bg);color:var(--ink);font-family:var(--body);font-size:16px;line-height:1.55;min-height:100%;-webkit-font-smoothing:antialiased}
  .ms *{box-sizing:border-box}
  .ms.sp-0{--gap:clamp(32px,4cqi,56px)} .ms.sp-2{--gap:clamp(72px,10cqi,140px)}
  .ms h1,.ms h2,.ms h3{font-family:var(--head);font-weight:var(--hw,600);letter-spacing:var(--hls,-.02em);line-height:1.02;margin:0}
  .ms p{margin:0}
  .ms a{color:inherit;text-decoration:none}
  .m-in{width:min(100% - 48px,1160px);margin-inline:auto}
  .m-nav{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 0}
  .m-logo{font-family:var(--head);font-weight:700;font-size:20px;letter-spacing:-.02em;display:flex;align-items:center;gap:8px}
  .m-logo i{width:18px;height:18px;border-radius:var(--r);background:var(--accent);display:block}
  .m-links{display:flex;gap:26px;font-size:14px;color:var(--muted)}
  .m-links a{cursor:pointer}.m-links a:hover{color:var(--ink)}
  .ms .m-btn{display:inline-flex;align-items:center;gap:8px;background:var(--btn);color:var(--btnText);padding:13px 22px;border-radius:var(--rb);font-size:14px;font-weight:600;border:0;cursor:pointer;transition:transform .3s,filter .3s;font-family:var(--body)}
  .ms .m-btn:hover{transform:translateY(-2px);filter:brightness(1.08)}
  .ms .m-btn.o{background:transparent;color:var(--ink);box-shadow:inset 0 0 0 1.5px var(--line)}
  .m-burger{display:none;width:34px;height:34px;border-radius:var(--r);border:1px solid var(--line);background:none;flex-direction:column;justify-content:center;align-items:center;gap:4px}
  .m-burger i{width:14px;height:1.5px;background:var(--ink);display:block}
  .m-art{position:relative;overflow:hidden;border-radius:var(--r2);background-size:cover}
  .m-art::after{content:"";position:absolute;inset:0;background-image:${NOISE};opacity:.35;mix-blend-mode:overlay;pointer-events:none}
  .m-art.is-photo::after{opacity:.12}
  .m-sec{padding-block:var(--gap)}
  .m-kick{font-size:13px;color:var(--muted);margin-bottom:14px;display:block}
  .m-h1{font-size:clamp(38px,6cqi,96px)}
  .m-h2{font-size:clamp(28px,4.2cqi,56px)}
  .m-lead{font-size:clamp(16px,1.5cqi,19px);color:var(--muted);max-width:44ch;margin-top:20px}
  .m-acts{display:flex;flex-wrap:wrap;gap:10px;margin-top:30px}
  .m-card{background:var(--surface);border-radius:var(--r2);padding:26px;box-shadow:var(--sh);border:1px solid var(--line2)}
  .m-card h3{font-size:20px;margin-bottom:8px}
  .m-card p{color:var(--muted);font-size:14.5px}
  .m-foot{border-top:1px solid var(--line);padding:36px 0 44px;display:flex;justify-content:space-between;gap:20px;flex-wrap:wrap;font-size:13px;color:var(--muted)}
  .m-form{display:grid;gap:10px;max-width:420px}
  .m-form input{width:100%;padding:13px 14px;border-radius:var(--r);border:1px solid var(--line);background:var(--surface);color:var(--ink);font:inherit;font-size:14px}
  .m-badge{display:inline-block;font-size:12px;padding:5px 11px;border-radius:99px;background:var(--surface);border:1px solid var(--line2)}
  /* split */
  .l-split .m-hero{display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center;padding-block:clamp(32px,5cqi,72px) var(--gap)}
  .l-split .m-hero .m-art{aspect-ratio:4/4.4}
  .m-three{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:40px}
  .m-band{background:var(--btn);color:var(--btnText);border-radius:var(--r2);padding:clamp(32px,5cqi,64px);display:flex;justify-content:space-between;align-items:center;gap:24px;flex-wrap:wrap}
  .ms .m-band .m-btn{background:var(--btnText);color:var(--btn)}
  .m-strip{display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap;color:var(--muted);font-family:var(--head);font-size:20px;opacity:.75;padding-block:8px 0}
  /* editorial */
  .l-editorial .m-nav{display:grid;grid-template-columns:1fr auto 1fr}
  .l-editorial .m-nav .m-links:last-child{justify-content:flex-end}
  .l-editorial .m-mast{text-align:center;padding-block:clamp(24px,4cqi,56px) 32px}
  .l-editorial .m-mast h1{font-size:clamp(56px,13cqi,190px);line-height:.88;letter-spacing:-.04em}
  .l-editorial .m-wide{aspect-ratio:21/8}
  .m-cols{display:grid;grid-template-columns:1fr 1.3fr;gap:48px}
  .m-rows{display:grid;border-top:1px solid var(--line)}
  .m-rows>div{display:grid;grid-template-columns:60px 1fr auto;gap:20px;align-items:baseline;padding:22px 0;border-bottom:1px solid var(--line);transition:padding .4s}
  .m-rows>div:hover{padding-left:12px}
  .m-rows b{font-family:var(--head);font-size:clamp(20px,2.4cqi,30px);font-weight:var(--hw,600)}
  .m-rows span{color:var(--muted);font-size:14px}
  /* shop */
  .l-shop .m-banner{position:relative;min-height:clamp(360px,44cqi,560px);display:flex;align-items:flex-end;padding:clamp(24px,4cqi,56px);color:#fff;border-radius:var(--r2)}
  .l-shop .m-banner .m-art{position:absolute;inset:0;border-radius:inherit}
  .l-shop .m-banner>div:last-child{position:relative;max-width:560px}
  .l-shop .m-banner .m-lead{color:rgba(255,255,255,.85)}
  .m-prods{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  .m-prod .m-art{aspect-ratio:3/4;margin-bottom:12px;transition:transform .5s}
  .m-prod:hover .m-art{transform:scale(.98)}
  .m-prod b{font-weight:500;font-size:14.5px;display:block}
  .m-prod span{font-size:13.5px;color:var(--muted)}
  .m-cart{position:relative}.m-cart::after{content:attr(data-n);position:absolute;top:-6px;right:-10px;width:16px;height:16px;border-radius:50%;background:var(--accent);color:var(--btnText);font-size:10px;display:grid;place-items:center}
  /* immersive */
  .l-immersive .m-imm{position:relative;min-height:clamp(480px,62cqi,760px);display:flex;flex-direction:column;color:#fff}
  .l-immersive .m-imm .m-art{position:absolute;inset:0;border-radius:0}
  .l-immersive .m-imm .m-art::before{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.55),transparent 60%);z-index:1}
  .l-immersive .m-imm>*:not(.m-art){position:relative;z-index:2}
  .l-immersive .m-imm .m-nav .m-links{color:rgba(255,255,255,.8)}
  .l-immersive .m-imm .m-burger{border-color:rgba(255,255,255,.4)} .l-immersive .m-imm .m-burger i{background:#fff}
  .l-immersive .m-imm-t{margin-top:auto;padding-bottom:clamp(28px,5cqi,64px)}
  .l-immersive .m-imm h1{font-size:clamp(48px,10cqi,150px);line-height:.9;max-width:12ch}
  .m-marq{overflow:hidden;border-bottom:1px solid var(--line);padding:18px 0}
  .m-marq div{display:flex;gap:40px;width:max-content;animation:mmarq 26s linear infinite;font-family:var(--head);font-size:26px}
  .mo-0 .m-marq div{animation:none}
  @keyframes mmarq{to{transform:translateX(-50%)}}
  .m-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
  .m-stats b{font-family:var(--head);font-size:clamp(36px,5cqi,64px);display:block;line-height:1}
  .m-stats span{color:var(--muted);font-size:14px}
  /* menu */
  .l-menu .m-mhero{text-align:center;padding-block:clamp(24px,4cqi,56px) var(--gap);display:grid;justify-items:center}
  .l-menu .m-mhero .m-art{width:clamp(180px,26cqi,320px);aspect-ratio:1;border-radius:50%;margin-bottom:32px}
  .l-menu .m-mhero .m-lead{margin-inline:auto}
  .m-menu{display:grid;grid-template-columns:1fr 1fr;gap:8px 56px}
  .m-menu>div{display:flex;align-items:baseline;gap:10px;padding:14px 0;border-bottom:1px dashed var(--line)}
  .m-menu b{font-weight:600;font-family:var(--head);font-size:19px}
  .m-menu i{flex:1}
  .m-menu small{display:block;color:var(--muted);font-size:13px}
  .m-menu em{font-style:normal;font-variant-numeric:tabular-nums}
  /* stack */
  .l-stack .m-big{padding-block:clamp(24px,4cqi,56px) var(--gap)}
  .l-stack .m-big h1{font-size:clamp(52px,11.5cqi,170px);line-height:.86;letter-spacing:-.045em;text-transform:var(--case,none)}
  .l-stack .m-big h1 span{display:block}
  .l-stack .m-big h1 span:nth-child(2){color:var(--accent);padding-left:8%}
  /* bento */
  .m-bento{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:180px;gap:14px}
  .m-bento>div{border-radius:var(--r2);padding:22px;display:flex;flex-direction:column;justify-content:flex-end;position:relative;overflow:hidden;background:var(--surface);border:1px solid var(--line2)}
  .m-bento>div.w2{grid-column:span 2}.m-bento>div.h2{grid-row:span 2}
  .m-bento>div .m-art{position:absolute;inset:0;border-radius:0}
  .m-bento>div>b{position:relative;font-family:var(--head);font-size:20px}
  .m-bento>div>span{position:relative;font-size:13.5px;color:var(--muted)}
  .m-bento>div.art b,.m-bento>div.art span{color:#fff}
  .m-bento>div.art::before{content:"";position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.45),transparent 70%);z-index:1}
  .m-bento>div.art>*:not(.m-art){z-index:2}
  /* gallery */
  .m-gal{columns:3;column-gap:14px}
  .m-gal .m-art{margin-bottom:14px;break-inside:avoid}
  /* motion */
  @keyframes mfloat{to{background-position:30px 20px;filter:saturate(1.15)}}
  @keyframes mrise{from{opacity:0;transform:translateY(40px)}}
  /* mobile */
  @container (max-width: 640px){
    .m-in{width:calc(100% - 32px)}
    .m-links{display:none}.m-burger{display:flex}
    .m-nav .m-btn{display:none}
    .l-split .m-hero,.m-cols{grid-template-columns:1fr;gap:28px}
    .m-three,.m-stats{grid-template-columns:1fr}
    .m-prods{grid-template-columns:1fr 1fr}
    .m-menu{grid-template-columns:1fr}
    .m-bento{grid-template-columns:1fr 1fr;grid-auto-rows:140px}
    .m-bento>div.w2{grid-column:span 2}
    .m-gal{columns:2}
    .l-editorial .m-nav{grid-template-columns:1fr auto}
    .l-editorial .m-nav .m-links:first-child{display:none}
    .l-editorial .m-wide{aspect-ratio:4/3}
    .m-rows>div{grid-template-columns:36px 1fr}
    .m-rows>div span:last-child{grid-column:2}
    .m-strip{font-size:16px}
  }
  `;
  const s = document.createElement("style");
  s.textContent = css;
  document.head.appendChild(s);
})();

/* ---------------- Helpers ---------------- */
function hexToRgb(h) { h = h.replace("#", ""); if (h.length === 3) h = h.split("").map(c => c + c).join(""); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function lum(h) { const [r, g, b] = hexToRgb(h).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return .2126 * r + .7152 * g + .0722 * b; }
function contrast(a, b) { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05); }
function alpha(h, a) { const [r, g, b] = hexToRgb(h); return `rgba(${r},${g},${b},${a})`; }

function msVars(c) {
  const r = c.radius ?? 10;
  return [
    `--bg:${c.bg}`, `--surface:${c.surface}`, `--ink:${c.ink}`, `--muted:${c.muted}`,
    `--btn:${c.btn}`, `--btnText:${c.btnText}`, `--accent:${c.accent}`,
    `--line:${alpha(c.ink, .16)}`, `--line2:${alpha(c.ink, .07)}`,
    `--head:${c.head}`, `--body:${c.body}`, `--hw:${c.hw || 600}`, `--hls:${c.hls || "-.02em"}`,
    `--r:${Math.max(0, r * .6)}px`, `--r2:${r}px`, `--rb:${c.pillButtons ? 99 : r * .7}px`,
    `--sh:${c.shadow ? "0 20px 40px -24px " + alpha(c.ink, .35) : "none"}`,
    `--case:${c.upper ? "uppercase" : "none"}`,
  ].join(";");
}

const nav = (s, cta) => `
  <nav class="m-nav ${s.navClass || ""}">
    <a class="m-logo" data-goto="top"><i></i>${s.name}</a>
    <div class="m-links">${(s.nav || ["About", "Services", "Contact"]).map((n, i) => `<a data-goto="s${i + 1}">${n}</a>`).join("")}</div>
    <a class="m-btn" data-demo>${cta || s.cta || "Get in touch"}</a>
    <button class="m-burger" data-demo aria-label="Menu"><i></i><i></i><i></i></button>
  </nav>`;
const foot = s => `<div class="m-in m-foot"><span>© 2026 ${s.name}</span><span>${s.city || "Amsterdam"} · Instagram · LinkedIn</span></div>`;
// Real photography when the concept has it; the gradient art stays as the fallback (apps, tech, finance).
const photoBg = (s, i) => {
  const p = typeof PHOTOS !== "undefined" && PHOTOS[s.id]; if (!p) return "";
  return `url(${photoUrl(p[i % p.length], s._w || 1400)}) center/cover no-repeat, ${s.c.surface2 || s.c.surface}`;
};
const A = (s, i, extra = "") => `<div class="m-art${photoBg(s, i) ? " is-photo" : ""}" style="background:${photoBg(s, i) || art(s.arts[i % s.arts.length], s.c.accent, s.c.btn, s.c.surface2 || s.c.surface)};${extra}"></div>`;
const A2 = (s, i, extra = "") => `<div class="m-art${photoBg(s, i + 1) ? " is-photo" : ""}" style="background:${photoBg(s, i + 1) || art(s.arts[i % s.arts.length], s.c.btn, s.c.accent, s.c.bg)};${extra}"></div>`;

/* ---------------- Layouts ---------------- */
const LAYOUTS = {
  split: s => `
    <div class="m-in" id="top">${nav(s)}
      <section class="m-hero">
        <div><span class="m-kick">${s.kicker}</span><h1 class="m-h1">${s.headline}</h1><p class="m-lead">${s.sub}</p>
          <div class="m-acts"><a class="m-btn" data-demo>${s.cta}</a><a class="m-btn o" data-goto="s1">Learn more</a></div></div>
        ${A(s, 0)}
      </section>
      <div class="m-strip">${(s.strip || ["Trusted locally", "Since 2014", "4.9 on Google", "Free parking"]).map(t => `<span>${t}</span>`).join("")}</div>
    </div>
    <section class="m-sec" id="s1"><div class="m-in"><h2 class="m-h2">${s.h2 || "What we do"}</h2>
      <div class="m-three">${s.items.slice(0, 3).map(it => `<div class="m-card"><h3>${it[0]}</h3><p>${it[1]}</p></div>`).join("")}</div></div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in m-cols">${A2(s, 1, "aspect-ratio:5/4")}<div style="align-self:center"><h2 class="m-h2">${s.about || "Small team, big care."}</h2><p class="m-lead">${s.aboutText || s.sub}</p></div></div></section>
    <section class="m-sec" id="s3" style="padding-top:0"><div class="m-in"><div class="m-band"><h2 class="m-h2" style="max-width:16ch">${s.band || "Ready when you are."}</h2><a class="m-btn" data-demo>${s.cta}</a></div></div></section>
    ${foot(s)}`,

  editorial: s => `
    <div class="m-in" id="top">
      <nav class="m-nav"><div class="m-links"><a data-goto="s1">${(s.nav || [])[0] || "Journal"}</a><a data-goto="s2">${(s.nav || [])[1] || "About"}</a></div>
        <a class="m-logo" data-goto="top">${s.name}</a>
        <div class="m-links"><a data-goto="s3">${(s.nav || [])[2] || "Contact"}</a><a data-demo>${s.cta}</a></div>
        <button class="m-burger" data-demo aria-label="Menu"><i></i><i></i><i></i></button></nav>
      <header class="m-mast"><span class="m-kick">${s.kicker}</span><h1>${s.headline}</h1></header>
      ${A(s, 0, "")}
    </div>
    <section class="m-sec" id="s1"><div class="m-in m-cols"><h2 class="m-h2">${s.h2 || "A slower kind of good."}</h2><div><p class="m-lead" style="margin-top:0">${s.sub}</p><div class="m-acts"><a class="m-btn" data-demo>${s.cta}</a></div></div></div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in m-rows">${s.items.map((it, i) => `<div><span>${String(i + 1).padStart(2, "0")}</span><b>${it[0]}</b><span>${it[1]}</span></div>`).join("")}</div></section>
    <section class="m-sec" id="s3" style="padding-top:0"><div class="m-in m-cols">${A2(s, 1, "aspect-ratio:4/3")}${A(s, 2, "aspect-ratio:4/3")}</div></section>
    ${foot(s)}`,

  shop: s => `
    <div class="m-in" id="top">
      <nav class="m-nav"><a class="m-logo" data-goto="top"><i></i>${s.name}</a>
        <div class="m-links">${(s.nav || ["New in", "Shop", "About"]).map((n, i) => `<a data-goto="s${i + 1}">${n}</a>`).join("")}</div>
        <div class="m-links" style="display:flex"><a data-demo>Search</a><a class="m-cart" data-n="2" data-demo>Bag</a></div></nav>
      <section class="m-banner">${A(s, 0)}<div><span class="m-kick" style="color:rgba(255,255,255,.8)">${s.kicker}</span><h1 class="m-h1">${s.headline}</h1><p class="m-lead">${s.sub}</p><div class="m-acts"><a class="m-btn" data-demo>${s.cta}</a></div></div></section>
    </div>
    <section class="m-sec" id="s1"><div class="m-in"><div style="display:flex;justify-content:space-between;align-items:end;margin-bottom:24px;gap:16px;flex-wrap:wrap"><h2 class="m-h2">${s.h2 || "New in"}</h2><div style="display:flex;gap:6px;flex-wrap:wrap"><span class="m-badge">All</span><span class="m-badge">Bestsellers</span><span class="m-badge">Sale</span></div></div>
      <div class="m-prods">${s.items.concat(s.items).slice(0, 8).map((it, i) => `<div class="m-prod" data-demo>${(i % 2 ? A2 : A)(s, i + 1)}<b>${it[0]}</b><span>${it[2] || "€" + (29 + i * 12)}</span></div>`).join("")}</div></div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in"><div class="m-band"><div><h2 class="m-h2">${s.band || "Free shipping over €75"}</h2><p style="margin-top:10px;opacity:.8">Join the list for early access.</p></div><a class="m-btn" data-demo>Sign up</a></div></div></section>
    ${foot(s)}`,

  immersive: s => `
    <section class="m-imm" id="top">${A(s, 0)}
      <div class="m-in">${nav(s)}</div>
      <div class="m-in m-imm-t"><span class="m-kick" style="color:rgba(255,255,255,.8)">${s.kicker}</span><h1 class="m-h1">${s.headline}</h1><div class="m-acts"><a class="m-btn" data-demo>${s.cta}</a></div></div>
    </section>
    <div class="m-marq"><div>${Array(2).fill(s.items.map(i => `<span>${i[0]}</span><span style="color:var(--accent)">✦</span>`).join("")).join("")}</div></div>
    <section class="m-sec" id="s1"><div class="m-in m-cols"><h2 class="m-h2">${s.h2 || "Built for the ones who notice."}</h2><p class="m-lead" style="margin-top:0">${s.sub}</p></div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in m-stats">${(s.stats || [["12", "Years"], ["3", "Locations"], ["24/7", "Support"]]).map(x => `<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join("")}</div></section>
    <section class="m-sec" id="s3" style="padding-top:0"><div class="m-in m-three">${s.items.slice(0, 3).map((it, i) => `<div>${(i % 2 ? A2 : A)(s, i + 1, "aspect-ratio:4/5;margin-bottom:14px")}<h3 style="font-size:20px">${it[0]}</h3><p style="color:var(--muted);font-size:14px;margin-top:6px">${it[1]}</p></div>`).join("")}</div></section>
    ${foot(s)}`,

  menu: s => `
    <div class="m-in" id="top">${nav(s, "Book a table")}
      <header class="m-mhero">${A(s, 0)}<span class="m-kick">${s.kicker}</span><h1 class="m-h1" style="max-width:14ch">${s.headline}</h1><p class="m-lead">${s.sub}</p><div class="m-acts" style="justify-content:center"><a class="m-btn" data-demo>Book a table</a><a class="m-btn o" data-goto="s1">See the menu</a></div></header>
    </div>
    <section class="m-sec" id="s1" style="background:var(--surface)"><div class="m-in"><h2 class="m-h2" style="text-align:center;margin-bottom:36px">${s.h2 || "Tonight’s menu"}</h2>
      <div class="m-menu">${s.items.map(it => `<div><div><b>${it[0]}</b><small>${it[1]}</small></div><i></i><em>${it[2] || "€14"}</em></div>`).join("")}</div></div></section>
    <section class="m-sec" id="s2"><div class="m-in m-cols">${A2(s, 1, "aspect-ratio:4/3")}<div style="align-self:center"><h2 class="m-h2">${s.about || "Find us"}</h2><p class="m-lead">${s.aboutText || "Open Tuesday to Sunday, 17:00 until late. Walk-ins welcome at the bar."}</p></div></div></section>
    ${foot(s)}`,

  stack: s => `
    <div class="m-in" id="top">${nav(s)}
      <header class="m-big"><h1>${s.headline.split("|").map(l => `<span>${l}</span>`).join("")}</h1>
        <div style="display:flex;justify-content:space-between;align-items:end;gap:24px;flex-wrap:wrap;margin-top:36px"><p class="m-lead" style="margin:0">${s.sub}</p><a class="m-btn" data-demo>${s.cta}</a></div></header>
    </div>
    <section class="m-sec" id="s1" style="padding-top:0"><div class="m-in">${A(s, 0, "aspect-ratio:21/9")}</div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in"><span class="m-kick">${s.h2 || "Services"}</span><div class="m-rows">${s.items.map((it, i) => `<div data-demo><span>${String(i + 1).padStart(2, "0")}</span><b>${it[0]}</b><span>${it[1]}</span></div>`).join("")}</div></div></section>
    <section class="m-sec" id="s3" style="padding-top:0"><div class="m-in m-cols"><h2 class="m-h2">${s.band || "Let’s talk."}</h2><div class="m-form"><input placeholder="Your name" aria-label="Your name"><input placeholder="Email" aria-label="Email"><a class="m-btn" data-demo>Send</a></div></div></section>
    ${foot(s)}`,

  bento: s => `
    <div class="m-in" id="top">${nav(s)}
      <header style="padding-block:clamp(24px,4cqi,56px) 36px;display:grid;gap:8px"><span class="m-kick">${s.kicker}</span><h1 class="m-h1" style="max-width:15ch">${s.headline}</h1><div style="display:flex;justify-content:space-between;gap:24px;flex-wrap:wrap;align-items:end"><p class="m-lead">${s.sub}</p><a class="m-btn" data-demo>${s.cta}</a></div></header>
      <div class="m-bento" id="s1">
        <div class="w2 h2 art">${A(s, 0)}<b>${s.items[0][0]}</b><span>${s.items[0][1]}</span></div>
        <div><b>${s.items[1][0]}</b><span>${s.items[1][1]}</span></div>
        <div class="art">${A2(s, 1)}<b>${s.items[2][0]}</b><span>${s.items[2][1]}</span></div>
        <div class="w2" style="background:var(--btn);color:var(--btnText)"><b>${s.items[3][0]}</b><span style="color:inherit;opacity:.8">${s.items[3][1]}</span></div>
      </div>
    </div>
    <section class="m-sec" id="s2"><div class="m-in m-stats">${(s.stats || [["98%", "On-time"], ["2,400", "Customers"], ["4.9", "Average rating"]]).map(x => `<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join("")}</div></section>
    <section class="m-sec" id="s3" style="padding-top:0"><div class="m-in"><div class="m-band"><h2 class="m-h2" style="max-width:16ch">${s.band || "Start in five minutes."}</h2><a class="m-btn" data-demo>${s.cta}</a></div></div></section>
    ${foot(s)}`,

  gallery: s => `
    <div class="m-in" id="top">${nav(s)}
      <header style="padding-block:clamp(24px,4cqi,56px) 40px;display:grid;grid-template-columns:1fr auto;gap:24px;align-items:end"><h1 class="m-h1" style="max-width:12ch">${s.headline}</h1><p class="m-lead" style="max-width:30ch">${s.sub}</p></header>
      <div class="m-gal" id="s1">${[1.2, .8, 1.4, 1, .75, 1.3, .9, 1.1, 1].map((r, i) => (i % 2 ? A2 : A)(s, i, `aspect-ratio:1/${r}`)).join("")}</div>
    </div>
    <section class="m-sec" id="s2"><div class="m-in m-cols"><h2 class="m-h2">${s.h2 || "About"}</h2><div><p class="m-lead" style="margin-top:0">${s.aboutText || s.sub}</p><div class="m-acts"><a class="m-btn" data-demo>${s.cta}</a></div></div></div></section>
    <section id="s3"></section>
    ${foot(s)}`,
};

/* ---------------- 25 fictional concept sites ---------------- */
const F = {
  serif: "'Fraunces', Georgia, serif",
  dm: "'DM Serif Display', Georgia, serif",
  syne: "'Syne', sans-serif",
  space: "'Space Grotesk', sans-serif",
  corm: "'Cormorant Garamond', Georgia, serif",
  arch: "'Archivo', sans-serif",
  nunito: "'Nunito', sans-serif",
  play: "'Playfair Display', Georgia, serif",
  brico: "'Bricolage Grotesque', sans-serif",
  geist: "'Geist', system-ui, sans-serif",
};
const C = (bg, surface, ink, muted, btn, btnText, accent, surface2) => ({ bg, surface, ink, muted, btn, btnText, accent, surface2 });

const SITES = [
  { id: "fashion", name: "Maison Lune", industry: "Fashion", style: "Luxury", pk: "Signature", layout: "editorial", city: "Paris", c: C("#F6F1EE", "#EDE4DE", "#1E1715", "#6E605A", "#1E1715", "#F6F1EE", "#B98B78", "#D9C7BE"), head: F.corm, body: F.geist, hw: 500, arts: ["arch", "horizon", "pill"], kicker: "Autumn / Winter 26", headline: "Maison Lune", sub: "Quiet tailoring in wool and silk, cut in small runs in our Paris atelier.", cta: "Shop the collection", nav: ["Collection", "Atelier", "Stores"], items: [["The Coat", "Double-faced wool"], ["The Shirt", "Silk crêpe de chine"], ["The Trouser", "High-waisted, pleated"], ["The Knit", "Scottish cashmere"]], desc: "Editorial luxury fashion house with a magazine-style homepage." },
  { id: "restaurant", name: "Brasa", industry: "Restaurants", style: "Bold", pk: "Business", layout: "menu", city: "Rotterdam", c: C("#1B1210", "#261A16", "#F7E9DD", "#C9AE9C", "#E2552B", "#1B1210", "#E2552B", "#3A2620"), head: F.dm, body: F.geist, hw: 400, arts: ["sun", "cone"], kicker: "Open fire kitchen", headline: "Everything tastes better over fire.", sub: "Charcoal-grilled plates to share, natural wine, and a kitchen you can watch.", cta: "Book a table", items: [["Grilled leeks", "Romesco, hazelnut", "€12"], ["Smoked burrata", "Charred peach", "€15"], ["Bavette", "Chimichurri, 250g", "€29"], ["Whole sea bream", "Lemon, fennel", "€32"], ["Ember carrots", "Labneh, dukkah", "€11"], ["Burnt cheesecake", "Sour cherry", "€9"]], desc: "Dark, warm restaurant site with a real menu and table booking." },
  { id: "sushi", name: "Kumo Sushi", industry: "Sushi", style: "Minimal", pk: "Essential", layout: "menu", city: "Antwerp", c: C("#F5F3EE", "#ECE8DF", "#16181A", "#666A6D", "#16181A", "#F5F3EE", "#C8372D", "#DCD5C8"), head: F.syne, body: F.geist, arts: ["pill", "rings"], kicker: "Omakase · 12 seats", headline: "Twelve seats. One counter.", sub: "A nightly omakase of fish from the Scheldt to Hokkaido, served one piece at a time.", cta: "Reserve", items: [["Omakase", "14 courses", "€95"], ["Chirashi", "Lunch only", "€32"], ["Toro nigiri", "Two pieces", "€14"], ["Uni hand roll", "Hokkaido", "€12"], ["Miso soup", "Red miso", "€5"], ["Sake pairing", "Five glasses", "€48"]], desc: "Calm, minimal sushi counter site with omakase booking." },
  { id: "hotel", name: "Hotel Saltmarsh", industry: "Hotels", style: "Elegant", pk: "Signature", layout: "immersive", city: "Texel", c: C("#F1F2EE", "#E4E7E1", "#1B2422", "#5E6B67", "#2F4A43", "#F1F2EE", "#C9A96E", "#A9B8AF"), head: F.play, body: F.geist, hw: 500, arts: ["horizon", "mesh", "arch"], kicker: "Texel · North Sea", headline: "Sleep where the dunes begin.", sub: "Twenty-two rooms between the marsh and the sea, with a sauna, a library and nothing on the schedule.", cta: "Check availability", nav: ["Rooms", "Spa", "Island"], stats: [["22", "Rooms"], ["400 m", "To the beach"], ["1", "Wood-fired sauna"]], items: [["Dune rooms", "Floor-to-ceiling windows"], ["The Bathhouse", "Sauna and cold plunge"], ["Breakfast", "From the island"], ["Bikes", "Free for guests"]], desc: "Immersive boutique hotel with full-screen hero and booking." },
  { id: "finance", name: "Ledgerline", industry: "Finance", style: "Corporate", pk: "Business", layout: "bento", city: "Amsterdam", c: C("#F4F6F8", "#FFFFFF", "#0D1B2A", "#5A6878", "#1D4ED8", "#FFFFFF", "#38BDF8", "#DCE6F2"), head: F.space, body: F.geist, arts: ["grid", "mesh"], kicker: "Bookkeeping for freelancers", headline: "Your books, done before you ask.", sub: "We handle invoices, VAT returns and year-end, so you get your evenings back.", cta: "Book a free call", nav: ["Services", "Pricing", "About"], items: [["VAT returns", "Filed on time, every quarter"], ["Monthly overview", "One clear email"], ["Year-end", "Income tax, sorted"], ["Fixed monthly price", "From €79, no surprises"]], stats: [["Quarterly", "VAT filing"], ["1 day", "Reply time"], ["Fixed", "Monthly fee"]], desc: "Clean, trustworthy finance site built on a bento grid." },
  { id: "realestate", name: "Haven & Co", industry: "Real estate", style: "Modern", pk: "Business", layout: "split", city: "Utrecht", c: C("#F7F5F0", "#FFFFFF", "#1F2421", "#66706B", "#264E3E", "#FFFFFF", "#D9A441", "#E7E2D6"), head: F.brico, body: F.geist, arts: ["arch", "blinds", "sun"], kicker: "Estate agents in Utrecht", headline: "Find the home that fits your next chapter.", sub: "Local agents who answer the phone, know the streets and tell you honestly what a house is worth.", cta: "Free valuation", nav: ["Buy", "Sell", "About"], h2: "How we help", items: [["Selling", "Valuation, photos, viewings and negotiation."], ["Buying", "We find what isn’t on the portals yet."], ["Renting", "Vetted tenants and clear contracts."]], strip: ["NVM member", "Local since 2011", "Viewing in 48 h"], desc: "Warm, modern estate agent site with valuation lead form." },
  { id: "beauty", name: "Studio Velours", industry: "Beauty", style: "Elegant", pk: "Essential", layout: "split", city: "Ghent", c: C("#FBF4F2", "#FFFFFF", "#3A2228", "#86666D", "#8E3B53", "#FFFFFF", "#E9B6BF", "#F2DCD9"), head: F.serif, body: F.geist, hw: 500, arts: ["pill", "mesh", "arch"], kicker: "Hair & skin studio", headline: "An hour that’s only about you.", sub: "Cuts, colour and facials in a calm studio with four chairs and good tea.", cta: "Book online", nav: ["Treatments", "Team", "Visit"], items: [["Cut & style", "From €48"], ["Balayage", "From €120"], ["Signature facial", "60 minutes, €85"]], desc: "Soft, elegant salon site with online booking." },
  { id: "fitness", name: "PULSE/lab", industry: "Fitness", style: "Bold", pk: "Business", layout: "stack", city: "Berlin", c: C("#0E0F0C", "#191B16", "#F1F5E9", "#A2A897", "#D7F25A", "#0E0F0C", "#D7F25A", "#2A2E24"), head: F.arch, body: F.geist, hw: 800, hls: "-.04em", upper: true, arts: ["stripes", "cone"], headline: "Train|Harder|Smarter", sub: "Small-group strength classes with coaches who know your name and your numbers.", cta: "Try a free class", nav: ["Classes", "Coaches", "Pricing"], h2: "Classes", items: [["Strength", "Barbell basics, 6 people max"], ["Conditioning", "45 minutes, all levels"], ["Mobility", "Recover and move better"], ["Open gym", "6:00 to 22:00"]], band: "First class is on us.", desc: "Loud, high-energy gym site with huge stacked type." },
  { id: "tech", name: "Orbitkit", industry: "Technology", style: "Futuristic", pk: "Signature", layout: "bento", city: "Eindhoven", c: C("#0A0C14", "#121625", "#E8ECFF", "#8B93B8", "#7C8CFF", "#0A0C14", "#5EEAD4", "#1B2140"), head: F.space, body: F.geist, arts: ["mesh", "grid", "cone"], kicker: "Fleet tracking for e-bikes", headline: "Know where every bike is. Always.", sub: "Plug-in trackers and a live dashboard for rental fleets from 10 to 10,000 bikes.", cta: "Start free trial", nav: ["Product", "Pricing", "Docs"], items: [["Live map", "Every bike, every second"], ["Theft alerts", "Push and SMS"], ["Battery health", "Predict before it fails"], ["API access", "Plug into your stack"]], stats: [["2 min", "Install per bike"], ["5 yrs", "Battery life"], ["99.9%", "Uptime target"]], desc: "Dark SaaS product site with glowing bento tiles." },
  { id: "portfolio", name: "Noor Hadid", industry: "Portfolio", style: "Creative", pk: "Essential", layout: "gallery", city: "Lisbon", c: C("#EFEDE6", "#E4E1D7", "#191919", "#666660", "#191919", "#EFEDE6", "#FF5B37", "#CFCABC"), head: F.syne, body: F.geist, hw: 700, arts: ["cone", "split", "rings", "pill", "stripes"], headline: "Illustration & motion.", sub: "Freelance illustrator working with publishers, brands and the occasional band.", cta: "Say hello", nav: ["Work", "About", "Contact"], items: [["Books", ""], ["Brands", ""], ["Music", ""], ["Motion", ""]], desc: "Gallery-first portfolio that lets the work speak." },
  { id: "auto", name: "Vanta Motors", industry: "Automotive", style: "Luxury", pk: "Signature", layout: "immersive", city: "Munich", c: C("#0B0B0C", "#151517", "#F3F3F1", "#9C9C98", "#F3F3F1", "#0B0B0C", "#C4A15A", "#2B2B2E"), head: F.arch, body: F.geist, hw: 700, arts: ["horizon", "stripes", "mesh"], kicker: "Pre-owned performance cars", headline: "Driven by detail.", sub: "Hand-picked sports cars with full history, a 150-point inspection and a 12-month warranty.", cta: "View inventory", nav: ["Inventory", "Sell your car", "Visit"], stats: [["150", "Point inspection"], ["12 mo", "Warranty"], ["48 h", "Test drive booking"]], items: [["911 Carrera S", "2021 · 18,000 km"], ["RS 6 Avant", "2022 · 22,000 km"], ["M4 Competition", "2023 · 9,000 km"], ["Cayman GT4", "2020 · 31,000 km"]], desc: "Cinematic, dark automotive dealer site." },
  { id: "bakery", name: "Rogge Bakery", industry: "Cafés & bakeries", style: "Organic", pk: "Essential", layout: "split", city: "Haarlem", c: C("#F7F0E3", "#FFF9EE", "#3A2A1A", "#7A6650", "#B4561E", "#FFF9EE", "#E7B35C", "#EBDDC4"), head: F.dm, body: F.nunito, hw: 400, arts: ["sun", "rings", "arch"], kicker: "Sourdough since 1998", headline: "Bread worth getting up for.", sub: "Slow-fermented sourdough, buttery pastries and birthday cakes, baked every morning at five.", cta: "Order a cake", nav: ["Bakes", "Cakes", "Visit"], items: [["Sourdough", "48-hour ferment"], ["Pastries", "Real butter, every day"], ["Celebration cakes", "Order 3 days ahead"]], strip: ["Open 7:00–17:00", "Organic flour", "Order ahead"], desc: "Warm, friendly bakery site with cake ordering." },
  { id: "dental", name: "Clearbright Dental", industry: "Medical & dental", style: "Corporate", pk: "Business", layout: "split", city: "Leiden", c: C("#F5F9FA", "#FFFFFF", "#0F2B36", "#557079", "#0E7C86", "#FFFFFF", "#7DD3C0", "#D9ECEF"), head: F.brico, body: F.geist, arts: ["mesh", "pill", "arch"], kicker: "Family dentist in Leiden", headline: "A dentist you won’t dread.", sub: "Gentle checkups, clear prices and evening appointments for busy families.", cta: "Book a checkup", nav: ["Treatments", "Prices", "Team"], items: [["Checkups", "Every 6 months, 30 minutes"], ["Whitening", "In-chair or at home"], ["Emergency", "Same-day when possible"]], strip: ["New patients welcome", "Evening hours", "Insurance accepted"], desc: "Calm, reassuring clinic site with appointment booking." },
  { id: "travel", name: "Wayfarer & Wild", industry: "Travel", style: "Organic", pk: "Business", layout: "immersive", city: "Bruges", c: C("#F3F0E8", "#FFFFFF", "#1E2A22", "#647065", "#3E6B4A", "#FFFFFF", "#E08E45", "#BFD0B9"), head: F.serif, body: F.geist, arts: ["horizon", "sun", "mesh"], kicker: "Small-group walking trips", headline: "Walk the long way round.", sub: "Eight-day walking trips through the Dolomites, Azores and Scottish Highlands, max twelve people.", cta: "See the trips", nav: ["Trips", "How it works", "About"], stats: [["12", "People max"], ["8", "Days"], ["3", "Countries"]], items: [["Dolomites", "June to September"], ["Azores", "April to October"], ["Highlands", "May to September"]], desc: "Adventurous travel agency site with trip highlights." },
  { id: "shop", name: "Fold Ceramics", industry: "Online stores", style: "Minimal", pk: "Business", layout: "shop", city: "Copenhagen", c: C("#F4F3F0", "#FFFFFF", "#1C1C1A", "#6B6A64", "#1C1C1A", "#FFFFFF", "#6F8F72", "#D8D5CB"), head: F.brico, body: F.geist, arts: ["pill", "arch", "rings", "sun"], kicker: "Handmade in Copenhagen", headline: "Everyday ceramics, made slowly.", sub: "Plates, cups and vases thrown by hand in small batches.", cta: "Shop now", nav: ["Shop", "Studio", "Journal"], items: [["Morning cup", "", "€32"], ["Side plate", "", "€28"], ["Bud vase", "", "€45"], ["Serving bowl", "", "€68"]], desc: "Minimal online store with product grid and cart." },
  { id: "construction", name: "Stern Bouw", industry: "Construction", style: "Bold", pk: "Essential", layout: "stack", city: "Groningen", c: C("#F2F0EA", "#FFFFFF", "#151515", "#5F5E58", "#F2B705", "#151515", "#F2B705", "#D9D5C8"), head: F.arch, body: F.geist, hw: 800, hls: "-.035em", upper: true, arts: ["blinds", "stripes"], headline: "Built|Right|Once", sub: "Renovations, extensions and new builds in Groningen. Fixed quotes, clear planning.", cta: "Request a quote", nav: ["Services", "Projects", "Contact"], h2: "What we build", items: [["Extensions", "Kitchens, living rooms, dormers"], ["Renovations", "Old houses made new"], ["New builds", "From plan to keys"], ["Maintenance", "Roofs, frames, gutters"]], band: "Free site visit within a week.", desc: "Strong, confident builder site with quote request." },
  { id: "legal", name: "Aldridge Partners", industry: "Legal & consulting", style: "Corporate", pk: "Business", layout: "editorial", city: "The Hague", c: C("#F6F5F1", "#ECE9E1", "#14202B", "#5E6670", "#14202B", "#F6F5F1", "#9C7C4A", "#D4CEC0"), head: F.play, body: F.geist, hw: 500, arts: ["blinds", "grid", "arch"], kicker: "Employment & contract law", headline: "Aldridge", sub: "Clear legal advice for small businesses, in plain language and at a fixed fee where we can.", cta: "Free first call", nav: ["Expertise", "People", "Contact"], items: [["Employment law", "Contracts, dismissals, disputes"], ["Contracts", "Terms, NDAs, agreements"], ["Disputes", "Mediation before court"], ["Fixed fees", "Know the cost upfront"]], desc: "Serious, editorial law firm site that feels trustworthy." },
  { id: "events", name: "Afterglow Live", industry: "Events", style: "Playful", pk: "Signature", layout: "stack", city: "Amsterdam", c: C("#2A0F4A", "#3A1863", "#FFF4E8", "#CDB6E6", "#FF7AC6", "#2A0F4A", "#FFD166", "#4C2280"), head: F.syne, body: F.geist, hw: 800, hls: "-.04em", arts: ["cone", "rings", "mesh"], headline: "Sound|Lights|Night", sub: "Three stages, forty artists and one very long night by the IJ. 14 August 2027.", cta: "Get tickets", nav: ["Line-up", "Tickets", "Info"], h2: "Stages", items: [["Main stage", "Headliners from 21:00"], ["The Dome", "House and disco"], ["Garden", "Live bands at sunset"], ["After hours", "Until 06:00"]], band: "Early-bird tickets from €49.", desc: "Loud, playful festival site with ticket sales." },
  { id: "interior", name: "Atelier Oker", industry: "Interior design", style: "Luxury", pk: "Signature", layout: "gallery", city: "Milan", c: C("#EFE8DD", "#E5DCCD", "#2A221B", "#73675A", "#2A221B", "#EFE8DD", "#B5733F", "#CDBFA9"), head: F.corm, body: F.geist, hw: 600, arts: ["arch", "split", "blinds", "pill", "sun"], headline: "Rooms with a point of view.", sub: "Interior architecture for homes and hotels, from the first sketch to the last cushion.", cta: "Start a project", nav: ["Projects", "Studio", "Contact"], items: [["Homes", ""], ["Hospitality", ""], ["Objects", ""], ["Press", ""]], h2: "Studio", desc: "Gallery-led interior studio with a warm, luxury palette." },
  { id: "education", name: "Brightpath Academy", industry: "Education", style: "Playful", pk: "Business", layout: "bento", city: "Eindhoven", c: C("#FFF8EC", "#FFFFFF", "#1E2546", "#5F6585", "#3A49D6", "#FFFFFF", "#FFB23F", "#FFE3B3"), head: F.nunito, body: F.nunito, hw: 800, arts: ["dots", "sun", "cone"], kicker: "Tutoring for ages 10–18", headline: "Better grades, less stress at home.", sub: "One-to-one tutoring in maths, languages and science, online or at our centre.", cta: "Book a trial lesson", nav: ["Subjects", "Tutors", "Prices"], items: [["Maths & science", "From first year to finals"], ["Languages", "English, French, German"], ["Exam training", "Small groups"], ["First lesson free", "No commitment"]], stats: [["1-to-1", "Lessons"], ["60 min", "Per session"], ["Online", "Or in person"]], desc: "Friendly, colourful tutoring site with trial booking." },
  { id: "cleaning", name: "Sparkwell", industry: "Cleaning", style: "Modern", pk: "Essential", layout: "split", city: "Delft", c: C("#F2F8FB", "#FFFFFF", "#0F2A3D", "#5A7183", "#1784C7", "#FFFFFF", "#86E3CE", "#D6ECF7"), head: F.brico, body: F.geist, arts: ["dots", "mesh", "pill"], kicker: "Home & office cleaning", headline: "Come home to clean.", sub: "Vetted, insured cleaners every week or every other week. Book in two minutes.", cta: "Get a price", nav: ["Services", "Prices", "Reviews"], items: [["Weekly clean", "Same cleaner every time"], ["Deep clean", "Ovens, windows, the lot"], ["Offices", "After hours"]], strip: ["Insured", "Vetted staff", "Cancel any time"], desc: "Fresh, bright cleaning company site with instant quote." },
  { id: "personal", name: "Sam Okafor", industry: "Personal brands", style: "Minimal", pk: "Essential", layout: "stack", city: "London", c: C("#F5F5F3", "#FFFFFF", "#111111", "#666666", "#111111", "#FFFFFF", "#3B5BFF", "#E2E2DE"), head: F.brico, body: F.geist, hw: 700, arts: ["split", "grid"], headline: "Coach.|Speaker.|Writer.", sub: "I help first-time managers lead teams without losing their weekends.", cta: "Book a call", nav: ["Coaching", "Talks", "Newsletter"], h2: "Ways to work together", items: [["1:1 coaching", "Three-month programme"], ["Team workshops", "Half or full day"], ["Keynotes", "Conferences and offsites"], ["Newsletter", "Every Sunday"]], band: "Let’s talk about your team.", desc: "Clean personal brand site for a coach and speaker." },
  { id: "architecture", name: "Form Collective", industry: "Architecture", style: "Minimal", pk: "Signature", layout: "editorial", city: "Rotterdam", c: C("#EDEEEA", "#E1E3DD", "#161816", "#62655F", "#161816", "#EDEEEA", "#8A9A8C", "#C9CDC4"), head: F.arch, body: F.geist, hw: 300, hls: "-.05em", arts: ["blinds", "grid", "arch"], kicker: "Architecture & urbanism", headline: "FORM", sub: "Housing, schools and public spaces designed around how people actually live.", cta: "See projects", nav: ["Projects", "Office", "Contact"], items: [["Wharf Housing", "Rotterdam, 2025"], ["Polder School", "Almere, 2024"], ["Market Hall", "Tilburg, 2023"], ["River Pavilion", "Nijmegen, 2022"]], desc: "Austere, editorial architecture office site." },
  { id: "photo", name: "Ilse Vos Photography", industry: "Photography", style: "Elegant", pk: "Essential", layout: "gallery", city: "Maastricht", c: C("#141414", "#1E1E1E", "#F2F0EC", "#9D9A94", "#F2F0EC", "#141414", "#D4B483", "#2C2C2C"), head: F.corm, body: F.geist, hw: 500, arts: ["horizon", "sun", "mesh", "arch", "blinds"], headline: "Weddings, quietly told.", sub: "Documentary wedding photography across the Netherlands and Belgium.", cta: "Check my date", nav: ["Weddings", "About", "Contact"], items: [["Weddings", ""], ["Elopements", ""], ["Portraits", ""], ["Prices", ""]], h2: "About Ilse", desc: "Dark, photo-first gallery for a wedding photographer." },
  { id: "pets", name: "Pawsome Club", industry: "Pet services", style: "Playful", pk: "Business", layout: "split", city: "Amersfoort", c: C("#FFF6EE", "#FFFFFF", "#2B2118", "#76675A", "#F26B3A", "#FFFFFF", "#7CC6A4", "#FFE0C7"), head: F.nunito, body: F.nunito, hw: 800, arts: ["dots", "sun", "pill"], kicker: "Dog daycare & grooming", headline: "Happy dogs, tired dogs.", sub: "Daycare, walks and grooming with a team that sends photos every afternoon.", cta: "Book a trial day", nav: ["Daycare", "Grooming", "Prices"], items: [["Daycare", "Big garden, small groups"], ["Grooming", "Bath, cut and nails"], ["Pick-up", "We collect and drop off"]], strip: ["Photo updates daily", "Certified team", "Trial day €15"], desc: "Cheerful pet daycare site with booking." },
];
const LAYOUT_LABEL = { split: "Business site", editorial: "Editorial", shop: "Online store", immersive: "Immersive", menu: "Restaurant", stack: "Bold type", bento: "Bento grid", gallery: "Gallery" };

function renderSite(s, opts = {}) {
  const c = Object.assign({}, s.c, { head: s.head, body: s.body, hw: s.hw, hls: s.hls, upper: s.upper, radius: s.radius ?? 10, shadow: s.shadow, pillButtons: s.pill }, opts.override || {});
  const name = (opts.name || "").trim();
  const safe = name.replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const ss = Object.assign({}, s, { c, _w: opts.thumb ? 700 : 1400 }, safe ? { name: safe } : {});
  const sp = opts.spacing ?? 1;
  const mo = opts.motion ?? 1;
  const anim = (opts.anim ?? s.anim ?? "none").split(" ").map(a => "an-" + a).join(" ");
  let html = LAYOUTS[s.layout](ss);
  // Swap the concept's brand for the visitor's own business name, wherever it appears.
  if (safe) {
    html = html.split(s.name).join(safe);
    if (s.name.toUpperCase() !== s.name) html = html.split(s.name.toUpperCase()).join(safe.toUpperCase());
  }
  return `<div class="ms l-${s.layout} sp-${sp} mo-${mo} ${anim}${opts.thumb ? " is-thumb" : ""}" style="${msVars(c)}">${html}</div>`;
}

/* ---------------- Halden Coffee: three packages ---------------- */
/* Realistic roasted beans, drawn in SVG: shaded body, centre crease, highlight and grain.
   Each sits at a depth (--d) and drifts with the pointer and scroll (see app.js). */
const BEAN_DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <radialGradient id="hbG" cx=".36" cy=".28" r=".85"><stop offset="0" stop-color="#B0703C"/><stop offset=".4" stop-color="#6A3618"/><stop offset=".8" stop-color="#2E1408"/><stop offset="1" stop-color="#1A0B04"/></radialGradient>
  <radialGradient id="hbH" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFE2C4" stop-opacity=".55"/><stop offset="1" stop-color="#FFE2C4" stop-opacity="0"/></radialGradient>
  <filter id="hbN" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .1  0 0 0 0 .05  0 0 0 0 .02  0 0 0 .55 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
  <symbol id="hbean" viewBox="0 0 100 130">
    <path d="M50 4C80 3 97 36 96 69c-1 34-22 57-47 57C21 126 4 100 4 67 4 32 21 5 50 4Z" fill="url(#hbG)"/>
    <path d="M50 4C80 3 97 36 96 69c-1 34-22 57-47 57C21 126 4 100 4 67 4 32 21 5 50 4Z" fill="#000" filter="url(#hbN)"/>
    <path d="M53 10c-13 24 13 44-3 72-8 15 6 27 1 40" fill="none" stroke="#120501" stroke-width="7" stroke-linecap="round"/>
    <path d="M58 13c-12 23 13 43-2 70-7 14 5 25 2 36" fill="none" stroke="#E7A877" stroke-opacity=".28" stroke-width="1.8" stroke-linecap="round"/>
    <ellipse cx="29" cy="44" rx="11" ry="26" fill="url(#hbH)" transform="rotate(-16 29 44)"/>
    <ellipse cx="74" cy="94" rx="7" ry="16" fill="url(#hbH)" opacity=".35" transform="rotate(-16 74 94)"/>
  </symbol></defs></svg>`;
// [left %, top %, width px, depth, rotation, float seconds]
const BEANS = [
  [52, 8, 34, .25, 20, 7], [88, 4, 40, .3, -40, 8], [96, 46, 30, .2, 70, 9], [60, 70, 28, .2, -10, 6], [44, 34, 22, .15, 120, 10],
  [70, 14, 64, .6, 35, 6], [93, 26, 58, .55, -70, 7], [62, 52, 70, .65, 160, 8], [84, 74, 62, .6, 10, 6.5], [76, 40, 46, .5, -120, 9],
  [57, 26, 110, 1.15, -25, 7], [98, 62, 130, 1.25, 55, 8], [48, 84, 120, 1.1, 95, 6], [8, 12, 26, .18, 60, 9], [30, 6, 34, .3, -50, 8],
];
const beanLayer = () => `<div class="sig-beans" aria-hidden="true">${BEANS.map(([x, y, w, d, r, f]) =>
  `<span class="sig-bean ${d < .35 ? "far" : d > 1 ? "near" : ""}" style="left:${x}%;top:${y}%;width:${w}px;--d:${d};--r:${r}deg;--f:${f}s"><svg><use href="#hbean"/></svg></span>`).join("")}</div>`;

const HALDEN = {
  essential() {
    const s = { id: "halden", name: "Halden Coffee", layout: "split", c: C("#FAF7F2", "#FFFFFF", "#2B211B", "#6F625A", "#2B211B", "#FAF7F2", "#C6874A", "#EADFD2"), head: F.brico, body: F.geist, radius: 8, arts: ["sun", "arch"], kicker: "Speciality coffee roasters", headline: "Coffee roasted on Tuesday, in your cup by Friday.", sub: "Small-batch beans from farms we visit ourselves. Order online or drop by the roastery.", cta: "Shop beans", nav: ["Beans", "About", "Visit"], h2: "Why Halden", items: [["Fresh every week", "Roasted to order, shipped within 48 hours."], ["Direct trade", "We pay farmers well above fair-trade prices."], ["Free shipping", "On orders over €35 in the Netherlands."]], about: "Roasted in Utrecht since 2016.", band: "Visit the roastery on Saturdays.", strip: ["Utrecht", "Since 2016", "Free shipping over €35"] };
    return renderSite(s, { spacing: 1, motion: 0 });
  },
  business() {
    const c = C("#F3EEE6", "#FFFFFF", "#22302A", "#62706A", "#22302A", "#F3EEE6", "#D98A3D", "#D8CBB7");
    const v = msVars(Object.assign({}, c, { head: F.serif, body: F.geist, radius: 16, shadow: true, hw: 600 }));
    const beans = [["Ethiopia Guji", "Peach, jasmine, honey", "€14"], ["Colombia Huila", "Red apple, caramel", "€13"], ["Brazil Cerrado", "Chocolate, hazelnut", "€12"], ["Decaf Peru", "Cocoa, plum", "€13"]];
    return `<div class="ms l-split sp-1 mo-2" style="${v}">
      <div style="background:var(--btn);color:var(--btnText);font-size:13px;text-align:center;padding:9px">Free shipping on orders over €35 · Subscribe and save 10%</div>
      <div class="m-in" id="top">
        <nav class="m-nav"><a class="m-logo" data-goto="top"><i></i>Halden</a>
          <div class="m-links"><a data-goto="s1">Shop</a><a data-goto="s2">Subscriptions</a><a data-goto="s3">Roastery</a><a data-demo>Wholesale</a></div>
          <div style="display:flex;gap:10px;align-items:center"><a class="m-links m-cart" data-n="1" style="display:inline" data-demo>Cart</a><a class="m-btn" data-demo>Subscribe</a></div>
          <button class="m-burger" data-demo aria-label="Menu"><i></i><i></i><i></i></button></nav>
        <section class="m-hero" style="display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:stretch;padding-block:24px 0">
          <div class="m-card" style="display:flex;flex-direction:column;justify-content:space-between;padding:clamp(28px,4cqi,48px);background:var(--surface)">
            <div><span class="m-badge">New harvest</span><h1 class="m-h1" style="margin-top:18px;font-size:clamp(38px,5.6cqi,80px)">Coffee with a story in every bag.</h1><p class="m-lead">Small-batch beans roasted weekly in Utrecht. Choose a single bag or let us surprise you every month.</p></div>
            <div class="m-acts"><a class="m-btn" data-goto="s1">Shop beans</a><a class="m-btn o" data-goto="s2">How subscriptions work</a></div>
          </div>
          <div style="display:grid;grid-template-rows:1.4fr 1fr;gap:20px">
            <div class="m-art is-photo" style="background:${coffeeBg(COFFEE.roaster)}"></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
              <div class="m-card" style="display:grid;align-content:end"><b style="font-family:var(--head);font-size:34px">4.9</b><p>From 1,200 reviews</p></div>
              <div class="m-art is-photo" style="background:${coffeeBg(COFFEE.latte, 600)}"></div>
            </div>
          </div>
        </section>
      </div>
      <section class="m-sec" id="s1"><div class="m-in">
        <div style="display:flex;justify-content:space-between;align-items:end;gap:16px;flex-wrap:wrap;margin-bottom:24px"><h2 class="m-h2">This month’s beans</h2><div style="display:flex;gap:6px;flex-wrap:wrap"><span class="m-badge" style="background:var(--btn);color:var(--btnText)">All</span><span class="m-badge">Filter</span><span class="m-badge">Espresso</span><span class="m-badge">Decaf</span></div></div>
        <div class="m-prods">${beans.map((b, i) => `<div class="m-prod m-card" style="padding:14px" data-demo><div class="m-art is-photo" style="background:${coffeeBg(COFFEE.beans[i], 600)};aspect-ratio:1"></div><b>${b[0]}</b><span>${b[1]}</span><div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px"><b>${b[2]}</b><span class="m-badge">Add</span></div></div>`).join("")}</div>
      </div></section>
      <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in m-cols" style="align-items:center">
        <div><span class="m-kick">Subscriptions</span><h2 class="m-h2">Never run out again.</h2><p class="m-lead">Pick how often, pause any time. Every bag is roasted the week it ships.</p></div>
        <div class="m-three" style="margin:0;grid-template-columns:repeat(3,1fr)">${[["Every week", "€12/bag"], ["Every 2 weeks", "€12.50/bag"], ["Monthly", "€13/bag"]].map((x, i) => `<div class="m-card" style="${i === 1 ? "box-shadow:inset 0 0 0 2px var(--accent)" : ""}"><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join("")}</div>
      </div></section>
      <section class="m-sec" id="s3" style="padding-top:0"><div class="m-in m-cols">${`<div class="m-art is-photo" style="background:${coffeeBg(COFFEE.roastery)};aspect-ratio:4/3"></div>`}<div style="align-self:center"><h2 class="m-h2">Visit the roastery</h2><p class="m-lead">Oudegracht 112, Utrecht. Cuppings every Saturday at 11:00.</p><div class="m-form" style="margin-top:24px"><input placeholder="Email for the newsletter" aria-label="Email"><a class="m-btn" data-demo>Join 4,000 coffee lovers</a></div></div></div></section>
      <div class="m-in m-foot"><span>© 2026 Halden Coffee</span><span>Shop · Wholesale · Careers · Contact</span></div>
    </div>`;
  },
  signature() {
    const c = C("#120D0A", "#1C1410", "#F4E7D7", "#BFA690", "#F0A44B", "#120D0A", "#F0A44B", "#2A1D16");
    const v = msVars(Object.assign({}, c, { head: F.syne, body: F.geist, radius: 0, hw: 800, hls: "-.05em", pillButtons: true }));
    const steps = [["Farm", "Finca El Paraíso, Huila. 1,850 m."], ["Roast", "Tuesday, 11 minutes, 204°C."], ["Rest", "Four days to open up."], ["Cup", "Peach, cane sugar, a long finish."]];
    return `<div class="ms l-immersive sp-2 mo-3 sig" style="${v}">
      <style>
        .sig .sig-hero{position:relative;min-height:clamp(560px,70cqi,820px);overflow:hidden;display:flex;flex-direction:column}
        .sig .sig-bg{position:absolute;inset:0;background:${coffeeBg(COFFEE.hills, 1600)};filter:saturate(.8)}
        .sig .sig-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(18,13,10,.92) 30%,rgba(18,13,10,.45)),linear-gradient(0deg,#120D0A,transparent 40%)}
        .sig .sig-orb{position:absolute;width:clamp(320px,52cqi,720px);aspect-ratio:1;right:-8%;top:8%;border-radius:50%;background:${coffeeBg(COFFEE.latte)};animation:sigspin 200s linear infinite}
        .sig .sig-orb::after{content:"";position:absolute;inset:-14%;border-radius:50%;border:1px dashed rgba(240,164,75,.45);animation:sigspin 40s linear infinite reverse}
        .sig .sig-ring{position:absolute;right:calc(-8% + clamp(320px,52cqi,720px)/2 - 90px);top:calc(8% + clamp(320px,52cqi,720px)/2 - 90px);width:180px;height:180px;animation:sigspin 24s linear infinite}
        .sig .sig-ring text{font:600 12px var(--body);letter-spacing:.3em;fill:#F4E7D7}
        @keyframes sigspin{to{transform:rotate(360deg)}}
        .sig .sig-hero{--mx:0;--my:0;--sy:0}
        .sig .sig-par{position:absolute;inset:0;transform:translate3d(calc(var(--mx) * var(--d) * -90px),calc(var(--my) * var(--d) * -90px + var(--sy) * var(--d) * -.4px),0);transition:transform 1.1s cubic-bezier(.16,1,.3,1);will-change:transform}
        .sig .sig-orb{box-shadow:0 60px 140px rgba(0,0,0,.75),0 0 0 1px rgba(240,164,75,.25)}
        .sig .sig-beans{position:absolute;inset:0;pointer-events:none}
        .sig .sig-bean{position:absolute;aspect-ratio:100/130;transform:translate3d(calc(var(--mx) * var(--d) * -110px),calc(var(--my) * var(--d) * -110px + var(--sy) * var(--d) * -.5px),0);transition:transform 1.1s cubic-bezier(.16,1,.3,1);filter:drop-shadow(0 calc(var(--d) * 26px) calc(var(--d) * 22px) rgba(0,0,0,.6));will-change:transform}
        .sig .sig-bean svg{width:100%;height:100%;display:block;overflow:visible;transform:rotate(var(--r));animation:sigfloat var(--f) ease-in-out infinite alternate}
        .sig .sig-bean.far{filter:blur(1.6px) brightness(.55)}
        .sig .sig-bean.near{filter:blur(3px) drop-shadow(0 30px 30px rgba(0,0,0,.6));z-index:3}
        @keyframes sigfloat{to{transform:rotate(calc(var(--r) + 18deg)) translateY(-16px)}}
        .sig .sig-h{transform:translate3d(calc(var(--mx) * 14px),calc(var(--my) * 10px),0);transition:transform 1.1s cubic-bezier(.16,1,.3,1);z-index:2}
        .sig .sig-h{position:relative;margin-top:auto;padding-bottom:clamp(32px,5cqi,72px)}
        .sig .sig-h h1{font-size:clamp(56px,13cqi,200px);line-height:.82;letter-spacing:-.06em;text-transform:uppercase}
        .sig .sig-h h1 span{display:block}
        .sig .sig-h h1 span:nth-child(2){-webkit-text-stroke:1.5px var(--ink);color:transparent;padding-left:12%}
        .sig .sig-h h1 span{animation:sigup 1.2s cubic-bezier(.2,.7,.1,1) both}
        .sig .sig-h h1 span:nth-child(2){animation-delay:.12s}.sig .sig-h h1 span:nth-child(3){animation-delay:.24s}
        @keyframes sigup{from{transform:translateY(60%);opacity:0}}
        .sig .sig-story{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line)}
        .sig .sig-story>div{padding:28px 22px 40px;border-right:1px solid var(--line);position:relative;transition:background .5s;cursor:pointer}
        .sig .sig-story>div:hover{background:var(--surface)}
        .sig .sig-story>div::before{content:"";position:absolute;top:-1px;left:0;height:2px;width:0;background:var(--accent);transition:width .8s cubic-bezier(.2,.7,.1,1)}
        .sig .sig-story>div:hover::before{width:100%}
        .sig .sig-story i{display:block;aspect-ratio:4/3;margin:16px 0 0;background-size:cover!important;filter:grayscale(.3) brightness(.85);transition:filter .5s}
        .sig .sig-story>div:hover i{filter:none}
        .sig .sig-story b{font-family:var(--head);font-size:clamp(28px,3.6cqi,48px);display:block;margin:18px 0 8px;letter-spacing:-.04em}
        .sig .sig-story span{color:var(--muted);font-size:14px}
        .sig .sig-taste{display:grid;grid-template-columns:1.1fr 1fr;gap:48px;align-items:center}
        .sig .sig-wheel{aspect-ratio:1;border-radius:50%;background:conic-gradient(#F0A44B 0 22%,#C9661E 0 41%,#F4E7D7 0 55%,#7A3A16 0 76%,#E9C79A 0);position:relative;animation:sigspin 60s linear infinite}
        .sig .sig-wheel::after{content:"";position:absolute;inset:22%;border-radius:50%;background:url(${photoUrl(COFFEE.cup, 900)}) 74% 46%/auto 175% no-repeat #2A1D16;box-shadow:0 0 0 10px var(--bg);animation:sigspin 60s linear infinite reverse}
        .sig .sig-bars{display:grid;gap:18px}
        .sig .sig-bars div{display:grid;gap:6px;font-size:14px}
        .sig .sig-bars i{display:block;height:3px;background:var(--line)}
        .sig .sig-bars i::after{content:"";display:block;height:100%;width:var(--w);background:var(--accent)}
        @container (max-width:640px){.sig .sig-bean.near,.sig .sig-bean:nth-child(n+11){display:none}.sig .sig-story{grid-template-columns:1fr 1fr}.sig .sig-taste{grid-template-columns:1fr}.sig .sig-orb{right:-30%;top:12%}.sig .sig-ring{display:none}}
      </style>
      <section class="sig-hero" id="top">
        ${BEAN_DEFS}
        <div class="sig-bg sig-par" style="--d:.08;inset:-60px"></div>
        <div class="sig-par" style="--d:.3"><div class="sig-orb"></div>
        <svg class="sig-ring" viewBox="0 0 180 180" aria-hidden="true"><defs><path id="hc" d="M90,90 m-70,0 a70,70 0 1,1 140,0 a70,70 0 1,1 -140,0"/></defs><text><textPath href="#hc">HALDEN · ROASTED IN UTRECHT · SINCE 2016 · </textPath></text></svg></div>
        ${beanLayer()}
        <div class="m-in" style="position:relative">${`<nav class="m-nav"><a class="m-logo" data-goto="top">HALDEN</a><div class="m-links"><a data-goto="s1">The journey</a><a data-goto="s2">Taste</a><a data-goto="s3">Shop</a></div><a class="m-btn" data-demo>Order the harvest</a><button class="m-burger" data-demo aria-label="Menu"><i></i><i></i><i></i></button></nav>`}</div>
        <div class="m-in sig-h"><h1><span>From the</span><span>mountain</span><span>to you.</span></h1>
          <div style="display:flex;justify-content:space-between;align-items:end;gap:24px;flex-wrap:wrap;margin-top:32px"><p class="m-lead" style="margin:0">Harvest 26 has landed. Follow one bag of coffee from a hillside in Colombia to your kitchen.</p><a class="m-btn" data-goto="s1">Follow the journey</a></div></div>
      </section>
      <div class="m-marq"><div>${Array(2).fill(["Huila", "Guji", "Cerrado", "Kayanza", "Nariño"].map(x => `<span>${x}</span><span style="color:var(--accent)">●</span>`).join("")).join("")}</div></div>
      <section class="m-sec" id="s1"><div class="m-in"><h2 class="m-h2" style="max-width:14ch;margin-bottom:40px">Four stops. Eleven weeks. One cup.</h2>
        <div class="sig-story">${steps.map((s, i) => `<div data-demo><span>0${i + 1}</span><i style="background:${coffeeBg([COFFEE.picking, COFFEE.drum, COFFEE.beans[2], COFFEE.pour][i], 700)}"></i><b>${s[0]}</b><span>${s[1]}</span></div>`).join("")}</div></div></section>
      <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in sig-taste"><div class="sig-wheel" aria-hidden="true"></div>
        <div><span class="m-kick">Tasting profile</span><h2 class="m-h2">Bright, sweet and very long.</h2>
          <div class="sig-bars" style="margin-top:28px">${[["Acidity", "78%"], ["Sweetness", "86%"], ["Body", "52%"], ["Finish", "90%"]].map(x => `<div><span>${x[0]}</span><i style="--w:${x[1]}"></i></div>`).join("")}</div></div></div></section>
      <section class="m-sec" id="s3" style="padding-top:0"><div class="m-in"><div class="m-band" style="border-radius:0;background:var(--accent);color:var(--bg)"><h2 class="m-h2" style="max-width:14ch">Only 600 bags this harvest.</h2><a class="m-btn" style="background:var(--bg);color:var(--accent)" data-demo>Reserve yours</a></div></div></section>
      <div class="m-in m-foot"><span>© 2026 Halden Coffee</span><span>Utrecht · Instagram · Journal</span></div>
    </div>`;
  },
};
