/* =========================================================
   SiteQuest Studio showroom, part 4
   - The 20 most common and most loved website design styles
   - Four layouts for styles the showroom was missing
     (Y2K, Glassmorphism, Art Deco, Maximalist)
   - Eight new concepts, and every concept tagged with one style
   ========================================================= */

/* 20 design styles. `look` drives the little poster used in menus. */
const DESIGN_STYLES = [
  { id: "Minimalist", d: "Lots of space, one accent, nothing extra.", look: { bg: "#FAFAF8", ink: "#111111", ac: "#111111", f: F.geist, w: 500, deco: "dot" } },
  { id: "Swiss", d: "Strict grid, big sans-serif type, sharp red.", look: { bg: "#EFEFEC", ink: "#111111", ac: "#E1251B", f: F.space, w: 700, deco: "grid" } },
  { id: "Editorial", d: "Magazine serif headlines and calm columns.", look: { bg: "#F3EFE6", ink: "#1E1B16", ac: "#B4532A", f: F.play, w: 500, deco: "rule" } },
  { id: "Luxury", d: "Dark, quiet and expensive. Gold details.", look: { bg: "#100F0D", ink: "#EDE4D3", ac: "#C9A961", f: F.corm, w: 500, deco: "frame" } },
  { id: "Brutalist", d: "Raw, loud, black borders, no polish on purpose.", look: { bg: "#FFFFFF", ink: "#000000", ac: "#FFE600", f: F.mono, w: 700, deco: "block" } },
  { id: "Bold typography", d: "Huge words do the talking.", look: { bg: "#151515", ink: "#F4F1EA", ac: "#FF5A36", f: F.arch, w: 800, deco: "big" } },
  { id: "Retro", d: "70s colours, rounded type, warm nostalgia.", look: { bg: "#F4E3C1", ink: "#3B2314", ac: "#E07A2E", f: F.dm, w: 400, deco: "sun" } },
  { id: "Y2K", d: "Chrome, holographic pastels and stickers.", look: { bg: "#ECE8FF", ink: "#1A1440", ac: "#FF4FD8", f: F.unb, w: 800, deco: "chrome" } },
  { id: "Glassmorphism", d: "Frosted glass panels over soft colour.", look: { bg: "#6E7BFF", ink: "#FFFFFF", ac: "#FF9AC6", f: F.geist, w: 600, deco: "glass" } },
  { id: "Neon / Dark mode", d: "Night colours with glowing accents.", look: { bg: "#0A0A12", ink: "#E8E8FF", ac: "#39FF88", f: F.syne, w: 800, deco: "glow" } },
  { id: "Organic", d: "Soft shapes, earthy greens, natural textures.", look: { bg: "#EEF0E4", ink: "#26331F", ac: "#7A8F4E", f: F.serif, w: 500, deco: "blob" } },
  { id: "Playful", d: "Bright, bouncy, friendly and fun.", look: { bg: "#FFE3EC", ink: "#4A1730", ac: "#E8366E", f: F.fred, w: 700, deco: "dots" } },
  { id: "Corporate", d: "Clear, trustworthy and easy to scan.", look: { bg: "#F5F8FB", ink: "#0F2B46", ac: "#1F6FEB", f: F.brico, w: 600, deco: "bars" } },
  { id: "Bento grid", d: "Everything in neat tiles of different sizes.", look: { bg: "#F2F2F0", ink: "#141414", ac: "#6E56CF", f: F.brico, w: 600, deco: "bento" } },
  { id: "Gradient", d: "Soft colour gradients and glowing light.", look: { bg: "#0B0B1E", ink: "#FFFFFF", ac: "#8B5CF6", f: F.brico, w: 600, deco: "aurora" } },
  { id: "Cinematic", d: "Full-screen photos and film-like drama.", look: { bg: "#111111", ink: "#FFFFFF", ac: "#FFFFFF", f: F.bebas, w: 400, deco: "photo" } },
  { id: "Scandinavian", d: "Calm neutrals, natural light, honest materials.", look: { bg: "#F4F1EC", ink: "#2B2B2B", ac: "#B9A58B", f: F.dm, w: 400, deco: "arch" } },
  { id: "Art Deco", d: "Gold lines, symmetry and 1920s glamour.", look: { bg: "#0F1A24", ink: "#E8D8A8", ac: "#C9A44C", f: F.ital, w: 400, deco: "deco" } },
  { id: "Maximalist", d: "More is more: clashing colour and collage.", look: { bg: "#FF6B35", ink: "#1A0F4D", ac: "#7CFFCB", f: F.syne, w: 800, deco: "clash" } },
  { id: "Futuristic", d: "Sci-fi glow, 3D depth and motion.", look: { bg: "#050816", ink: "#CFE3FF", ac: "#5CE1E6", f: F.unb, w: 700, deco: "orb" } },
];
const STYLE_IDS = DESIGN_STYLES.map(s => s.id);
const styleTile = (st, extra = "") => {
  const l = st.look;
  return `<span class="stile stile--${l.deco}" style="--sb:${l.bg};--si:${l.ink};--sa:${l.ac};--sf:${l.f};--sw:${l.w}" aria-hidden="true">${extra}<b>Aa</b><i></i></span>`;
};

/* ---------------- Four layouts for the missing styles ---------------- */
Object.assign(LAYOUTS, {
  /* Y2K: holographic pastel, chrome type, stickers, pill frames */
  y2k: s => `
    <div class="y2-marq"><div>${Array(2).fill((s.ticker || ["New drop", "Free shipping", "Limited run"]).map(t => `<span>${t}</span><span>✦</span>`).join("")).join("")}</div></div>
    <div class="m-in" id="top">${nav(s)}</div>
    <header class="m-in y2-hero">
      <span class="y2-stk y2-stk--a">${s.sticker || "✦ New"}</span><span class="y2-stk y2-stk--b">★ ${s.sticker2 || "Made in NL"}</span>
      <h1 class="y2-h">${s.headline}</h1>
      <p class="m-lead">${s.sub}</p>
      <div class="m-acts"><a class="m-btn" data-demo>${s.cta}</a><a class="m-btn o" data-goto="s1">${(s.nav || ["See more"])[0]}</a></div>
      <div class="y2-pills">${[0, 1, 2].map(i => `<div class="y2-pill y2-pill--${i}">${A(s, i)}</div>`).join("")}</div>
    </header>
    <section class="m-sec" id="s1"><div class="m-in"><h2 class="y2-h2">${s.h2 || "The drop"}</h2>
      <div class="y2-grid">${s.items.slice(0, 4).map((it, i) => `<a class="y2-card" data-demo>${A(s, i + 3, "aspect-ratio:4/5")}<span class="y2-price">${it[2] || "€" + (29 + i * 10)}</span><b>${it[0]}</b><small>${it[1]}</small></a>`).join("")}</div></div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in y2-band"><h2 class="y2-h2">${s.band}</h2><div class="m-form"><input placeholder="Your email" aria-label="Email"><a class="m-btn" data-demo>Get early access</a></div></div></section>
    <section id="s3"></section>${foot(s)}`,

  /* Glassmorphism: frosted panels floating over soft moving colour */
  glass: s => `
    <div class="gl-bg" aria-hidden="true"><i></i><i></i><i></i></div>
    <div class="m-in" id="top"><div class="gl-nav">${nav(s)}</div></div>
    <header class="m-in gl-hero">
      <div><span class="gl-chip">${s.kicker}</span><h1 class="m-h1">${s.headline}</h1><p class="m-lead">${s.sub}</p>
        <div class="m-acts"><a class="m-btn" data-demo>${s.cta}</a><a class="m-btn o" data-goto="s1">See how it works</a></div></div>
      <div class="gl-stack">
        <div class="gl-card gl-main"><small>${s.stat1 ? s.stat1[1] : "This month"}</small><b>${s.stat1 ? s.stat1[0] : "€1,240"}</b>
          <div class="gl-bars">${[38, 64, 48, 82, 56, 92, 74].map(h => `<i style="height:${h}%"></i>`).join("")}</div></div>
        <div class="gl-card gl-mini gl-mini--a"><span class="gl-dot"></span><div><b>${s.items[0][0]}</b><small>${s.items[0][1]}</small></div></div>
        <div class="gl-card gl-mini gl-mini--b"><span class="gl-dot b"></span><div><b>${s.items[1][0]}</b><small>${s.items[1][1]}</small></div></div>
      </div>
    </header>
    <section class="m-sec" id="s1"><div class="m-in"><h2 class="m-h2" style="text-align:center">${s.h2 || "Everything in one calm place"}</h2>
      <div class="gl-three">${s.items.slice(0, 3).map((it, i) => `<div class="gl-card"><span class="gl-ico">${["◐", "◇", "✧"][i]}</span><h3>${it[0]}</h3><p>${it[1]}</p></div>`).join("")}</div></div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in"><div class="gl-card gl-cta"><h2 class="m-h2">${s.band}</h2><a class="m-btn" data-demo>${s.cta}</a></div></div></section>
    <section id="s3"></section>${foot(s)}`,

  /* Art Deco: symmetry, gold lines, sunburst, arched photo window */
  deco: s => `
    <div class="dk-frame">
    <div class="m-in dk-nav" id="top">${linkNav(s)}<a class="dk-logo" data-goto="top">${s.name}</a><a class="dk-btn" data-demo>${s.cta}</a></div>
    <header class="dk-hero">
      <div class="dk-sun" aria-hidden="true"></div>
      <span class="dk-kick">${s.kicker}</span>
      <h1>${s.headline}</h1>
      <div class="dk-arch">${A(s, 0)}</div>
      <p class="dk-sub">${s.sub}</p>
      <a class="dk-btn" data-demo>${s.cta}</a>
    </header>
    <div class="dk-rule" aria-hidden="true"><i></i><span>◆</span><i></i></div>
    <section class="m-sec" id="s1"><div class="m-in dk-prog"><h2>${s.h2 || "This season"}</h2>
      ${s.items.map((it, i) => `<a class="dk-row" data-demo><span>${it[2] || ["Fri 14", "Sat 15", "Thu 20", "Fri 21", "Sat 22"][i % 5]}</span><b>${it[0]}</b><i></i><em>${it[1]}</em></a>`).join("")}
    </div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in dk-two">${[1, 2].map(i => `<div class="dk-pic">${A(s, i, "aspect-ratio:3/4")}</div>`).join("")}<div class="dk-txt"><h2>${s.band}</h2><p>${s.aboutText || s.sub}</p><a class="dk-btn" data-demo>Reserve a table</a></div></div></section>
    <section id="s3"></section>${foot(s)}
    </div>`,

  /* Maximalist: clashing colour blocks, collage, many type voices */
  maximal: s => `
    <div class="m-in" id="top">${nav(s)}</div>
    <header class="mx-hero">
      <h1 class="mx-h"><span>${s.headline.split("|")[0]}</span><em>${s.headline.split("|")[1] || ""}</em><span>${s.headline.split("|")[2] || ""}</span></h1>
      <div class="mx-collage">${[0, 1, 2, 3].map(i => `<div class="mx-ph mx-ph--${i}">${A(s, i)}</div>`).join("")}<span class="mx-stk">${s.sticker || "Open now!"}</span></div>
      <p class="mx-sub">${s.sub}</p>
      <div class="m-acts"><a class="m-btn" data-demo>${s.cta}</a></div>
    </header>
    <div class="mx-marq"><div>${Array(2).fill(s.items.map(t => `<span>${t[0]}</span><span>✺</span>`).join("")).join("")}</div></div>
    <section class="m-sec mx-blocks" id="s1"><div class="m-in mx-grid">${s.items.slice(0, 4).map((it, i) => `<a class="mx-card mx-card--${i}" data-demo><small>No. ${i + 1}</small><b>${it[0]}</b><p>${it[1]}</p>${A(s, i + 4, "aspect-ratio:1")}</a>`).join("")}</div></section>
    <section class="m-sec mx-end" id="s2"><div class="m-in"><h2 class="mx-h2">${s.band}</h2><a class="m-btn" data-demo>${s.cta}</a></div></section>
    <section id="s3"></section>${foot(s)}`,
});
Object.assign(LAYOUT_LABEL, { y2k: "Y2K", glass: "Glassmorphism", deco: "Art Deco", maximal: "Maximalist" });

(function injectStyleCSS() {
  const css = `
  /* y2k */
  .l-y2k{background:radial-gradient(60% 40% at 15% 10%,#FFD6F5 0,transparent 70%),radial-gradient(50% 40% at 90% 20%,#C9F1FF 0,transparent 70%),radial-gradient(60% 50% at 50% 100%,#E3D6FF 0,transparent 70%),var(--bg)}
  .l-y2k .y2-marq{background:var(--ink);color:var(--bg);overflow:hidden;font-family:var(--head);font-size:12px;letter-spacing:.08em;text-transform:uppercase;padding:8px 0;white-space:nowrap}
  .l-y2k .y2-marq>div{display:inline-flex;gap:22px;animation:mmarq 22s linear infinite}
  @keyframes mmarq{to{transform:translateX(-50%)}}
  .l-y2k .y2-hero{position:relative;text-align:center;display:grid;justify-items:center;padding-block:clamp(40px,6cqi,80px) 0}
  .l-y2k .y2-h{font-family:var(--head);font-weight:800;font-size:clamp(46px,8.6cqi,132px);line-height:.9;letter-spacing:-.04em;text-transform:uppercase;max-width:12ch;background:linear-gradient(180deg,#FFFFFF 0%,#B9B4D8 38%,#4A3F8C 52%,#E7E2FF 64%,#8A80C7 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 2px 0 var(--ink)) drop-shadow(0 10px 24px rgba(74,63,140,.35))}
  .l-y2k .m-lead{margin-inline:auto}
  .l-y2k .m-acts{justify-content:center}
  .l-y2k .m-btn{background:linear-gradient(90deg,var(--btn),var(--accent));border-radius:99px;box-shadow:0 8px 24px rgba(255,79,216,.35)}
  .l-y2k .y2-stk{position:absolute;font-family:var(--head);font-size:13px;font-weight:800;padding:10px 16px;border-radius:99px;background:var(--accent);color:#fff;box-shadow:3px 3px 0 var(--ink);z-index:2}
  .l-y2k .y2-stk--a{left:5%;top:4%;rotate:-12deg}.l-y2k .y2-stk--b{right:5%;top:42%;rotate:9deg;background:#C9F1FF;color:var(--ink)}
  .l-y2k .y2-pills{display:flex;gap:16px;justify-content:center;margin-top:clamp(36px,5cqi,64px);width:100%}
  .l-y2k .y2-pill{width:min(30%,300px);aspect-ratio:3/4.4;border-radius:999px;padding:6px;background:conic-gradient(from 90deg,#FFB8F0,#B8F3FF,#D9C2FF,#FFF4B8,#FFB8F0)}
  .l-y2k .y2-pill .m-art{height:100%;border-radius:999px}
  .l-y2k .y2-pill--1{translate:0 -28px}
  .l-y2k .y2-h2{font-family:var(--head);font-size:clamp(30px,4.4cqi,60px);text-transform:uppercase;letter-spacing:-.03em;margin-bottom:24px}
  .l-y2k .y2-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  .l-y2k .y2-card{position:relative;display:grid;gap:4px;background:rgba(255,255,255,.6);border:2px solid var(--ink);border-radius:26px;padding:10px 10px 16px;box-shadow:5px 5px 0 var(--ink);cursor:pointer;transition:transform .3s}
  .l-y2k .y2-card:hover{transform:translate(-3px,-3px) rotate(-1deg)}
  .l-y2k .y2-card .m-art{border-radius:18px;margin-bottom:8px}.l-y2k .y2-card small{color:var(--muted)}
  .l-y2k .y2-price{position:absolute;top:18px;right:18px;background:#FFF4B8;border:2px solid var(--ink);border-radius:99px;padding:4px 10px;font-weight:800;font-size:13px;rotate:8deg}
  .l-y2k .y2-band{display:grid;grid-template-columns:1.2fr 1fr;gap:24px;align-items:center;background:var(--ink);color:#fff;border-radius:32px;padding:clamp(28px,4cqi,56px)}
  .l-y2k .y2-band .y2-h2{margin:0;background:linear-gradient(90deg,#FFB8F0,#B8F3FF,#FFF4B8);-webkit-background-clip:text;background-clip:text;color:transparent}
  @container (max-width:640px){.l-y2k .y2-grid{grid-template-columns:1fr 1fr}.l-y2k .y2-band{grid-template-columns:1fr}.l-y2k .y2-stk--b{display:none}.l-y2k .y2-pill--2{display:none}.l-y2k .y2-pill{width:42%}}

  /* glass */
  .l-glass{position:relative;overflow:hidden;background:var(--bg)}
  .l-glass .gl-bg{position:absolute;inset:0;pointer-events:none}
  .l-glass .gl-bg i{position:absolute;border-radius:50%;filter:blur(60px);opacity:.85;animation:gldrift 18s ease-in-out infinite alternate}
  .l-glass .gl-bg i:nth-child(1){width:46%;aspect-ratio:1;left:-8%;top:-6%;background:var(--accent)}
  .l-glass .gl-bg i:nth-child(2){width:40%;aspect-ratio:1;right:-6%;top:8%;background:var(--btn);animation-delay:-6s}
  .l-glass .gl-bg i:nth-child(3){width:50%;aspect-ratio:1;left:30%;top:42%;background:var(--surface2);animation-delay:-11s}
  @keyframes gldrift{to{transform:translate(8%,10%) scale(1.15)}}
  .l-glass>*:not(.gl-bg){position:relative}
  .l-glass .gl-card{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.35);backdrop-filter:blur(22px) saturate(1.4);-webkit-backdrop-filter:blur(22px) saturate(1.4);border-radius:calc(var(--r2) * 1.4);padding:clamp(20px,2.4cqi,28px);box-shadow:0 20px 50px rgba(20,10,60,.18),inset 0 1px 0 rgba(255,255,255,.4)}
  .l-glass .gl-chip{display:inline-block;padding:7px 14px;border-radius:99px;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.35);font-size:13px;backdrop-filter:blur(10px);margin-bottom:18px}
  .l-glass .m-btn{background:#fff;color:#1B1340}
  .l-glass .m-btn.o{background:rgba(255,255,255,.12);color:var(--ink);box-shadow:inset 0 0 0 1px rgba(255,255,255,.4)}
  .l-glass .m-lead{color:var(--muted)}
  .l-glass .gl-hero{display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(24px,5cqi,64px);align-items:center;padding-block:clamp(32px,6cqi,88px)}
  .l-glass .gl-stack{position:relative;min-height:clamp(320px,36cqi,440px)}
  .l-glass .gl-main{position:absolute;inset:6% 8% 14% 4%;display:grid;align-content:start;gap:6px}
  .l-glass .gl-main small{color:var(--muted)}.l-glass .gl-main b{font-family:var(--head);font-size:clamp(36px,5cqi,64px);letter-spacing:-.03em}
  .l-glass .gl-bars{display:flex;align-items:end;gap:8px;height:clamp(100px,14cqi,170px);margin-top:16px}
  .l-glass .gl-bars i{flex:1;border-radius:8px;background:linear-gradient(180deg,rgba(255,255,255,.9),rgba(255,255,255,.25))}
  .l-glass .gl-mini{position:absolute;display:flex;gap:12px;align-items:center;padding:14px 18px;font-size:13px;animation:glfloat 6s ease-in-out infinite}
  .l-glass .gl-mini small{display:block;color:var(--muted)}
  .l-glass .gl-mini--a{right:-2%;top:-2%}.l-glass .gl-mini--b{left:-4%;bottom:0;animation-delay:-3s}
  .l-glass .gl-dot{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#fff,var(--accent));flex:none}.l-glass .gl-dot.b{background:linear-gradient(135deg,#fff,var(--btn))}
  .l-glass .gl-three{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px}
  .l-glass .gl-three h3{margin:14px 0 6px;font-size:20px}.l-glass .gl-three p{color:var(--muted);font-size:14.5px}
  .l-glass .gl-ico{font-size:26px}
  .l-glass .gl-cta{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;padding:clamp(28px,4cqi,56px)}
  .l-glass .m-foot{border-color:rgba(255,255,255,.2)}
  @keyframes glfloat{50%{transform:translateY(-10px)}}
  @container (max-width:640px){.l-glass .gl-hero,.l-glass .gl-three{grid-template-columns:1fr}.l-glass .gl-mini--b{display:none}}

  /* deco */
  .l-deco{background:var(--bg)}
  .l-deco .dk-frame{margin:14px;border:1px solid var(--accent);outline:1px solid color-mix(in srgb,var(--accent) 45%,transparent);outline-offset:-8px}
  .l-deco .dk-nav{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:22px 0}
  .l-deco .dk-nav .m-links{font-size:11px;letter-spacing:.24em;text-transform:uppercase}
  .l-deco .dk-logo{font-family:var(--head);font-size:clamp(20px,2.2cqi,28px);letter-spacing:.3em;text-transform:uppercase;color:var(--accent);cursor:pointer}
  .l-deco .dk-btn{justify-self:end;display:inline-block;font-size:11px;letter-spacing:.24em;text-transform:uppercase;padding:12px 22px;border:1px solid var(--accent);color:var(--accent);cursor:pointer;position:relative}
  .l-deco .dk-btn::after{content:"";position:absolute;inset:3px;border:1px solid color-mix(in srgb,var(--accent) 40%,transparent);pointer-events:none}
  .l-deco .dk-hero{position:relative;overflow:hidden;text-align:center;display:grid;justify-items:center;gap:18px;padding:clamp(40px,6cqi,80px) 24px clamp(48px,6cqi,88px)}
  .l-deco .dk-sun{position:absolute;left:50%;top:44%;width:180%;aspect-ratio:1;translate:-50% -50%;background:repeating-conic-gradient(from 0deg,color-mix(in srgb,var(--accent) 22%,transparent) 0 1.2deg,transparent 1.2deg 9deg);mask:radial-gradient(circle,#000 18%,transparent 52%);-webkit-mask:radial-gradient(circle,#000 18%,transparent 52%);pointer-events:none}
  .l-deco .dk-kick{position:relative;font-size:11px;letter-spacing:.4em;text-transform:uppercase;color:var(--accent)}
  .l-deco .dk-hero h1{position:relative;font-family:var(--head);font-weight:400;font-size:clamp(40px,6.6cqi,100px);line-height:1;letter-spacing:.04em;text-transform:uppercase;max-width:14ch}
  .l-deco .dk-arch{position:relative;width:min(56%,420px);aspect-ratio:3/4;padding:8px;border:1px solid var(--accent);border-radius:999px 999px 0 0}
  .l-deco .dk-arch .m-art{height:100%;border-radius:999px 999px 0 0;filter:sepia(.25) contrast(1.05)}
  .l-deco .dk-sub{position:relative;max-width:46ch;color:var(--muted)}
  .l-deco .dk-hero .dk-btn{justify-self:center}
  .l-deco .dk-rule{display:flex;align-items:center;gap:18px;color:var(--accent);width:min(100% - 48px,760px);margin:0 auto}
  .l-deco .dk-rule i{flex:1;height:1px;background:linear-gradient(90deg,transparent,var(--accent),transparent)}
  .l-deco .dk-prog{max-width:820px}
  .l-deco .dk-prog h2,.l-deco .dk-txt h2{font-family:var(--head);font-weight:400;font-size:clamp(30px,4cqi,52px);text-align:center;letter-spacing:.06em;text-transform:uppercase;margin-bottom:28px;color:var(--accent)}
  .l-deco .dk-row{display:grid;grid-template-columns:90px auto 1fr auto;align-items:baseline;gap:16px;padding:18px 0;border-bottom:1px solid color-mix(in srgb,var(--accent) 30%,transparent);cursor:pointer}
  .l-deco .dk-row span{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent)}
  .l-deco .dk-row b{font-family:var(--head);font-weight:400;font-size:clamp(20px,2.4cqi,28px)}
  .l-deco .dk-row i{border-bottom:1px dotted color-mix(in srgb,var(--accent) 60%,transparent);translate:0 -6px}
  .l-deco .dk-row em{font-style:normal;color:var(--muted);font-size:14px}
  .l-deco .dk-two{display:grid;grid-template-columns:1fr 1fr 1.2fr;gap:18px;align-items:center}
  .l-deco .dk-pic{padding:6px;border:1px solid var(--accent)}.l-deco .dk-pic .m-art{border-radius:0;filter:sepia(.2)}
  .l-deco .dk-txt{text-align:center;display:grid;justify-items:center;gap:16px}.l-deco .dk-txt h2{margin:0}.l-deco .dk-txt p{color:var(--muted)}
  .l-deco .m-foot{border-color:color-mix(in srgb,var(--accent) 30%,transparent);width:min(100% - 48px,1160px)}
  @container (max-width:640px){.l-deco .dk-nav{grid-template-columns:1fr auto}.l-deco .dk-nav .m-links{display:none}.l-deco .dk-two{grid-template-columns:1fr 1fr}.l-deco .dk-txt{grid-column:1/-1}.l-deco .dk-row{grid-template-columns:70px 1fr}.l-deco .dk-row i,.l-deco .dk-row em{display:none}.l-deco .dk-arch{width:78%}}

  /* maximal */
  .l-maximal{background:var(--bg)}
  .l-maximal .mx-hero{position:relative;padding:clamp(24px,4cqi,56px) clamp(24px,4cqi,56px) clamp(48px,6cqi,96px);display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:clamp(20px,3cqi,40px);align-items:center}
  .l-maximal .mx-h{font-family:var(--head);font-weight:800;font-size:clamp(44px,6.4cqi,108px);line-height:.88;letter-spacing:-.05em;text-transform:uppercase;grid-row:span 2}
  .l-maximal .mx-h span{display:block}
  .l-maximal .mx-h em{display:block;font-family:${F.play};font-style:italic;font-weight:500;text-transform:none;letter-spacing:-.03em;color:var(--surface);-webkit-text-stroke:2px var(--ink);paint-order:stroke fill}
  .l-maximal .mx-h span:last-child{color:var(--accent);-webkit-text-stroke:2px var(--ink);paint-order:stroke fill}
  .l-maximal .mx-collage{position:relative;aspect-ratio:1}
  .l-maximal .mx-ph{position:absolute;border:4px solid var(--ink);box-shadow:8px 8px 0 var(--ink);background:var(--surface)}
  .l-maximal .mx-ph .m-art{width:100%;height:100%;border-radius:0}
  .l-maximal .mx-ph--0{inset:0 32% 38% 0;rotate:-5deg}
  .l-maximal .mx-ph--1{inset:8% 0 46% 46%;rotate:6deg;border-radius:50%;overflow:hidden}.l-maximal .mx-ph--1 .m-art{border-radius:50%}
  .l-maximal .mx-ph--2{inset:52% 40% 0 6%;rotate:4deg}
  .l-maximal .mx-ph--3{inset:58% 4% 4% 54%;rotate:-8deg;border-radius:40px;overflow:hidden}
  .l-maximal .mx-stk{position:absolute;left:44%;top:40%;width:110px;aspect-ratio:1;border-radius:50%;background:var(--accent);border:3px solid var(--ink);display:grid;place-items:center;text-align:center;font-family:${F.mono};font-weight:700;font-size:13px;rotate:-14deg;z-index:3;padding:10px;animation:mxspin 14s linear infinite}
  @keyframes mxspin{to{rotate:346deg}}
  .l-maximal .mx-sub{font-family:${F.mono};font-size:15px;max-width:40ch;background:#fff;color:#14102E;border:3px solid var(--ink);padding:16px;box-shadow:6px 6px 0 var(--ink)}
  .l-maximal .m-btn{border:3px solid var(--ink);box-shadow:5px 5px 0 var(--ink);border-radius:99px;background:var(--accent);color:var(--ink)}
  .l-maximal .mx-marq{background:var(--ink);color:var(--accent);overflow:hidden;white-space:nowrap;padding:16px 0;rotate:-1.5deg;margin-inline:-10px}
  .l-maximal .mx-marq>div{display:inline-flex;gap:28px;font-family:var(--head);font-weight:800;font-size:clamp(28px,4cqi,56px);text-transform:uppercase;animation:mmarq 18s linear infinite}
  .l-maximal .mx-blocks{background:var(--surface2)}
  .l-maximal .mx-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
  .l-maximal .mx-card{display:grid;gap:6px;align-content:start;padding:18px;border:3px solid var(--ink);box-shadow:6px 6px 0 var(--ink);cursor:pointer;transition:transform .3s}
  .l-maximal .mx-card:hover{transform:rotate(-2deg) scale(1.02)}
  .l-maximal .mx-card--0{background:#FFE14D}.l-maximal .mx-card--1{background:#7CFFCB;rotate:2deg}.l-maximal .mx-card--2{background:#FF8FD1;rotate:-2deg}.l-maximal .mx-card--3{background:#8FB8FF}
  .l-maximal .mx-card small{font-family:${F.mono}}.l-maximal .mx-card b{font-family:var(--head);font-size:24px;text-transform:uppercase;line-height:1}
  .l-maximal .mx-card p{font-size:14px}.l-maximal .mx-card .m-art{margin-top:8px;border:3px solid var(--ink);border-radius:0}
  .l-maximal .mx-card,.l-maximal .mx-card *{color:#1A0F4D}
  .l-maximal .mx-end{text-align:center}.l-maximal .mx-end .m-in{display:grid;justify-items:center;gap:24px}
  .l-maximal .mx-h2{font-family:${F.play};font-style:italic;font-size:clamp(40px,6cqi,96px);line-height:1}
  @container (max-width:640px){.l-maximal .mx-hero{grid-template-columns:1fr}.l-maximal .mx-h{grid-row:auto}.l-maximal .mx-grid{grid-template-columns:1fr 1fr}}
  `;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
})();

/* ---------------- Photos and data for the eight new concepts ---------------- */
Object.assign(PHOTOS, {
  cyber: ["1515886657613-9f3515b0c78f", "1760724850043-43eefff20a2a", "1776197826268-5b24de887c1e", "1758676171646-14da2df79b9a", "1758552319091-b4ab68fa03bb", "1761979680036-38a7f85b2f0b", "1761637460995-b29b51a79a34"],
  nails: ["1604654894610-df63bc536371", "1769687209448-025548dfca8b", "1758178309407-6562d1687b01", "1777287216954-2b4b22bb6bf2", "1612887390768-fb02affea7a6", "1632345031435-8727f6897d53", "1619607146034-5a05296c8f9a"],
  gilded: ["1415201364774-f6f0bb35f28f", "1511192336575-5a79af67a629", "1503853585905-d53f628e46ac", "1541804627596-3b5b9ef58c93", "1635520356736-90cb46f73413", "1781446989517-89a3c18b1b29"],
  rialto: ["1615414047026-802692414b79", "1615414046634-7c9065f516c3", "1615414046522-8a61c8f14cbb", "1615414046707-3d7d91938aa4", "1615414046635-0d5051bad7fb"],
  kaleido: ["1765494958654-2b47df2e887d", "1765495218245-43737a8ffc94", "1786524725236-8b0bed77122e", "1771098206724-8cf3018e2d90", "1788202889653-d0e0a1db0dd8", "1771355467801-4a4be5bbd8a9", "1765494958654-2b47df2e887d", "1786524725236-8b0bed77122e"],
  fiesta: ["1552912470-ee2e96439539", "1728364283053-b1e2abe71611", "1612687286248-9811801bd618", "1763703396043-cc821fcc4bc2", "1742391355474-e765ee5f510e", "1662714212039-061a2c146f65", "1628532429788-c35922b5e6c1", "1545504573-edac76c6a487"],
});
SITES.push(
  { id: "cyber", name: "Cyber Bloom", industry: "Streetwear brand", group: "Retail & shops", style: "Y2K", pk: "Business", layout: "y2k", anim: "float", cx: "Rich", c: C("#ECE8FF", "#FFFFFF", "#1A1440", "#5B5290", "#1A1440", "#FFFFFF", "#FF4FD8", "#D9F4FF"), head: F.unb, body: F.geist, hw: 800, radius: 22, arts: ["mesh"], ticker: ["Drop 07 is live", "Free shipping over €75", "Restock Friday"], sticker: "✦ Drop 07", sticker2: "Made in NL", headline: "Dress like the future", sub: "Small-run streetwear with chrome prints and holographic trims. When it’s gone, it’s gone.", cta: "Shop the drop", nav: ["Shop", "Lookbook", "About"], h2: "The drop", items: [["Chrome tee", "Heavy cotton, oversized", "€45"], ["Holo cargo", "Six pockets, reflective", "€89"], ["Baby tee", "Rib knit, cropped", "€35"], ["Star cap", "Embroidered, adjustable", "€32"]], band: "Get the next drop first." },
  { id: "nails", name: "Gloss Club", industry: "Nail studio", group: "Beauty & personal care", style: "Y2K", pk: "Essential", layout: "y2k", anim: "bounce", cx: "Balanced", c: C("#FFE9F6", "#FFFFFF", "#3A0B32", "#86507A", "#3A0B32", "#FFFFFF", "#FF5CC8", "#FFF4B8"), head: F.unb, body: F.nunito, hw: 800, radius: 22, arts: ["dots"], ticker: ["Chrome nails", "Gel & BIAB", "Walk-ins Saturday"], sticker: "✦ Chrome sets", sticker2: "Vegan polish", headline: "Nails with main character energy", sub: "Chrome, airbrush and hand-painted art in Rotterdam. Book in 30 seconds.", cta: "Book a set", nav: ["Sets", "Prices", "Book"], h2: "Fan favourites", items: [["Chrome glaze", "Mirror finish", "€45"], ["Airbrush", "Soft gradient", "€50"], ["Hand-painted", "Your idea, our brush", "€60"], ["BIAB refill", "Strong and natural", "€40"]], band: "New sets every Friday." },
  { id: "nimbus", name: "Nimbus Home", industry: "Smart home app", group: "Tech & apps", style: "Glassmorphism", pk: "Business", layout: "glass", anim: "float", cx: "Balanced", c: C("#5B5BD6", "#7A7AE8", "#FFFFFF", "#E2E1FF", "#FFFFFF", "#1B1340", "#FF8FC7", "#62D8F5"), head: F.brico, body: F.geist, hw: 600, radius: 18, arts: ["mesh"], kicker: "Works with 1,200 devices", headline: "Your home, finally in one calm app.", sub: "Lights, heating and locks in one place, with routines that just run in the background.", cta: "Download free", stat1: ["21.5°", "Living room"], items: [["Morning routine", "Lights on at 7:00"], ["Heating", "Saving 18% this month"], ["Locks", "All doors locked"]], band: "Set up in five minutes." },
  { id: "floatly", name: "Floatly", industry: "Savings app", group: "Tech & apps", style: "Glassmorphism", pk: "Signature", layout: "glass", anim: "float", cx: "Rich", c: C("#0E2A3A", "#173E52", "#F2FBFF", "#A9C9D6", "#5EF2C4", "#0E2A3A", "#3BA7FF", "#7C5CFF"), head: F.syne, body: F.geist, hw: 700, radius: 20, arts: ["mesh"], kicker: "Licensed savings partner", headline: "Savings that float up on their own.", sub: "Round up every payment and watch small change grow into real goals.", cta: "Start saving", stat1: ["€1,240", "Saved this year"], items: [["Round-ups", "Every payment, rounded"], ["Goals", "Trip to Lisbon: 72%"], ["Insights", "Where your money goes"]], band: "No fees. Leave any time." },
  { id: "gilded", name: "The Gilded Hour", industry: "Jazz club", group: "Events & nightlife", style: "Art Deco", pk: "Signature", layout: "deco", anim: "zoom", cx: "Rich", c: C("#0F1A24", "#162533", "#F1E6C8", "#B8AD8E", "#C9A44C", "#0F1A24", "#C9A44C", "#1D2E3E"), head: F.ital, body: F.geist, hw: 400, radius: 0, arts: ["blinds"], kicker: "Live jazz since 1928", headline: "An evening worth dressing up for.", sub: "Live jazz six nights a week, classic cocktails and a dining room that never left the twenties.", cta: "Book a table", nav: ["Programme", "Menu", "Private hire"], h2: "This week", items: [["Lena Vos Quartet", "Vocal jazz, 21:00"], ["Late Night Swing", "Big band, 22:30"], ["The Blue Hours", "Piano trio, 20:30"], ["Jam Session", "Open stage, 23:00"]], band: "Dinner and a show", aboutText: "Three courses, a reserved table near the stage and a cocktail on arrival. From €79 per person." },
  { id: "rialto", name: "Rialto Theatre", industry: "Theatre", group: "Events & nightlife", style: "Art Deco", pk: "Business", layout: "deco", anim: "rise", cx: "Balanced", c: C("#1E0F12", "#2A161A", "#F4E9DA", "#BFA99A", "#D6AE5C", "#1E0F12", "#D6AE5C", "#3A1E24"), head: F.ital, body: F.geist, hw: 400, radius: 0, arts: ["blinds"], kicker: "Restored 1929 playhouse", headline: "The curtain rises at eight.", sub: "Plays, musicals and comedy in a lovingly restored theatre with 640 velvet seats.", cta: "Buy tickets", nav: ["What’s on", "Visit", "Support us"], h2: "Now playing", items: [["The Lighthouse", "Drama", "Sep 4–20"], ["Swing Street", "Musical", "Oct 1–26"], ["Late Laughs", "Stand-up", "Every Fri"], ["Nutcracker", "Ballet", "Dec 12–30"]], band: "Become a friend of the Rialto", aboutText: "Members get early booking, the best seats and a drink in the circle bar." },
  { id: "kaleido", name: "Kaleido Market", industry: "Concept store", group: "Retail & shops", style: "Maximalist", pk: "Business", layout: "maximal", anim: "tilt", cx: "Rich", c: C("#FF6B35", "#FFF3E0", "#1A0F4D", "#3B2F78", "#1A0F4D", "#FFFFFF", "#7CFFCB", "#FFD23F"), head: F.syne, body: F.geist, hw: 800, radius: 0, arts: ["dots"], sticker: "200+ makers", headline: "Too much|is just|enough", sub: "A colourful concept store full of independent makers: ceramics, prints, toys and things you didn’t know you needed.", cta: "Visit the shop", nav: ["Shop", "Makers", "Visit"], items: [["Ceramics", "Hand-thrown, one of a kind"], ["Prints", "Risograph and screen"], ["Toys", "Wooden and wonderful"], ["Plants", "Weird and wonderful ones"]], band: "Open every day, 10 till 6." },
  { id: "fiesta", name: "Hungry Streets", industry: "Street food festival", group: "Food & drink", style: "Maximalist", pk: "Essential", layout: "maximal", anim: "bounce", cx: "Rich", c: C("#2B1DFF", "#FFFFFF", "#FFF35C", "#FFE7A8", "#FFF35C", "#2B1DFF", "#FF4F7B", "#FF8A3D"), head: F.unb, body: F.geist, hw: 800, radius: 0, arts: ["cone"], sticker: "Free entry!", headline: "Eat|loud|together", sub: "Forty food trucks, three stages and long tables under the lights. Four weekends this summer.", cta: "See the line-up", nav: ["Food", "Music", "Tickets"], items: [["Tacos", "Six trucks"], ["Noodles", "Hand-pulled"], ["Dumplings", "Steamed and fried"], ["Desserts", "Churros to mochi"]], band: "See you at the long tables." },
);

/* Every concept gets one of the 20 styles. */
const STYLE_OF = {
  fashion: "Editorial", restaurant: "Bold typography", sushi: "Minimalist", hotel: "Cinematic", finance: "Bento grid", realestate: "Corporate",
  beauty: "Scandinavian", fitness: "Cinematic", tech: "Futuristic", portfolio: "Minimalist", auto: "Cinematic", bakery: "Organic", dental: "Corporate",
  travel: "Organic", shop: "Scandinavian", construction: "Bold typography", legal: "Editorial", events: "Maximalist", interior: "Scandinavian",
  education: "Bento grid", cleaning: "Minimalist", personal: "Bold typography", architecture: "Minimalist", photo: "Minimalist", pets: "Playful",
  tattoo: "Brutalist", records: "Retro", agency: "Brutalist", gallery: "Swiss", museum: "Swiss", cinema: "Swiss", therapist: "Scandinavian",
  yoga: "Minimalist", translator: "Minimalist", quill: "Gradient", pocketly: "Gradient", fridge: "Playful", plumber: "Corporate", movers: "Corporate",
  garage: "Bold typography", icecream: "Playful", daycare: "Playful", tacos: "Playful", dance: "Bold typography", aurelia: "Luxury", winery: "Luxury",
  spa: "Luxury", barber: "Retro", podcast: "Editorial", charity: "Editorial", foodblog: "Editorial", florist: "Organic", venue: "Luxury",
  bnb: "Scandinavian", freight: "Corporate", hirehaven: "Corporate", shieldly: "Corporate", esports: "Neon / Dark mode", club: "Neon / Dark mode",
  arcade: "Futuristic", farm: "Organic", brewery: "Retro", garden: "Organic", solar: "Cinematic", cowork: "Minimalist", physio: "Scandinavian",
  vet: "Playful", pizza: "Bold typography", cocktail: "Art Deco", bikes: "Cinematic", skincare: "Scandinavian", books: "Editorial", audio: "Futuristic",
  lingo: "Bento grid", community: "Bento grid", driving: "Bold typography", climbing: "Cinematic",
};
SITES.forEach(s => { if (STYLE_OF[s.id]) s.style = STYLE_OF[s.id]; if (!STYLE_IDS.includes(s.style)) s.style = "Minimalist"; });
