/* =========================================================
   SiteQuest Studio showroom, part 2
   12 more layout families, per-site animation styles,
   and ~50 more fictional businesses across every category.
   ========================================================= */

Object.assign(F, {
  mono: "'Space Mono', monospace",
  fred: "'Fredoka', sans-serif",
  ital: "'Italiana', serif",
  unb: "'Unbounded', sans-serif",
  bebas: "'Bebas Neue', sans-serif",
});

const pad2 = i => String(i + 1).padStart(2, "0");
const wave = (fill, flip) => `<svg class="or-wave" viewBox="0 0 1200 70" preserveAspectRatio="none" aria-hidden="true" style="${flip ? "transform:scaleY(-1)" : ""}"><path d="M0 40 C 200 0 400 70 600 35 S 1000 0 1200 40 V70 H0Z" fill="${fill}"/></svg>`;

/* ---------------- New layouts ---------------- */
Object.assign(LAYOUTS, {
  brutal: s => `
    <div class="b-tick"><div>${Array(2).fill((s.ticker || s.items.map(i => i[0])).map(t => `<span>${t}</span><span>✶</span>`).join("")).join("")}</div></div>
    <div class="m-in" id="top">${nav(s)}
      <header class="b-hero"><h1 class="m-h1">${s.headline}</h1>
        <div class="b-row"><p class="m-lead">${s.sub}</p><div class="m-acts" style="margin:0"><a class="m-btn" data-demo>${s.cta}</a><a class="m-btn o" data-goto="s1">${(s.nav || [])[0] || "See more"}</a></div></div>
      </header></div>
    <section class="m-sec" id="s1" style="padding-top:0"><div class="m-in b-grid">
      ${s.items.slice(0, 5).map((it, i) => (i === 1 ? `<div class="b-art">${A(s, 0)}</div>` : "") + `<div data-demo><small>${pad2(i)}</small><b>${it[0]}</b><span>${it[1]}</span></div>`).join("")}
    </div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in b-box"><h2 class="m-h2">${s.band || "Walk-ins welcome."}</h2><div class="m-form"><input placeholder="Name" aria-label="Name"><input placeholder="Email" aria-label="Email"><a class="m-btn" data-demo>${s.cta}</a></div></div></section>
    <section id="s3"></section>${foot(s)}`,

  swiss: s => `
    <div class="m-in" id="top">${nav(s)}
      <header class="sw-hero"><div class="sw-big">${s.big || "01"}</div>
        <div class="sw-txt"><span class="m-kick">${s.kicker}</span><h1 class="m-h1">${s.headline}</h1><p class="m-lead">${s.sub}</p><div class="m-acts"><a class="m-btn" data-demo>${s.cta}</a></div></div>
        <div class="sw-vert">${s.name} / ${s.city || ""}</div></header>
    </div>
    <section class="m-sec" id="s1" style="padding-top:0"><div class="m-in sw-grid">${s.items.map((it, i) => `<div data-demo><i></i><small>${pad2(i)}</small><b>${it[0]}</b><span>${it[1]}</span></div>`).join("")}</div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in sw-feat">${A(s, 0)}<div class="sw-block"><h2 class="m-h2">${s.h2 || "Now showing"}</h2><p>${s.aboutText || s.sub}</p><a class="m-btn" data-demo>${s.cta}</a></div></div></section>
    <section id="s3"></section>${foot(s)}`,

  centered: s => `
    <div class="m-in ce" id="top">
      <nav class="m-nav ce-nav"><a data-goto="s1">${(s.nav || [])[0] || "About"}</a><a class="m-logo" data-goto="top">${s.name}</a><a data-goto="s3">${(s.nav || [])[2] || "Contact"}</a></nav>
      <header class="ce-hero"><div class="ce-mark">${A(s, 0)}</div><h1 class="m-h1">${s.headline}</h1><p class="m-lead">${s.sub}</p><a class="ce-link" data-demo>${s.cta}</a></header>
      <section class="m-sec" id="s1"><p class="ce-quote">${s.quote || s.sub}</p></section>
      <section class="m-sec" id="s2" style="padding-top:0"><div class="ce-list">${s.items.map(it => `<div><b>${it[0]}</b><span>${it[1]}</span></div>`).join("")}</div></section>
      <section class="m-sec" id="s3" style="padding-top:0"><span class="m-kick">Get in touch</span><p class="ce-contact">${s.contact}</p></section>
    </div>${foot(s)}`,

  app: s => `
    <div class="m-in" id="top">${nav(s)}
      <header class="ap-hero"><div><span class="m-badge">${s.kicker}</span><h1 class="m-h1" style="margin-top:18px">${s.headline}</h1><p class="m-lead">${s.sub}</p>
        <div class="m-acts"><a class="ap-store" data-demo><b></b><span><small>Download on the</small>App Store</span></a><a class="ap-store" data-demo><b></b><span><small>Get it on</small>Google Play</span></a></div></div>
        <div class="ap-phone"><div class="ap-screen"><div class="ap-top"><span>${s.screenTitle || "Today"}</span><i></i></div>
          ${(s.screen || s.items).slice(0, 4).map((it, i) => `<div class="ap-row"><em style="background:${[s.c.accent, s.c.btn, s.c.surface2, s.c.accent][i]}"></em><div><b>${it[0]}</b><span>${it[1]}</span></div></div>`).join("")}
          <div class="ap-bar">${[40, 70, 55, 90, 65, 80, 45].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join("")}</div></div></div>
      </header></div>
    <section class="m-sec" id="s1"><div class="m-in"><h2 class="m-h2" style="text-align:center;max-width:18ch;margin:0 auto 40px">${s.h2 || "Everything in one place."}</h2><div class="m-three">${s.items.slice(0, 3).map((it, i) => `<div class="m-card"><div class="ap-ic" style="background:${[s.c.accent, s.c.btn, s.c.surface2][i]}"></div><h3>${it[0]}</h3><p>${it[1]}</p></div>`).join("")}</div></div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in ap-price">${(s.tiers || [["Free", "€0", "For trying it out"], ["Pro", "€6/mo", "For everyday use"], ["Team", "€12/mo", "Per person"]]).map((t, i) => `<div class="m-card ${i === 1 ? "hi" : ""}"><span>${t[0]}</span><b>${t[1]}</b><p>${t[2]}</p><a class="m-btn ${i === 1 ? "" : "o"}" data-demo>Choose ${t[0]}</a></div>`).join("")}</div></section>
    <section id="s3"></section>${foot(s)}`,

  local: s => `
    <div class="lo-top"><div class="m-in"><span>${s.urgent}</span><b>${s.phone}</b></div></div>
    <div class="m-in" id="top">${nav(s, "Call " + s.phone)}
      <header class="lo-hero"><div><h1 class="m-h1">${s.headline}</h1><ul class="lo-checks">${s.checks.map(c => `<li>${c}</li>`).join("")}</ul></div>
        <div class="m-card lo-form"><h3>${s.formTitle || "Get a free quote"}</h3><p>${s.formSub || "We reply within one working day."}</p><div class="m-form" style="margin-top:14px"><input placeholder="Postcode" aria-label="Postcode"><input placeholder="What needs doing?" aria-label="Job"><a class="m-btn" data-demo>${s.cta}</a></div></div></header></div>
    <section class="m-sec" id="s1" style="background:var(--surface)"><div class="m-in"><h2 class="m-h2">${s.h2 || "Services"}</h2><div class="lo-grid">${s.items.map((it, i) => `<div data-demo>${(i % 2 ? A2 : A)(s, i, "width:52px;height:52px;border-radius:14px;flex:none")}<div><b>${it[0]}</b><span>${it[1]}</span></div></div>`).join("")}</div></div></section>
    <section class="m-sec" id="s2"><div class="m-in m-cols"><div><h2 class="m-h2">${s.areaTitle || "Where we work"}</h2><div class="lo-areas">${(s.areas || []).map(a => `<span class="m-badge">${a}</span>`).join("")}</div></div>${A2(s, 1, "aspect-ratio:16/10")}</div></section>
    <section class="m-sec" id="s3" style="padding-top:0"><div class="m-in"><div class="m-band"><h2 class="m-h2">${s.band || "Call us today."}</h2><a class="m-btn" data-demo>Call ${s.phone}</a></div></div></section>${foot(s)}`,

  playful: s => `
    <div class="m-in" id="top">${nav(s)}
      <header class="pl-hero"><div class="pl-blob b1"></div><div class="pl-blob b2"></div><div class="pl-sticker"><span>${s.sticker}</span></div>
        <h1 class="m-h1">${s.headline}</h1><p class="m-lead">${s.sub}</p><div class="m-acts" style="justify-content:center"><a class="m-btn" data-demo>${s.cta}</a></div></header></div>
    <section class="m-sec" id="s1" style="padding-top:0"><div class="m-in pl-cards">${s.items.slice(0, 4).map((it, i) => `<div class="pl-card" data-demo style="--rot:${[-3, 2, -2, 3][i]}deg;background:${[s.c.accent, s.c.surface, s.c.surface2, s.c.btn][i]};color:${i === 3 ? s.c.btnText : s.c.ink}">${A(s, i, "aspect-ratio:1;border-radius:50%;width:56%;margin:0 auto 14px")}<b>${it[0]}</b><span>${it[1]}</span>${it[2] ? `<em>${it[2]}</em>` : ""}</div>`).join("")}</div></section>
    <svg class="pl-wave" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30 Q 150 0 300 30 T 600 30 T 900 30 T 1200 30 V60 H0Z" fill="${s.c.btn}"/></svg>
    <section class="m-sec" id="s2" style="background:var(--btn);color:var(--btnText)"><div class="m-in m-cols" style="align-items:center"><h2 class="m-h2">${s.band}</h2><div><p style="opacity:.85;font-size:18px">${s.aboutText}</p><div class="m-acts"><a class="m-btn" style="background:var(--accent);color:var(--ink)" data-demo>${s.cta}</a></div></div></div></section>
    <section id="s3"></section>${foot(s)}`,

  luxe: s => `
    <div class="m-in" id="top">
      <nav class="m-nav lx-nav"><div class="m-links">${(s.nav || []).slice(0, 2).map((n, i) => `<a data-goto="s${i + 1}">${n}</a>`).join("")}</div><a class="m-logo" data-goto="top">${s.name}</a><div class="m-links" style="justify-content:flex-end"><a data-demo>${s.cta}</a></div><button class="m-burger" data-demo aria-label="Menu"><i></i><i></i><i></i></button></nav>
      <header class="lx-hero"><span class="lx-line"></span><span class="m-kick">${s.kicker}</span><h1 class="m-h1">${s.headline}</h1><div class="lx-arch">${A(s, 0)}</div><p class="m-lead">${s.sub}</p></header></div>
    <section class="m-sec" id="s1"><div class="m-in lx-three">${s.items.slice(0, 3).map(it => `<div><b>${it[0]}</b><span>${it[1]}</span>${it[2] ? `<em>${it[2]}</em>` : ""}</div>`).join("")}</div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in lx-cta"><span class="lx-line"></span><h2 class="m-h2">${s.band}</h2><a class="m-btn o" data-demo>${s.cta}</a></div></section>
    <section id="s3"></section>${foot(s)}`,

  magazine: s => `
    <div class="m-in" id="top">
      <div class="mg-date"><span>${s.issue}</span><span>${s.kicker}</span><span>${(s.nav || [])[2] || "Subscribe"}</span></div>
      <div class="mg-mast"><a class="m-logo" data-goto="top">${s.name}</a></div>
      <nav class="mg-nav">${(s.nav || []).concat(s.cats || []).map((n, i) => `<a data-goto="s${(i % 3) + 1}">${n}</a>`).join("")}</nav>
      <section class="mg-top" id="s1"><article class="mg-feat" data-demo>${A(s, 0)}<span class="m-kick">${s.featKick}</span><h1 class="m-h1">${s.headline}</h1><p class="m-lead">${s.sub}</p></article>
        <aside class="mg-side">${s.items.slice(0, 4).map((it, i) => `<div data-demo><small>${pad2(i)}</small><b>${it[0]}</b><span>${it[1]}</span></div>`).join("")}</aside></section></div>
    <section class="m-sec" id="s2" style="padding-top:24px"><div class="m-in m-three" style="margin:0">${s.items.slice(1, 4).map((it, i) => `<article data-demo>${(i % 2 ? A : A2)(s, i + 1, "aspect-ratio:3/2;margin-bottom:12px")}<b style="font-family:var(--head);font-size:21px;display:block">${it[0]}</b><span style="color:var(--muted);font-size:14px">${it[1]}</span></article>`).join("")}</div></section>
    <section class="m-sec" id="s3" style="padding-top:0"><div class="m-in"><div class="m-band"><h2 class="m-h2">${s.band}</h2><a class="m-btn" data-demo>${s.cta}</a></div></div></section>${foot(s)}`,

  sticky: s => `
    <div class="st-wrap" id="top"><aside class="st-left">${A(s, 0)}<div class="st-lt"><a class="m-logo" data-goto="top">${s.name}</a><h1 class="m-h1">${s.headline}</h1><a class="m-btn" data-demo>${s.cta}</a></div></aside>
      <div class="st-right"><nav class="m-nav"><div class="m-links st-links">${(s.nav || []).map((n, i) => `<a data-goto="s${i + 1}">${n}</a>`).join("")}</div></nav>
        <section class="st-sec" id="s1"><span class="m-kick">${s.kicker}</span><p class="st-big">${s.sub}</p></section>
        <section class="st-sec" id="s2">${s.items.map((it, i) => `<div class="st-item" data-demo>${(i % 2 ? A2 : A)(s, i + 1, "aspect-ratio:4/3")}<div><b>${it[0]}</b><span>${it[1]}</span></div></div>`).join("")}</section>
        <section class="st-sec" id="s3"><h2 class="m-h2">${s.band}</h2><div class="m-form" style="margin-top:20px"><input placeholder="Date" aria-label="Date"><input placeholder="Email" aria-label="Email"><a class="m-btn" data-demo>${s.cta}</a></div></section>
        <div class="m-foot"><span>© 2026 ${s.name}</span><span>${s.city || "Utrecht"} · Instagram</span></div></div></div>`,

  dashboard: s => `
    <div class="m-in" id="top">${nav(s)}
      <header class="db-hero"><span class="m-badge">${s.kicker}</span><h1 class="m-h1">${s.headline}</h1><p class="m-lead">${s.sub}</p><div class="m-acts" style="justify-content:center"><a class="m-btn" data-demo>${s.cta}</a><a class="m-btn o" data-demo>Book a demo</a></div></header>
      <div class="db-win" id="s1"><div class="db-side">${["Overview", ...(s.nav || []), "Settings"].map((n, i) => `<span class="${i === 0 ? "on" : ""}">${n}</span>`).join("")}</div>
        <div class="db-main"><div class="db-kpis">${s.stats.map(k => `<div><span>${k[1]}</span><b>${k[0]}</b></div>`).join("")}</div>
          <div class="db-chart">${[38, 52, 46, 64, 58, 72, 68, 84, 78, 92, 86, 96].map((h, i) => `<i style="--h:${h}%;--i:${i}"></i>`).join("")}</div>
          <div class="db-table">${s.items.slice(0, 4).map((it, i) => `<div><b>${it[0]}</b><span>${it[1]}</span><em class="${["ok", "wait", "ok", "late"][i]}">${(s.status || ["Done", "In progress", "Done", "Delayed"])[i]}</em></div>`).join("")}</div></div></div></div>
    <section class="m-sec" id="s2"><div class="m-in m-three">${(s.features || s.items).slice(0, 3).map(it => `<div class="m-card"><h3>${it[0]}</h3><p>${it[1]}</p></div>`).join("")}</div></section>
    <section class="m-sec" id="s3" style="padding-top:0"><div class="m-in"><div class="m-band"><h2 class="m-h2">${s.band}</h2><a class="m-btn" data-demo>${s.cta}</a></div></div></section>${foot(s)}`,

  neon: s => `
    <div class="ne-bg" id="top"><div class="ne-grid"></div><div class="m-in" style="position:relative">${nav(s)}
      <header class="ne-hero"><span class="m-kick">${s.kicker}</span><h1 class="m-h1">${s.headline}</h1><p class="m-lead">${s.sub}</p><div class="m-acts"><a class="m-btn" data-demo>${s.cta}</a><a class="m-btn o" data-goto="s1">${(s.nav || [])[0] || "Explore"}</a></div>
        ${s.countdown ? `<div class="ne-count">${s.countdown.map(c => `<div><b>${c[0]}</b><span>${c[1]}</span></div>`).join("")}</div>` : ""}</header></div></div>
    <section class="m-sec" id="s1"><div class="m-in ne-cards">${s.items.slice(0, 4).map((it, i) => `<div class="ne-card" data-demo>${(i % 2 ? A2 : A)(s, i, "aspect-ratio:16/10;margin-bottom:16px")}<b>${it[0]}</b><span>${it[1]}</span></div>`).join("")}</div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in"><div class="ne-band"><h2 class="m-h2">${s.band}</h2><a class="m-btn" data-demo>${s.cta}</a></div></div></section>
    <section id="s3"></section>${foot(s)}`,

  organic: s => `
    <div class="m-in" id="top">${nav(s)}
      <header class="or-hero"><div><span class="or-script">${s.script}</span><h1 class="m-h1">${s.headline}</h1><p class="m-lead">${s.sub}</p><div class="m-acts"><a class="m-btn" data-demo>${s.cta}</a></div></div>
        <div class="or-shapes">${A(s, 0, "border-radius:58% 42% 47% 53% / 52% 46% 54% 48%;aspect-ratio:1")}${A2(s, 1, "position:absolute;width:42%;aspect-ratio:1;border-radius:50%;right:-4%;bottom:-6%;outline:8px solid var(--bg)")}</div></header></div>
    ${wave(s.c.surface)}
    <section class="m-sec" id="s1" style="background:var(--surface)"><div class="m-in"><h2 class="m-h2" style="text-align:center">${s.h2}</h2><div class="or-items">${s.items.map((it, i) => `<div data-demo>${(i % 2 ? A2 : A)(s, i + 2, "aspect-ratio:1;border-radius:50%;width:110px;margin:0 auto 16px")}<b>${it[0]}</b><span>${it[1]}</span></div>`).join("")}</div></div></section>
    ${wave(s.c.surface, true)}
    <section class="m-sec" id="s2"><div class="m-in m-cols" style="align-items:center"><div><span class="or-script">${s.script2}</span><h2 class="m-h2">${s.band}</h2><p class="m-lead">${s.aboutText}</p></div>${A2(s, 3, "aspect-ratio:4/3;border-radius:200px 200px 24px 24px")}</div></section>
    <section id="s3"></section>${foot(s)}`,
});
Object.assign(LAYOUT_LABEL, { brutal: "Brutalist", swiss: "Swiss grid", centered: "Ultra minimal", app: "App launch", local: "Local service", playful: "Playful", luxe: "Luxury", magazine: "Magazine", sticky: "Split scroll", dashboard: "Product dashboard", neon: "Neon night", organic: "Organic" });

/* ---------------- CSS for new layouts + animation styles ---------------- */
(function () {
  const css = `
  /* brutal */
  .b-tick{background:var(--ink);color:var(--bg);overflow:hidden;padding:8px 0;font-family:var(--head);font-size:13px;text-transform:uppercase;letter-spacing:.05em}
  .b-tick div{display:flex;gap:24px;width:max-content;animation:mmarq 18s linear infinite}
  .l-brutal .m-nav{border-bottom:2px solid var(--ink)}
  .ms.l-brutal .m-btn{border-radius:0;border:2px solid var(--ink);box-shadow:4px 4px 0 var(--ink)}
  .ms.l-brutal .m-btn:hover{transform:translate(-2px,-2px);box-shadow:6px 6px 0 var(--ink)}
  .b-hero{padding:clamp(28px,5cqi,64px) 0}
  .l-brutal .m-h1{text-transform:uppercase;font-size:clamp(44px,9cqi,140px);line-height:.88;overflow-wrap:anywhere}
  .b-row{display:flex;justify-content:space-between;align-items:end;gap:24px;flex-wrap:wrap;margin-top:28px;border-top:2px solid var(--ink);padding-top:20px}
  .b-grid{display:grid;grid-template-columns:repeat(3,1fr);border:2px solid var(--ink)}
  .b-grid>div{border:2px solid var(--ink);margin:-1px;padding:22px;min-height:220px;display:flex;flex-direction:column;justify-content:space-between;gap:12px;transition:background .2s;background:var(--bg);cursor:pointer}
  .b-grid>div:not(.b-art):hover{background:var(--accent)}
  .b-grid small{font-family:var(--head);font-weight:700}
  .b-grid b{font-family:var(--head);font-size:clamp(22px,2.6cqi,34px);text-transform:uppercase;line-height:1}
  .b-grid span{font-size:14px;color:var(--muted)}
  .b-grid .b-art{padding:0;position:relative}.b-art .m-art{position:absolute;inset:0;border-radius:0}
  .b-box{border:2px solid var(--ink);box-shadow:10px 10px 0 var(--accent);padding:clamp(24px,4cqi,48px);display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:center;background:var(--surface)}
  .l-brutal .m-form input{border:2px solid var(--ink);border-radius:0}
  /* swiss */
  .sw-hero{display:grid;grid-template-columns:1.1fr 1fr 24px;gap:32px;padding:clamp(24px,4cqi,48px) 0 var(--gap);border-top:6px solid var(--ink);margin-top:8px}
  .sw-big{font-family:var(--head);font-size:clamp(120px,24cqi,360px);line-height:.78;letter-spacing:-.06em;color:var(--accent);font-weight:800}
  .sw-vert{writing-mode:vertical-rl;transform:rotate(180deg);font-size:12px;color:var(--muted);letter-spacing:.1em}
  .l-swiss .m-h1{font-size:clamp(34px,4.6cqi,64px)}
  .sw-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
  .sw-grid>div{cursor:pointer}
  .sw-grid i{display:block;height:6px;background:var(--ink);margin-bottom:14px;transition:background .3s}
  .sw-grid>div:first-child i,.sw-grid>div:hover i{background:var(--accent)}
  .sw-grid small{font-weight:700}
  .sw-grid b{display:block;font-family:var(--head);font-size:22px;margin:6px 0}
  .sw-grid span{font-size:14px;color:var(--muted)}
  .sw-feat{display:grid;grid-template-columns:2fr 1fr}
  .sw-feat .m-art{aspect-ratio:16/10;border-radius:0}
  .sw-block{background:var(--accent);color:var(--btnText);padding:32px;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;gap:20px}
  /* centered */
  .ce{text-align:center}
  .ce-nav{font-size:13px;color:var(--muted)}.ce-nav a{cursor:pointer}
  .ce-nav .m-logo{font-size:17px;font-weight:500;color:var(--ink)}
  .ce-hero{padding:clamp(48px,9cqi,140px) 0 var(--gap);display:grid;justify-items:center;gap:6px}
  .ce-mark .m-art{width:72px;height:72px;border-radius:50%;margin-bottom:28px}
  .l-centered .m-h1{font-size:clamp(34px,5cqi,68px);max-width:16ch}
  .ce-hero .m-lead{margin-inline:auto}
  .ce-link{margin-top:28px;font-size:15px;border-bottom:1px solid var(--ink);padding-bottom:3px;cursor:pointer}
  .ce-quote{font-family:var(--head);font-size:clamp(22px,2.8cqi,36px);max-width:26ch;margin:0 auto;line-height:1.3;font-style:italic}
  .ce-list{max-width:520px;margin:0 auto;border-top:1px solid var(--line)}
  .ce-list div{display:flex;justify-content:space-between;padding:18px 0;border-bottom:1px solid var(--line);gap:16px;text-align:left}
  .ce-list span{color:var(--muted)}
  .ce-contact{font-family:var(--head);font-size:clamp(22px,3.4cqi,44px)}
  /* app */
  .ap-hero{display:grid;grid-template-columns:1.1fr .9fr;gap:40px;align-items:center;padding:clamp(24px,4cqi,56px) 0 var(--gap)}
  .ap-store{display:inline-flex;align-items:center;gap:10px;background:var(--ink);color:var(--bg);padding:10px 16px;border-radius:12px;cursor:pointer;font-weight:600;font-size:15px;line-height:1.1}
  .ap-store b{width:18px;height:18px;border-radius:5px;background:var(--accent)}
  .ap-store small{display:block;font-size:10px;font-weight:400;opacity:.7}
  .ap-phone{justify-self:center;width:min(290px,100%);aspect-ratio:9/18.5;border-radius:44px;background:var(--ink);padding:11px;box-shadow:0 40px 80px -30px rgba(0,0,0,.45);transform:rotate(-4deg)}
  .ap-screen{height:100%;border-radius:34px;background:var(--surface);padding:22px 14px;display:flex;flex-direction:column;gap:10px;overflow:hidden;color:var(--ink)}
  .ap-top{display:flex;justify-content:space-between;align-items:center;font-weight:700;font-family:var(--head);font-size:20px;margin-bottom:6px}
  .ap-top i{width:30px;height:30px;border-radius:50%;background:var(--accent)}
  .ap-row{display:flex;gap:10px;align-items:center;background:var(--bg);border-radius:14px;padding:10px}
  .ap-row em{width:34px;height:34px;border-radius:10px;flex:none}
  .ap-row b{display:block;font-size:13px}.ap-row span{font-size:11px;color:var(--muted)}
  .ap-bar{margin-top:auto;display:flex;gap:6px;align-items:end;height:90px;padding:10px;background:var(--bg);border-radius:14px}
  .ap-bar i{flex:1;height:var(--h);background:var(--btn);border-radius:4px}
  .ap-ic{width:42px;height:42px;border-radius:12px;margin-bottom:18px}
  .ap-price{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .ap-price .m-card{display:grid;gap:8px;justify-items:start}
  .ap-price .m-card b{font-family:var(--head);font-size:36px}
  .ap-price .hi{box-shadow:inset 0 0 0 2px var(--btn)}
  /* local */
  .lo-top{background:var(--btn);color:var(--btnText);font-size:13px;padding:9px 0}
  .lo-top .m-in{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
  .lo-top b{font-family:var(--head);letter-spacing:.02em;font-size:15px}
  .lo-hero{display:grid;grid-template-columns:1.2fr .8fr;gap:40px;align-items:center;padding:clamp(24px,4cqi,56px) 0 var(--gap)}
  .l-local .m-h1{text-transform:var(--case);font-size:clamp(42px,7cqi,104px);line-height:.92}
  .lo-checks{list-style:none;padding:0;margin:26px 0 0;display:grid;gap:10px}
  .lo-checks li{display:flex;gap:10px;align-items:center;font-weight:500}
  .lo-checks li::before{content:"✓";width:24px;height:24px;border-radius:50%;background:var(--accent);color:var(--ink);display:grid;place-items:center;font-size:13px;flex:none}
  .lo-form{box-shadow:0 30px 60px -30px rgba(0,0,0,.35)}
  .lo-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:28px}
  .lo-grid>div{display:flex;gap:14px;align-items:center;background:var(--bg);border-radius:var(--r2);padding:16px;border:1px solid var(--line2);cursor:pointer;transition:transform .3s}
  .lo-grid>div:hover{transform:translateY(-3px)}
  .lo-grid b{display:block;font-size:16px}.lo-grid span{font-size:13px;color:var(--muted)}
  .lo-areas{display:flex;flex-wrap:wrap;gap:6px;margin-top:20px}
  /* playful */
  .pl-hero{position:relative;text-align:center;padding:clamp(40px,7cqi,100px) 0 var(--gap);display:grid;justify-items:center}
  .pl-hero>*{position:relative}
  .pl-blob{position:absolute!important;border-radius:42% 58% 63% 37% / 41% 44% 56% 59%;z-index:0}
  .pl-blob.b1{width:clamp(140px,22cqi,300px);aspect-ratio:1;background:var(--accent);left:0;top:8%;animation:mblob 9s ease-in-out infinite alternate}
  .pl-blob.b2{width:clamp(100px,16cqi,220px);aspect-ratio:1;background:var(--surface2);right:2%;bottom:10%;animation:mblob 11s ease-in-out infinite alternate-reverse}
  @keyframes mblob{to{border-radius:63% 37% 41% 59% / 56% 59% 41% 44%;transform:translate(14px,-10px) rotate(14deg)}}
  .pl-sticker{position:absolute!important;right:12%;top:4%;width:96px;height:96px;border-radius:50%;background:var(--btn);color:var(--btnText);display:grid;place-items:center;font-family:var(--head);font-weight:700;font-size:14px;line-height:1.1;padding:10px;animation:mspin 14s linear infinite;z-index:2}
  @keyframes mspin{from{transform:rotate(12deg)}to{transform:rotate(372deg)}}
  .l-playful .m-h1{font-size:clamp(44px,8cqi,120px);max-width:12ch;z-index:1}
  .l-playful .m-lead{margin-inline:auto;z-index:1}
  .pl-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
  .pl-card{border-radius:28px;padding:22px;transform:rotate(var(--rot));transition:transform .4s cubic-bezier(.3,1.6,.5,1);text-align:center;display:grid;gap:4px;cursor:pointer}
  .pl-card:hover{transform:rotate(0) scale(1.04)}
  .pl-card b{font-family:var(--head);font-size:21px}.pl-card span{font-size:14px;opacity:.8}.pl-card em{font-style:normal;font-weight:700;margin-top:6px}
  .pl-wave{display:block;width:100%;height:50px;margin-bottom:-1px}
  .ms.l-playful .m-btn{border-radius:99px;box-shadow:0 5px 0 rgba(0,0,0,.22)}
  /* luxe */
  .lx-nav{display:grid;grid-template-columns:1fr auto 1fr}
  .lx-nav .m-links{font-size:12px;letter-spacing:.18em;text-transform:uppercase}
  .l-luxe .m-logo{font-weight:400;letter-spacing:.3em;text-transform:uppercase;font-size:16px}
  .lx-hero{text-align:center;display:grid;justify-items:center;gap:6px;padding:clamp(40px,6cqi,90px) 0 var(--gap)}
  .lx-line{display:block;width:1px;height:70px;background:var(--accent);margin:0 auto 24px}
  .l-luxe .m-h1{font-size:clamp(44px,8cqi,124px);font-weight:400;letter-spacing:-.01em;max-width:14ch}
  .lx-arch{width:clamp(200px,28cqi,360px);margin:44px 0 30px}
  .lx-arch .m-art{aspect-ratio:3/4;border-radius:999px 999px 0 0;outline:1px solid var(--accent);outline-offset:10px}
  .l-luxe .m-lead{margin-inline:auto;text-align:center}
  .lx-three{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--accent);border-bottom:1px solid var(--accent)}
  .lx-three>div{padding:40px 28px;text-align:center;display:grid;gap:8px}
  .lx-three>div+div{border-left:1px solid var(--line)}
  .lx-three b{font-family:var(--head);font-weight:400;font-size:28px}
  .lx-three span{color:var(--muted);font-size:14px}
  .lx-three em{font-style:normal;color:var(--accent);letter-spacing:.12em;font-size:13px}
  .lx-cta{text-align:center;display:grid;justify-items:center;gap:24px}
  .l-luxe .m-h2{font-weight:400}
  .ms.l-luxe .m-btn{border-radius:0;letter-spacing:.18em;text-transform:uppercase;font-size:12px;font-weight:500;padding:16px 30px}
  .ms.l-luxe .m-btn.o{box-shadow:inset 0 0 0 1px var(--accent)}
  /* magazine */
  .mg-date{display:flex;justify-content:space-between;font-size:12px;color:var(--muted);padding:14px 0;border-bottom:1px solid var(--line);gap:10px}
  .mg-mast{text-align:center;padding:22px 0;border-bottom:3px double var(--ink)}
  .mg-mast .m-logo{display:inline-block;font-size:clamp(36px,7cqi,92px);letter-spacing:-.03em}
  .mg-nav{display:flex;justify-content:center;gap:24px;padding:12px 0;border-bottom:1px solid var(--line);font-size:13px;flex-wrap:wrap}
  .mg-nav a{cursor:pointer}.mg-nav a:hover{color:var(--accent)}
  .mg-top{display:grid;grid-template-columns:2fr 1fr;gap:32px;padding:32px 0 0}
  .mg-feat{cursor:pointer}.mg-feat .m-art{aspect-ratio:16/9;margin-bottom:18px}
  .l-magazine .m-h1{font-size:clamp(30px,4.4cqi,58px)}
  .mg-side{display:grid;align-content:start;border-left:1px solid var(--line);padding-left:24px}
  .mg-side>div{padding:16px 0;border-bottom:1px solid var(--line);display:grid;gap:4px;cursor:pointer}
  .mg-side small{color:var(--accent);font-weight:700}
  .mg-side b{font-family:var(--head);font-size:19px;line-height:1.2}
  .mg-side span{font-size:13px;color:var(--muted)}
  .l-magazine article{cursor:pointer}
  /* sticky split */
  .st-wrap{display:grid;grid-template-columns:1fr 1fr;align-items:start}
  .st-left{position:sticky;top:0;height:clamp(460px,60cqi,740px);overflow:hidden}
  .st-left .m-art{position:absolute;inset:0;border-radius:0}
  .st-lt{position:absolute;inset:auto 0 0 0;padding:clamp(24px,4cqi,48px);color:#fff;background:linear-gradient(to top,rgba(0,0,0,.6),transparent);display:grid;gap:16px;justify-items:start;z-index:2}
  .l-sticky .m-h1{font-size:clamp(34px,5cqi,76px)}
  .st-right{padding:0 clamp(20px,4cqi,56px)}
  .st-links{display:flex!important}
  .st-sec{padding:clamp(36px,6cqi,80px) 0;border-bottom:1px solid var(--line)}
  .st-big{font-family:var(--head);font-size:clamp(22px,2.6cqi,34px);line-height:1.3}
  .st-item{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:center;margin-bottom:24px;cursor:pointer}
  .st-item b{font-family:var(--head);font-size:22px;display:block}.st-item span{color:var(--muted);font-size:14px}
  /* dashboard */
  .db-hero{text-align:center;display:grid;justify-items:center;gap:8px;padding:clamp(32px,6cqi,80px) 0 40px}
  .l-dashboard .m-h1{max-width:16ch;font-size:clamp(38px,6cqi,88px);margin-top:12px}
  .db-hero .m-lead{margin-inline:auto}
  .db-win{display:grid;grid-template-columns:180px 1fr;border-radius:var(--r2);overflow:hidden;background:var(--surface);border:1px solid var(--line);box-shadow:0 40px 80px -40px rgba(0,0,0,.4)}
  .db-side{background:var(--bg);padding:18px 12px;display:grid;align-content:start;gap:4px;font-size:13px;border-right:1px solid var(--line2)}
  .db-side span{padding:8px 10px;border-radius:var(--r);color:var(--muted)}
  .db-side .on{background:var(--btn);color:var(--btnText)}
  .db-main{padding:20px;display:grid;gap:16px}
  .db-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
  .db-kpis div{background:var(--bg);border-radius:var(--r);padding:14px}
  .db-kpis span{font-size:12px;color:var(--muted);display:block}.db-kpis b{font-family:var(--head);font-size:26px}
  .db-chart{height:150px;display:flex;align-items:end;gap:8px;padding:14px;background:var(--bg);border-radius:var(--r)}
  .db-chart i{flex:1;height:var(--h);background:linear-gradient(var(--accent),var(--btn));border-radius:4px 4px 0 0;transform-origin:bottom;animation:mgrow 1.2s cubic-bezier(.2,.7,.1,1) both;animation-delay:calc(var(--i)*60ms)}
  @keyframes mgrow{from{transform:scaleY(0)}}
  .db-table{display:grid;font-size:13px}
  .db-table div{display:grid;grid-template-columns:1.2fr 1.5fr auto;gap:12px;padding:10px 4px;border-bottom:1px solid var(--line2);align-items:center}
  .db-table span{color:var(--muted)}
  .db-table em{font-style:normal;font-size:11px;padding:3px 9px;border-radius:99px;background:var(--line2)}
  .db-table em.ok{background:color-mix(in srgb,var(--accent) 28%,transparent)}
  .db-table em.late{background:rgba(220,60,60,.2)}
  /* neon */
  .ne-bg{position:relative;overflow:hidden;background:radial-gradient(ellipse 70% 60% at 70% 0%,color-mix(in srgb,var(--btn) 38%,transparent),transparent 70%),radial-gradient(ellipse 50% 50% at 10% 30%,color-mix(in srgb,var(--accent) 26%,transparent),transparent 70%)}
  .ne-grid{position:absolute;left:-20%;right:-20%;bottom:0;height:60%;background:linear-gradient(var(--line) 1px,transparent 1px) 0 0/60px 60px,linear-gradient(90deg,var(--line) 1px,transparent 1px) 0 0/60px 60px;transform:perspective(500px) rotateX(60deg);transform-origin:bottom;-webkit-mask-image:linear-gradient(to top,#000,transparent);mask-image:linear-gradient(to top,#000,transparent);animation:mgridmove 4s linear infinite}
  @keyframes mgridmove{to{background-position:0 60px,0 0}}
  .ne-hero{padding:clamp(40px,7cqi,110px) 0 clamp(60px,9cqi,140px);position:relative}
  .l-neon .m-h1{font-size:clamp(46px,9cqi,140px);max-width:12ch;background:linear-gradient(90deg,var(--ink),var(--accent),var(--btn));-webkit-background-clip:text;background-clip:text;color:transparent;text-transform:var(--case);padding-bottom:.05em}
  .ms.l-neon .m-btn:not(.o){box-shadow:0 0 28px color-mix(in srgb,var(--btn) 60%,transparent)}
  .ne-count{display:flex;gap:14px;margin-top:36px}
  .ne-count div{border:1px solid var(--line);border-radius:var(--r);padding:12px 16px;min-width:76px;text-align:center;background:rgba(255,255,255,.03)}
  .ne-count b{font-family:var(--head);font-size:28px;display:block}.ne-count span{font-size:11px;color:var(--muted)}
  .ne-cards{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
  .ne-card{padding:14px;border-radius:var(--r2);background:var(--surface);border:1px solid var(--line);transition:box-shadow .3s,transform .3s;cursor:pointer}
  .ne-card:hover{transform:translateY(-4px);box-shadow:0 0 0 1px var(--accent),0 0 30px color-mix(in srgb,var(--accent) 40%,transparent)}
  .ne-card b{font-family:var(--head);display:block;font-size:18px}.ne-card span{font-size:13px;color:var(--muted)}
  .ne-band{border-radius:var(--r2);padding:clamp(32px,5cqi,64px);display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;background:linear-gradient(120deg,var(--btn),var(--accent));color:var(--bg)}
  .ms .ne-band .m-btn{background:var(--bg);color:var(--ink);box-shadow:none}
  /* organic */
  .or-hero{display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center;padding:clamp(24px,4cqi,56px) 0 var(--gap)}
  .or-script{font-family:'Caveat',cursive;font-size:clamp(24px,2.8cqi,36px);color:var(--accent);display:block;transform:rotate(-3deg);margin-bottom:6px}
  .or-shapes{position:relative}
  .or-wave{display:block;width:100%;height:60px;margin:-1px 0}
  .or-items{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px;text-align:center}
  .or-items>div{cursor:pointer}
  .or-items b{font-family:var(--head);font-size:20px;display:block}.or-items span{font-size:14px;color:var(--muted)}
  .ms.l-organic .m-btn{border-radius:99px}

  /* ===== Animation styles (one per site) ===== */
  .an-float .m-art{animation:anFloat 6s ease-in-out infinite alternate}
  @keyframes anFloat{to{transform:translateY(-12px)}}
  .an-zoom .m-art{animation:anZoom 12s ease-in-out infinite alternate}
  @keyframes anZoom{to{transform:scale(1.05);filter:saturate(1.15)}}
  .an-wave .m-art{animation:anWave 7s ease-in-out infinite alternate}
  @keyframes anWave{to{filter:hue-rotate(28deg) saturate(1.2)}}
  .an-hue .m-art{animation:anHue 6s linear infinite}
  @keyframes anHue{to{filter:hue-rotate(360deg)}}
  .an-glitch .m-h1{animation:anGlitch 3.2s steps(1) infinite}
  @keyframes anGlitch{0%,90%,100%{text-shadow:none;transform:none}91%{text-shadow:4px 0 var(--accent),-4px 0 var(--btn);transform:translateX(3px)}94%{text-shadow:-4px 0 var(--accent),4px 0 var(--btn);transform:translateX(-3px) skewX(-4deg)}97%{text-shadow:2px 2px var(--accent);transform:none}}
  .an-shimmer .m-h1{background:linear-gradient(100deg,var(--ink) 40%,var(--accent) 50%,var(--ink) 60%) 0 0/260% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:anShim 3.6s linear infinite}
  @keyframes anShim{from{background-position:100% 0}to{background-position:-160% 0}}
  .an-pulse .m-btn:not(.o){animation:anPulse 2.2s infinite}
  @keyframes anPulse{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--btn) 55%,transparent)}100%{box-shadow:0 0 0 16px transparent}}
  .an-tilt :is(.m-card,.m-prod,.pl-card,.ne-card,.lo-grid>div,.m-bento>div,.st-item,.or-items>div){transition:transform .5s cubic-bezier(.2,.7,.1,1)}
  .an-tilt :is(.m-card,.m-prod,.ne-card,.lo-grid>div,.m-bento>div,.st-item,.or-items>div):hover{transform:perspective(700px) rotateX(5deg) rotateY(-7deg) translateY(-4px)}
  .an-tilt .m-art{animation:anTilt 8s ease-in-out infinite alternate}
  @keyframes anTilt{from{transform:rotate(-1.2deg)}to{transform:rotate(1.2deg)}}
  /* entrance animations: only in full previews, not thumbnails */
  .ms:not(.is-thumb).an-rise .m-h1{animation:anRise 1.1s cubic-bezier(.2,.7,.1,1) both}
  @keyframes anRise{from{opacity:0;transform:translateY(44px)}}
  .ms:not(.is-thumb).an-type .m-h1{animation:anType 2.2s steps(28) both}
  @keyframes anType{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
  .ms:not(.is-thumb).an-slide :is(header,section){animation:anSlide 1s cubic-bezier(.2,.7,.1,1) both}
  .ms:not(.is-thumb).an-slide section:nth-of-type(2){animation-delay:.12s}
  .ms:not(.is-thumb).an-slide section:nth-of-type(3){animation-delay:.24s}
  @keyframes anSlide{from{opacity:0;transform:translateX(-48px)}}
  .ms:not(.is-thumb).an-bounce :is(.m-card,.pl-card,.m-prod,.lo-grid>div,.or-items>div,.m-bento>div,.ne-card){animation:anBounce .8s cubic-bezier(.3,1.7,.5,1) both}
  .ms:not(.is-thumb).an-bounce :is(.m-card,.pl-card,.m-prod,.lo-grid>div,.or-items>div,.m-bento>div,.ne-card):nth-child(2){animation-delay:.1s}
  .ms:not(.is-thumb).an-bounce :is(.m-card,.pl-card,.m-prod,.lo-grid>div,.or-items>div,.m-bento>div,.ne-card):nth-child(3){animation-delay:.2s}
  .ms:not(.is-thumb).an-bounce :is(.m-card,.pl-card,.m-prod,.lo-grid>div,.or-items>div,.m-bento>div,.ne-card):nth-child(4){animation-delay:.3s}
  @keyframes anBounce{from{transform:scale(.6) translateY(30px);opacity:0}}
  /* thumbnails: loops wait for hover, entrance-only effects are skipped */
  .is-thumb *{animation-play-state:paused!important}
  .card__thumb:hover .is-thumb *,.card__thumb:focus-visible .is-thumb *{animation-play-state:running!important}
  .is-thumb .db-chart i{animation:none}
  .mo-0,.mo-0 *{animation:none!important}

  @container (max-width: 640px){
    .b-grid{grid-template-columns:1fr}.b-grid .b-art{min-height:200px}.b-box{grid-template-columns:1fr}
    .sw-hero{grid-template-columns:1fr}.sw-vert{display:none}.sw-grid{grid-template-columns:1fr 1fr}.sw-feat{grid-template-columns:1fr}
    .ap-hero{grid-template-columns:1fr}.ap-phone{width:230px;transform:none}.ap-price{grid-template-columns:1fr}
    .lo-hero{grid-template-columns:1fr}.lo-grid{grid-template-columns:1fr}
    .pl-cards{grid-template-columns:1fr 1fr}.pl-sticker{right:0;top:0;width:76px;height:76px;font-size:11px}
    .lx-nav{grid-template-columns:1fr auto}.lx-three{grid-template-columns:1fr}.lx-three>div+div{border-left:0;border-top:1px solid var(--line)}
    .mg-top{grid-template-columns:1fr}.mg-side{border-left:0;padding-left:0}.mg-date span:nth-child(2){display:none}
    .st-wrap{grid-template-columns:1fr}.st-left{position:relative;height:440px}.st-item{grid-template-columns:1fr}
    .db-win{grid-template-columns:1fr}.db-side{display:none}.db-kpis{grid-template-columns:1fr 1fr}.db-table div{grid-template-columns:1fr auto}.db-table span{display:none}
    .ne-cards{grid-template-columns:1fr 1fr}
    .or-hero{grid-template-columns:1fr}.or-items{grid-template-columns:1fr 1fr}
  }`;
  const s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);
})();

/* ---------------- Categorise the first 25 concepts ---------------- */
const META = {
  fashion: ["Retail & shops", "zoom", "Balanced"], restaurant: ["Food & drink", "float", "Balanced"], sushi: ["Food & drink", "none", "Minimal"],
  hotel: ["Hospitality & travel", "zoom", "Rich"], finance: ["Professional services", "tilt", "Balanced"], realestate: ["Professional services", "slide", "Balanced"],
  beauty: ["Beauty & personal care", "float", "Minimal"], fitness: ["Sports & fitness", "shimmer", "Rich"], tech: ["Tech & apps", "wave", "Rich"],
  portfolio: ["Creative & media", "tilt", "Minimal"], auto: ["Automotive & transport", "zoom", "Rich"], bakery: ["Food & drink", "bounce", "Minimal"],
  dental: ["Health & wellness", "none", "Balanced"], travel: ["Hospitality & travel", "wave", "Rich"], shop: ["Retail & shops", "none", "Balanced"],
  construction: ["Home & local services", "slide", "Minimal"], legal: ["Professional services", "none", "Minimal"], events: ["Events & nightlife", "hue", "Rich"],
  interior: ["Creative & media", "float", "Balanced"], education: ["Education & kids", "bounce", "Balanced"], cleaning: ["Home & local services", "pulse", "Minimal"],
  personal: ["Professional services", "type", "Minimal"], architecture: ["Creative & media", "none", "Minimal"], photo: ["Creative & media", "zoom", "Minimal"],
  pets: ["Pets & animals", "bounce", "Balanced"],
};
SITES.forEach(s => { const m = META[s.id]; if (m) { s.group = m[0]; s.anim = m[1]; s.cx = m[2]; } });

/* ---------------- ~50 more businesses ---------------- */
const N = (o) => SITES.push(o);
[
  { id: "tattoo", name: "Inkhaus", industry: "Tattoo studio", group: "Beauty & personal care", style: "Brutalist", pk: "Essential", layout: "brutal", anim: "glitch", cx: "Minimal", city: "Rotterdam", c: C("#F0EEE9", "#FFFFFF", "#0A0A0A", "#555555", "#0A0A0A", "#F0EEE9", "#FF3B1F", "#D8D4CB"), head: F.arch, body: F.mono, hw: 800, hls: "-.03em", arts: ["stripes", "split"], headline: "Ink that outlives trends.", sub: "Custom fine-line and blackwork by four resident artists. Book a consult and bring your idea.", cta: "Book a consult", nav: ["Artists", "Flash", "Aftercare"], items: [["Fine line", "Delicate, detailed, made to last"], ["Blackwork", "Bold shapes and solid black"], ["Cover-ups", "We rework what you regret"], ["Flash days", "Walk in, pick a design"], ["Aftercare", "Everything you need to heal well"]], ticker: ["Walk-ins Saturday", "Deposit €50", "Vegan inks", "18+ only"], band: "Free consult, always.", desc: "Raw brutalist studio site with a glitching headline." },
  { id: "records", name: "Groove Cellar", industry: "Record store", group: "Retail & shops", style: "Retro", pk: "Business", layout: "brutal", anim: "slide", cx: "Balanced", city: "Ghent", c: C("#FFE9C7", "#FFF6E6", "#2B1406", "#6B4A33", "#E0471B", "#FFF6E6", "#7FC8B4", "#F2C98A"), head: F.bebas, body: F.space, hw: 400, hls: ".01em", arts: ["rings", "sun"], headline: "Dig deeper.", sub: "Twenty thousand records in a basement in Ghent. New releases every Friday, used crates every day.", cta: "Browse the crates", nav: ["New in", "Used", "Events"], items: [["New releases", "Every Friday from 10:00"], ["Used crates", "Graded, cleaned, fairly priced"], ["We buy collections", "Cash or store credit"], ["Listening bar", "Coffee and a turntable"], ["In-store gigs", "First Thursday of the month"]], ticker: ["Open 7 days", "Free listening", "We buy vinyl", "Gigs monthly"], band: "Sell us your records." },
  { id: "agency", name: "Loud Mouth", industry: "Marketing agency", group: "Creative & media", style: "Brutalist", pk: "Signature", layout: "brutal", anim: "tilt", cx: "Rich", city: "Amsterdam", c: C("#E8F54A", "#F4FA9E", "#111111", "#3B3D18", "#111111", "#E8F54A", "#FF5FA2", "#C9D63A"), head: F.unb, body: F.geist, hw: 800, hls: "-.04em", arts: ["cone", "stripes"], headline: "Make noise people want.", sub: "Campaigns, content and paid social for brands that are tired of being polite.", cta: "Start a project", nav: ["Work", "Services", "Team"], items: [["Strategy", "Find the idea worth shouting"], ["Content", "Shot, edited, posted"], ["Paid social", "Spend smarter on Meta and TikTok"], ["Brand", "Identities with a point of view"], ["Creators", "Matched, briefed, managed"]], ticker: ["TikTok", "Meta", "YouTube", "Out of home"], band: "Got a brief? Send it." },
  { id: "gallery", name: "Galerie Raster", industry: "Art gallery", group: "Creative & media", style: "Swiss", pk: "Business", layout: "swiss", anim: "none", cx: "Minimal", city: "Basel", c: C("#FFFFFF", "#F2F2F2", "#111111", "#666666", "#111111", "#FFFFFF", "#E3241B", "#DDDDDD"), head: F.arch, body: F.geist, hw: 800, hls: "-.04em", arts: ["grid", "split"], big: "26", kicker: "Exhibition", headline: "Colour as structure.", sub: "New paintings by six artists who build images from grids, rules and one colour at a time. 4 March to 30 April.", cta: "Plan your visit", nav: ["Exhibitions", "Artists", "Visit"], items: [["Opening", "Friday 4 March, 19:00"], ["Hours", "Wed–Sun, 11:00–18:00"], ["Entry", "Free"], ["Talks", "Every Sunday, 15:00"]], h2: "Now showing", aboutText: "Raster shows contemporary abstract work by emerging and established artists from across Europe." },
  { id: "museum", name: "Museum of Light", industry: "Museum", group: "Education & kids", style: "Swiss", pk: "Signature", layout: "swiss", anim: "wave", cx: "Balanced", city: "Eindhoven", c: C("#0F1B3D", "#18275A", "#F4F1E8", "#A7B0CC", "#FFC93C", "#0F1B3D", "#FFC93C", "#24346E"), head: F.space, body: F.geist, hw: 700, arts: ["mesh", "cone"], big: "40", kicker: "Interactive science museum", headline: "Step inside a ray of light.", sub: "Forty hands-on rooms about light, colour and how we see. Great for ages 6 to 96.", cta: "Buy tickets", nav: ["Exhibits", "Tickets", "Schools"], items: [["Prism hall", "Split light into every colour"], ["Shadow lab", "Play with your own shadow"], ["Night sky", "A planetarium show every hour"], ["School visits", "Free for primary schools"]], h2: "Forty rooms to explore", aboutText: "Open every day from 10:00 to 17:00. Kids under 4 go free." },
  { id: "cinema", name: "Southside Cinema", industry: "Cinema", group: "Events & nightlife", style: "Swiss", pk: "Business", layout: "swiss", anim: "slide", cx: "Balanced", city: "Amsterdam", c: C("#1A1A1A", "#242424", "#F2EDE4", "#9C968C", "#E8432F", "#FFFFFF", "#E8432F", "#333333"), head: F.bebas, body: F.geist, hw: 400, hls: ".01em", arts: ["horizon", "blinds"], big: "3", kicker: "Arthouse cinema, 3 screens", headline: "Tonight on the big screen.", sub: "Independent films, classics and director Q&As. The bar opens an hour before every show.", cta: "See showtimes", nav: ["Films", "Events", "Bar"], items: [["Past Lives", "19:15, Screen 1"], ["Paris, Texas", "20:00, Screen 2"], ["Aftersun", "21:30, Screen 1"], ["Midnight classic", "23:30, Screen 3"]], h2: "This week", aboutText: "Members get every fifth film free and early access to festival tickets." },
  { id: "therapist", name: "Tessa Moor", industry: "Psychologist", group: "Health & wellness", style: "Minimal", pk: "Essential", layout: "centered", anim: "rise", cx: "Minimal", city: "Utrecht", c: C("#F3F1EC", "#FFFFFF", "#2E3532", "#6F7773", "#2E3532", "#FFFFFF", "#A9B9A9", "#DCE3DA"), head: F.serif, body: F.geist, hw: 400, arts: ["mesh"], headline: "A calm place to talk.", sub: "Individual therapy for anxiety, burnout and big life changes. In Utrecht or online.", cta: "Book a free intro call", nav: ["Approach", "Fees", "Contact"], quote: "“You don’t need to have it all figured out before you reach out.”", items: [["Intro call", "Free, 20 minutes"], ["Session", "€95, 50 minutes"], ["Online", "Same price, from home"], ["Insurance", "Partly covered"]], contact: "hello@tessamoor.nl" },
  { id: "yoga", name: "Stillness Yoga", industry: "Yoga studio", group: "Sports & fitness", style: "Minimal", pk: "Essential", layout: "centered", anim: "float", cx: "Minimal", city: "Amsterdam", c: C("#EEE7DD", "#F7F2EA", "#4A3B2F", "#7D6E62", "#C07A50", "#FFFFFF", "#E3B892", "#D9C9B4"), head: F.ital, body: F.geist, hw: 400, arts: ["sun"], headline: "Breathe in. Slow down.", sub: "Small yoga classes in a sunlit loft. Beginners are always welcome.", cta: "See the timetable", nav: ["Classes", "Teachers", "Visit"], quote: "“Twelve mats, no mirrors, no rush.”", items: [["Slow flow", "Mon & Wed, 7:30"], ["Yin", "Tue & Thu, 19:30"], ["Beginners", "Saturday, 10:00"], ["Intro month", "€49 unlimited"]], contact: "Lindengracht 22, Amsterdam" },
  { id: "translator", name: "Lingua Clara", industry: "Translator", group: "Professional services", style: "Minimal", pk: "Essential", layout: "centered", anim: "type", cx: "Minimal", city: "Leuven", c: C("#FFFFFF", "#F6F7FB", "#1B1F3B", "#666B85", "#3346D3", "#FFFFFF", "#3346D3", "#E3E6F6"), head: F.space, body: F.geist, hw: 500, arts: ["dots"], headline: "Clear words in five languages.", sub: "Certified translation of contracts, websites and documents in English, Dutch, German, French and Spanish.", cta: "Get a quote within an hour", nav: ["Services", "Rates", "Contact"], quote: "Sworn translator, registered with the Dutch courts.", items: [["Documents", "From €0.12 per word"], ["Websites", "Fixed price per page"], ["Sworn", "Certified for official use"], ["Rush", "Within 24 hours"]], contact: "clara@linguaclara.eu" },
  { id: "quill", name: "Quill", industry: "AI app", group: "Tech & apps", style: "Futuristic", pk: "Signature", layout: "app", anim: "float", cx: "Rich", c: C("#F5F3FF", "#FFFFFF", "#1E1B3A", "#6B6890", "#5B3DF5", "#FFFFFF", "#FF9DCB", "#CFC6FF"), head: F.unb, body: F.geist, hw: 700, hls: "-.04em", arts: ["mesh"], kicker: "AI note-taker", headline: "Meetings, minus the notes.", sub: "Quill listens, writes the summary and sends the to-dos to everyone. You just talk.", cta: "Try it free", nav: ["Features", "Pricing", "Security"], screenTitle: "Today", screen: [["Team sync", "3 action items"], ["Client call", "Summary ready"], ["1:1 with Sam", "Notes shared"], ["Weekly plan", "Draft"]], items: [["Live summaries", "Ready seconds after you hang up"], ["To-dos sent", "Straight to Slack or email"], ["Private by design", "Stored in the EU, never used for training"]], h2: "Built for people who hate taking notes." },
  { id: "pocketly", name: "Pocketly", industry: "Budgeting app", group: "Tech & apps", style: "Modern", pk: "Business", layout: "app", anim: "bounce", cx: "Balanced", c: C("#0F3D2E", "#134A38", "#EAFBF1", "#9FC9B3", "#B6F36B", "#0F3D2E", "#B6F36B", "#1E6B50"), head: F.brico, body: F.geist, hw: 700, arts: ["mesh"], kicker: "Budgeting for students", headline: "Know where your money goes.", sub: "Link your bank, set a weekly budget and get a nudge before you overspend.", cta: "Get the app", nav: ["How it works", "Pricing", "Help"], screenTitle: "This week", screen: [["Groceries", "€42 of €60"], ["Going out", "€18 of €40"], ["Transport", "€12 of €20"], ["Savings", "€25 saved"]], items: [["Weekly budgets", "Simple, not a spreadsheet"], ["Smart nudges", "Before you spend, not after"], ["Shared pots", "Split rent and bills"]], tiers: [["Free", "€0", "Everything you need"], ["Plus", "€2.99/mo", "Shared pots and insights"], ["Family", "€5.99/mo", "Up to 5 people"]] },
  { id: "fridge", name: "Fridgefriend", industry: "Meal planning app", group: "Tech & apps", style: "Playful", pk: "Business", layout: "app", anim: "pulse", cx: "Balanced", c: C("#FFF4E4", "#FFFFFF", "#3A2312", "#87664D", "#FF6B2C", "#FFFFFF", "#FFD23F", "#FFE0B8"), head: F.fred, body: F.nunito, hw: 700, arts: ["dots"], kicker: "Less waste, better dinners", headline: "Dinner from what’s already in your fridge.", sub: "Scan your groceries and get recipes that use them up before they go off.", cta: "Download free", nav: ["Recipes", "How it works", "Pricing"], screenTitle: "Use today", screen: [["Spinach", "Use within 2 days"], ["Feta", "Use within 4 days"], ["Tomatoes", "Use today"], ["Tonight", "Spinach & feta pie"]], items: [["Scan receipts", "Your fridge, filled in"], ["Use-it-up recipes", "Ready in 30 minutes"], ["Shopping list", "Only what’s missing"]] },
  { id: "plumber", name: "Drip Plumbing", industry: "Plumber", group: "Home & local services", style: "Bold", pk: "Essential", layout: "local", anim: "pulse", cx: "Balanced", city: "Rotterdam", c: C("#F3F7FB", "#FFFFFF", "#0B2440", "#55697F", "#0B5FFF", "#FFFFFF", "#FFC72C", "#D5E4F5"), head: F.bebas, body: F.geist, hw: 400, hls: ".005em", upper: true, arts: ["dots", "horizon"], phone: "010 234 56 78", urgent: "Leak or blockage? We’re there within 60 minutes, 24/7", headline: "Leaks fixed today. Not next week.", checks: ["Fixed price before we start", "Certified and insured", "Open 24/7, weekends too"], cta: "Get a free quote", nav: ["Services", "Prices", "Reviews"], items: [["Leaks", "Taps, pipes, toilets"], ["Blockages", "Drains and sewers"], ["Boilers", "Service and repair"], ["Bathrooms", "Full renovations"], ["Water heaters", "Install and replace"], ["Emergencies", "24/7 call-out"]], areas: ["Rotterdam", "Schiedam", "Capelle", "Barendrecht", "Ridderkerk", "Vlaardingen"], band: "Water where it shouldn’t be?" },
  { id: "movers", name: "Smooth Moves", industry: "Moving company", group: "Home & local services", style: "Modern", pk: "Essential", layout: "local", anim: "slide", cx: "Minimal", city: "Amsterdam", c: C("#FFFDF7", "#FFF3D6", "#23201A", "#6E6658", "#2D6A4F", "#FFFFFF", "#F4A259", "#F6DFAE"), head: F.brico, body: F.geist, hw: 800, arts: ["blinds", "sun"], phone: "020 555 01 23", urgent: "Moving this month? A few dates are still free", headline: "Moving day, without the stress.", checks: ["Fixed quote after a free video survey", "Packing materials included", "Insured up to €50,000"], formTitle: "Get a moving quote", cta: "Get my quote", nav: ["Services", "Prices", "FAQ"], items: [["Home moves", "Studio to family home"], ["Office moves", "Over the weekend"], ["Packing", "We pack, you relax"], ["Storage", "Short or long term"], ["Piano moves", "Specialist crew"], ["Abroad", "Across Europe"]], areas: ["Amsterdam", "Haarlem", "Utrecht", "Almere", "Zaandam", "Hilversum"], band: "Your move, sorted." },
  { id: "garage", name: "Bridge Street Garage", industry: "Car repair", group: "Automotive & transport", style: "Bold", pk: "Business", layout: "local", anim: "none", cx: "Balanced", city: "Utrecht", c: C("#F1F1EF", "#FFFFFF", "#161616", "#5C5C58", "#D7261E", "#FFFFFF", "#D7261E", "#DADAD6"), head: F.arch, body: F.geist, hw: 800, upper: true, arts: ["stripes", "grid"], phone: "030 678 90 12", urgent: "Car inspections while you wait, most days", headline: "Honest repairs, all makes.", checks: ["A quote before every repair", "Original or OEM parts", "Free courtesy car"], formTitle: "Book a service", formSub: "Pick a day and we’ll confirm within an hour.", cta: "Book now", nav: ["Services", "Inspections", "Contact"], items: [["Annual inspection", "From €39"], ["Service", "Major and minor"], ["Tyres", "Fitting and storage"], ["Brakes", "Pads, discs, fluid"], ["Airco", "Refill and check"], ["EV service", "Certified for electric"]], areas: ["Utrecht", "Nieuwegein", "Zeist", "Houten"], areaTitle: "Find us", band: "Book your inspection today." },
  { id: "icecream", name: "Scoop Shop", industry: "Ice cream parlour", group: "Food & drink", style: "Playful", pk: "Essential", layout: "playful", anim: "bounce", cx: "Balanced", c: C("#FFE3EC", "#FFFFFF", "#4A1730", "#8C4D69", "#E8366E", "#FFFFFF", "#8EE3C8", "#FFF1A8"), head: F.fred, body: F.nunito, hw: 700, arts: ["pill", "dots"], sticker: "Open till 22:00", headline: "Life’s short. Get two scoops.", sub: "Small-batch ice cream made every morning with Dutch milk and real fruit.", cta: "See today’s flavours", nav: ["Flavours", "Cakes", "Find us"], items: [["Pistachio", "Sicilian nuts", "€3"], ["Strawberry", "Local berries", "€3"], ["Stroopwafel", "Our bestseller", "€3.50"], ["Vegan mango", "Dairy free", "€3"]], band: "Come say hi!", aboutText: "Find us on the corner of the market square, every day from noon." },
  { id: "daycare", name: "Little Giants", industry: "Kids daycare", group: "Education & kids", style: "Playful", pk: "Business", layout: "playful", anim: "float", cx: "Balanced", c: C("#EAF6FF", "#FFFFFF", "#12355B", "#4F6E8F", "#2F80ED", "#FFFFFF", "#FFCD4D", "#BFF0D4"), head: F.fred, body: F.nunito, hw: 700, arts: ["dots", "sun", "pill"], sticker: "Places free!", headline: "Big days for little people.", sub: "Daycare for ages 0 to 4 with a big garden, organic meals and teachers who stay.", cta: "Book a visit", nav: ["Our days", "Prices", "Visit"], items: [["Babies", "0 to 18 months"], ["Toddlers", "18 months to 4"], ["Garden", "Outdoors every day"], ["Meals", "Organic, cooked here"]], band: "Come and see us.", aboutText: "Visits every Tuesday and Thursday morning. Bring the little one." },
  { id: "tacos", name: "Taco Loco", industry: "Food truck", group: "Food & drink", style: "Playful", pk: "Essential", layout: "playful", anim: "tilt", cx: "Minimal", c: C("#12493F", "#1B5C50", "#FFF3DC", "#BFD8C9", "#FF8A3D", "#12493F", "#FFD45C", "#2A7766"), head: F.bebas, body: F.geist, hw: 400, hls: ".01em", arts: ["sun", "cone"], sticker: "Find us today", headline: "Tacos on wheels.", sub: "Slow-cooked fillings, handmade tortillas and salsa with a kick. Follow the truck.", cta: "Where are we today?", nav: ["Menu", "Locations", "Catering"], items: [["Al pastor", "Pork, pineapple", "€4"], ["Birria", "Beef, consommé", "€5"], ["Nopales", "Vegan cactus", "€4"], ["Churros", "Cinnamon sugar", "€4"]], band: "Book us for your party.", aboutText: "Weddings, festivals and office lunches, from 30 to 500 people." },
  { id: "dance", name: "Boogie Box", industry: "Dance school", group: "Sports & fitness", style: "Bold", pk: "Business", layout: "stack", anim: "shimmer", cx: "Balanced", c: C("#FF5A36", "#FF7A5C", "#1C0B19", "#3F1726", "#1C0B19", "#FFE8DC", "#FFE8DC", "#FF9B7F"), head: F.unb, body: F.geist, hw: 800, hls: "-.04em", upper: true, arts: ["cone"], headline: "Dance|Like|Nobody", sub: "Hip-hop, salsa, heels and contemporary for every level. Your first class is free.", cta: "Book a free class", nav: ["Styles", "Timetable", "Prices"], h2: "Styles", items: [["Hip-hop", "All levels, 6 days a week"], ["Salsa", "Partner or solo"], ["Heels", "Confidence included"], ["Contemporary", "Flow and floorwork"]], band: "First class is free." },
  { id: "aurelia", name: "Aurelia", industry: "Jewellery", group: "Retail & shops", style: "Luxury", pk: "Signature", layout: "luxe", anim: "zoom", cx: "Minimal", city: "Antwerp", c: C("#0E0E0D", "#171715", "#F2EBDD", "#A59D8D", "#C9A45C", "#0E0E0D", "#C9A45C", "#3A3530"), head: F.ital, body: F.geist, hw: 400, arts: ["arch", "pill"], kicker: "Fine jewellery, Antwerp", headline: "Gold, made to be kept.", sub: "Rings, chains and earrings in recycled 18k gold, made by hand in our Antwerp atelier.", cta: "Book a private viewing", nav: ["Collections", "Bespoke", "Atelier"], items: [["Rings", "Solitaires and bands", "From €690"], ["Chains", "Hand-linked", "From €420"], ["Bespoke", "Designed with you", "By appointment"]], band: "Visit the atelier." },
  { id: "winery", name: "Domaine Sauvelle", industry: "Winery", group: "Food & drink", style: "Elegant", pk: "Signature", layout: "luxe", anim: "wave", cx: "Balanced", city: "Bordeaux", c: C("#F4EEE6", "#EAE1D5", "#3B1220", "#7D5A63", "#5E1A2E", "#F4EEE6", "#A8763E", "#D9C6AE"), head: F.corm, body: F.geist, hw: 500, arts: ["arch", "horizon"], kicker: "Vineyard since 1894", headline: "Five generations in every bottle.", sub: "Organic red and white wines from forty hectares of gravel slopes. Tastings in the old cellar.", cta: "Book a tasting", nav: ["Our wines", "Visit", "Shop"], items: [["Grand Vin", "Cabernet, Merlot", "€48"], ["Blanc", "Sauvignon, Sémillon", "€26"], ["Tastings", "Thu–Sun, 11:00 & 15:00", "€25"]], band: "The cellar door is open." },
  { id: "spa", name: "Thermae Noir", industry: "Spa", group: "Health & wellness", style: "Luxury", pk: "Business", layout: "luxe", anim: "float", cx: "Balanced", city: "Valkenburg", c: C("#1F2A2B", "#263334", "#ECE6DA", "#A3ACA7", "#D8C3A5", "#1F2A2B", "#8FB3A8", "#334445"), head: F.play, body: F.geist, hw: 400, arts: ["mesh", "arch"], kicker: "Thermal spa", headline: "Warm water. Quiet minds.", sub: "Thermal pools, saunas and massages in a former limestone quarry. Adults only.", cta: "Book a day pass", nav: ["Pools", "Treatments", "Day passes"], items: [["Day pass", "Pools and saunas", "€42"], ["Massage", "60 minutes", "€85"], ["Spa night", "Thu & Fri until 23:00", "€49"]], band: "Leave your phone in the locker." },
  { id: "barber", name: "Barberia Nero", industry: "Barber", group: "Beauty & personal care", style: "Retro", pk: "Essential", layout: "swiss", anim: "pulse", cx: "Minimal", city: "The Hague", c: C("#F2E8D5", "#FFF8EA", "#1F1A17", "#6B5E52", "#1F1A17", "#F2E8D5", "#B33A2B", "#DDCCAE"), head: F.bebas, body: F.geist, hw: 400, hls: ".01em", arts: ["stripes", "blinds"], big: "’68", kicker: "Barber since 1968", headline: "Sharp cuts, hot towels.", sub: "Classic cuts, fades and beard trims. Walk in or book a chair online.", cta: "Book a chair", nav: ["Services", "Barbers", "Book"], items: [["Haircut", "€32"], ["Skin fade", "€35"], ["Beard trim", "€22"], ["Hot towel shave", "€38"]], h2: "Walk-ins welcome", aboutText: "Three chairs, good coffee and the same barbers for over twenty years." },
  { id: "podcast", name: "The Long Lunch", industry: "Podcast", group: "Creative & media", style: "Editorial", pk: "Business", layout: "magazine", anim: "none", cx: "Balanced", c: C("#FBF6EE", "#FFFFFF", "#1E1E1E", "#6F6A63", "#1E1E1E", "#FBF6EE", "#E2583E", "#F0E2CC"), head: F.play, body: F.geist, hw: 700, arts: ["horizon", "sun", "mesh"], issue: "Episode 112", kicker: "New every Tuesday", nav: ["Episodes", "Guests", "Newsletter"], cats: ["Food", "Work", "Culture"], featKick: "Latest episode", headline: "Why the best ideas happen over lunch.", sub: "A chef, a founder and a novelist on the meal that changed their career. 54 minutes.", items: [["Episode 111", "The art of the long walk"], ["Episode 110", "Quitting well"], ["Episode 109", "Cooking for strangers"], ["Episode 108", "What we get wrong about rest"]], cta: "Subscribe", band: "New episodes in your inbox." },
  { id: "charity", name: "Ocean Kind", industry: "Charity", group: "Nonprofit & community", style: "Editorial", pk: "Business", layout: "magazine", anim: "rise", cx: "Balanced", c: C("#F2F8F8", "#FFFFFF", "#0B3140", "#4F6E78", "#0A7C86", "#FFFFFF", "#FF7F51", "#CBE7E8"), head: F.brico, body: F.geist, hw: 700, arts: ["horizon", "mesh", "dots"], issue: "Annual report 2026", kicker: "Cleaner seas, together", nav: ["Our work", "Get involved", "Donate"], cats: ["Beaches", "Research", "Schools"], featKick: "This year", headline: "One beach at a time.", sub: "Volunteers cleaned plastic from 120 beaches this year. Here’s where it went and what comes next.", items: [["Volunteer", "Join a clean-up near you"], ["Schools", "Free lessons for ages 8–12"], ["Research", "Mapping microplastics"], ["Donate", "€10 cleans 50 metres of beach"]], cta: "Donate", band: "Help us clean the next beach." },
  { id: "foodblog", name: "Salt & Season", industry: "Food blog", group: "Creative & media", style: "Editorial", pk: "Essential", layout: "magazine", anim: "slide", cx: "Minimal", c: C("#FFFFFF", "#F7F4EF", "#2A2522", "#7A716A", "#6E8B3D", "#FFFFFF", "#6E8B3D", "#EADFCF"), head: F.dm, body: F.geist, hw: 400, arts: ["sun", "arch", "pill"], issue: "Autumn", kicker: "Seasonal home cooking", nav: ["Recipes", "Seasons", "About"], cats: ["Quick", "Vegetarian", "Baking"], featKick: "Recipe of the week", headline: "Roast squash with brown butter and sage.", sub: "Thirty minutes, one tray, and the best thing you’ll eat this week.", items: [["Quick", "Weeknight pasta in 15 minutes"], ["Vegetarian", "Mushroom and barley stew"], ["Baking", "Apple and cardamom cake"], ["Basics", "How to make stock"]], cta: "Get the newsletter", band: "One recipe, every Sunday." },
  { id: "florist", name: "Wild Stem", industry: "Florist", group: "Retail & shops", style: "Organic", pk: "Business", layout: "sticky", anim: "zoom", cx: "Balanced", city: "Utrecht", c: C("#F7F1EF", "#FFFFFF", "#3A2430", "#7F6670", "#3A2430", "#F7F1EF", "#E68AA6", "#E8D3DB"), head: F.serif, body: F.geist, hw: 500, arts: ["mesh", "arch", "pill", "sun"], kicker: "Seasonal flowers", headline: "Flowers that look picked, not made.", sub: "Loose, seasonal bouquets from Dutch growers, delivered by bike across Utrecht the same day.", cta: "Order a bouquet", nav: ["Bouquets", "Weddings", "Workshops"], items: [["Seasonal bouquet", "From €35"], ["Weddings", "Bridal and table flowers"], ["Workshops", "Saturday mornings"], ["Subscriptions", "Fresh flowers weekly"]], band: "Order before 12:00, delivered today." },
  { id: "venue", name: "Linden Estate", industry: "Wedding venue", group: "Events & nightlife", style: "Elegant", pk: "Signature", layout: "sticky", anim: "float", cx: "Rich", city: "Gelderland", c: C("#F1F0E8", "#FFFFFF", "#26301F", "#66705C", "#4C5D3A", "#FFFFFF", "#C8A96B", "#DCDDCB"), head: F.corm, body: F.geist, hw: 600, arts: ["arch", "horizon", "sun"], kicker: "Country estate", headline: "Say yes under the lime trees.", sub: "A 19th-century estate with a walled garden, a coach house for 180 guests and rooms for the night.", cta: "Check your date", nav: ["The estate", "Weddings", "Stay"], items: [["Ceremony garden", "Up to 200 guests"], ["Coach house", "Dinner and dancing"], ["Bridal suite", "Plus 14 guest rooms"], ["Catering", "From our own kitchen"]], band: "Come and see the estate." },
  { id: "bnb", name: "The Silver Moon", industry: "Bed & breakfast", group: "Hospitality & travel", style: "Organic", pk: "Essential", layout: "sticky", anim: "rise", cx: "Minimal", city: "Harlingen", c: C("#EFF1F6", "#FFFFFF", "#202940", "#626B85", "#3C4A75", "#FFFFFF", "#E7C46A", "#D3D9E8"), head: F.dm, body: F.geist, hw: 400, arts: ["horizon", "sun"], kicker: "B&B on the Wadden coast", headline: "Three rooms. One very good breakfast.", sub: "A quiet B&B in an old dike house, ten minutes from the ferry to Vlieland.", cta: "Check availability", nav: ["Rooms", "Breakfast", "Area"], items: [["Moon room", "Sea view, €129"], ["Tide room", "Garden view, €115"], ["Dike suite", "With bath, €159"], ["Breakfast", "Until 11:00, included"]], band: "Stay a night or three." },
  { id: "freight", name: "Freightwise", industry: "Logistics", group: "Automotive & transport", style: "Corporate", pk: "Signature", layout: "dashboard", anim: "none", cx: "Rich", c: C("#F4F6F9", "#FFFFFF", "#0E1726", "#5B6577", "#0E1726", "#FFFFFF", "#FF6B00", "#E1E6EE"), head: F.space, body: F.geist, hw: 700, arts: ["grid"], kicker: "Freight tracking platform", headline: "Every shipment, one screen.", sub: "Track trucks, containers and parcels across 40 carriers in real time. Spot delays before your customer does.", cta: "Start free trial", nav: ["Shipments", "Carriers", "Reports"], stats: [["1,284", "Shipments live"], ["98.2%", "On time"], ["14", "Delays flagged"]], items: [["Rotterdam → Lyon", "Truck, 2 pallets"], ["Shanghai → Hamburg", "Container, 40 ft"], ["Venlo → Milan", "Truck, 12 pallets"], ["Antwerp → Leeds", "Ferry and truck"]], status: ["Delivered", "At sea", "Delivered", "Delayed"], features: [["Live tracking", "40 carriers in one view"], ["Delay alerts", "Know before your customer"], ["Reports", "On-time rate per carrier"]], band: "See it with your own shipments." },
  { id: "hirehaven", name: "Hirehaven", industry: "Recruitment", group: "Professional services", style: "Modern", pk: "Business", layout: "dashboard", anim: "rise", cx: "Balanced", c: C("#FFF8F3", "#FFFFFF", "#2A1A12", "#7A6458", "#E2553B", "#FFFFFF", "#FFB59E", "#FCE3D6"), head: F.brico, body: F.geist, hw: 700, arts: ["mesh"], kicker: "Tech recruitment", headline: "Hire engineers in weeks, not months.", sub: "We pre-screen developers and show you only the five who fit. You pay when someone starts.", cta: "Post a role", nav: ["Candidates", "Roles", "Interviews"], stats: [["5", "Shortlisted"], ["19 days", "Average time to hire"], ["€0", "Upfront fee"]], items: [["Senior frontend", "Interview Thursday"], ["Data engineer", "Offer sent"], ["iOS developer", "Shortlist ready"], ["DevOps", "Searching"]], status: ["Interview", "Offer", "Ready", "Searching"], features: [["Pre-screened", "Technical test done for you"], ["Shortlist in 7 days", "Five people, not fifty CVs"], ["Pay on start", "No hire, no fee"]], band: "Post your first role free." },
  { id: "shieldly", name: "Shieldly", industry: "Insurance", group: "Professional services", style: "Corporate", pk: "Business", layout: "dashboard", anim: "tilt", cx: "Balanced", c: C("#0B1E3F", "#12295A", "#EAF0FF", "#9AA9CC", "#4ADE80", "#0B1E3F", "#4ADE80", "#1A3570"), head: F.unb, body: F.geist, hw: 600, hls: "-.03em", arts: ["mesh"], kicker: "Insurance for freelancers", headline: "Covered in five minutes.", sub: "Liability, income and equipment insurance for freelancers. Monthly, no paperwork, cancel any time.", cta: "Get covered", nav: ["Policies", "Claims", "Help"], stats: [["€18/mo", "From"], ["5 min", "Sign-up"], ["48 h", "Claim decision"]], items: [["Liability", "Up to €2.5M"], ["Equipment", "Laptop, camera"], ["Income", "If you can’t work"], ["Legal aid", "Disputes with clients"]], status: ["Active", "Active", "Pending", "Not added"], features: [["Monthly policies", "Stop when you want"], ["Claims in the app", "Take a photo, done"], ["Real people", "Call us, really"]], band: "Get a price in two minutes." },
  { id: "esports", name: "Nightfall", industry: "Esports team", group: "Events & nightlife", style: "Futuristic", pk: "Signature", layout: "neon", anim: "glitch", cx: "Rich", c: C("#07060D", "#110F1D", "#F4F1FF", "#9A94B8", "#8B5CF6", "#FFFFFF", "#22D3EE", "#1C1830"), head: F.unb, body: F.geist, hw: 800, hls: "-.04em", upper: true, arts: ["mesh", "cone", "grid"], kicker: "Pro esports team", headline: "We play for the win.", sub: "Three pro rosters, a creator house and a fan club of 80,000. Next match on Saturday.", cta: "Watch live", nav: ["Teams", "Schedule", "Shop"], countdown: [["02", "Days"], ["14", "Hours"], ["37", "Min"]], items: [["Valorant", "EU Champions"], ["League", "Playoffs"], ["Rocket League", "Top 8"], ["Merch", "New jerseys"]], band: "Join the fan club." },
  { id: "club", name: "Club Obsidian", industry: "Nightclub", group: "Events & nightlife", style: "Bold", pk: "Signature", layout: "neon", anim: "hue", cx: "Rich", city: "Rotterdam", c: C("#0B0B0B", "#151515", "#FFFFFF", "#9C9C9C", "#FF2E88", "#FFFFFF", "#FFD400", "#262626"), head: F.bebas, body: F.geist, hw: 400, hls: ".01em", upper: true, arts: ["cone", "stripes", "rings"], kicker: "Fri & Sat, 23:00 to 06:00", headline: "Lose track of time.", sub: "Two rooms, a big sound system and the best house and techno in Rotterdam.", cta: "Buy tickets", nav: ["Agenda", "Tickets", "Info"], countdown: [["FRI", "23:00"], ["SAT", "23:00"]], items: [["Friday", "Deep house all night"], ["Saturday", "Techno until 06:00"], ["Room 2", "Disco and edits"], ["Guest list", "Before midnight"]], band: "Doors open at 23:00." },
  { id: "arcade", name: "Pixel Rift", industry: "VR arcade", group: "Events & nightlife", style: "Futuristic", pk: "Business", layout: "neon", anim: "wave", cx: "Balanced", city: "Eindhoven", c: C("#071A1F", "#0D262D", "#E6FFFB", "#8EB9B2", "#00F5D4", "#071A1F", "#FEE440", "#12343C"), head: F.space, body: F.geist, hw: 700, arts: ["grid", "mesh"], kicker: "VR arcade", headline: "Play inside the game.", sub: "Free-roam virtual reality for groups of 2 to 8. Birthdays, team outings or just a Tuesday.", cta: "Book a session", nav: ["Games", "Prices", "Parties"], items: [["Zombie siege", "Co-op, 30 min"], ["Space heist", "An escape room in VR"], ["Racing pods", "Up to 6 players"], ["Parties", "Cake included"]], band: "Bring your crew." },
  { id: "farm", name: "Clover Farm", industry: "Farm shop", group: "Food & drink", style: "Organic", pk: "Essential", layout: "organic", anim: "float", cx: "Balanced", c: C("#F6F1E4", "#EAE2C9", "#2F3A1E", "#626A4C", "#5C7A2E", "#FFFFFF", "#D9822B", "#CFC59E"), head: F.dm, body: F.nunito, hw: 400, arts: ["sun", "rings", "pill", "arch", "horizon"], script: "since 1987", headline: "Straight from our fields.", sub: "Vegetables, eggs, cheese and apple juice from our own farm, in the shop every Friday and Saturday.", cta: "See what’s fresh", nav: ["Shop", "The farm", "Visit"], items: [["Vegetables", "Picked this morning"], ["Eggs", "Free-range hens"], ["Cheese", "Made on the farm"], ["Apple juice", "From our orchard"]], h2: "From our land", script2: "come visit", band: "Open Friday & Saturday.", aboutText: "Kids can feed the goats. The coffee is always on." },
  { id: "brewery", name: "Hop & Haven", industry: "Brewery", group: "Food & drink", style: "Retro", pk: "Business", layout: "organic", anim: "tilt", cx: "Balanced", c: C("#1E2A22", "#26352B", "#F3E9D2", "#B8B095", "#E9A23B", "#1E2A22", "#E9A23B", "#334739"), head: F.bebas, body: F.geist, hw: 400, hls: ".01em", arts: ["rings", "sun", "stripes"], script: "brewed by the harbour", headline: "Beer worth the walk.", sub: "Small-batch ales and lagers brewed on the harbour. The taproom is open Thursday to Sunday.", cta: "Visit the taproom", nav: ["Beers", "Taproom", "Tours"], items: [["Harbour IPA", "6.2%, citrus"], ["Dock lager", "4.8%, crisp"], ["Night stout", "7%, coffee"], ["Brewery tour", "Saturday, €15"]], h2: "On tap now", script2: "cheers", band: "Taproom open Thu–Sun.", aboutText: "Twelve taps, pizza on Fridays, dogs welcome." },
  { id: "garden", name: "Green & Co", industry: "Garden design", group: "Home & local services", style: "Organic", pk: "Essential", layout: "organic", anim: "wave", cx: "Minimal", c: C("#FAFBF5", "#E6EDD8", "#1F3324", "#5D6E5F", "#2E6B3F", "#FFFFFF", "#7FA34A", "#C8D8A9"), head: F.brico, body: F.geist, hw: 700, arts: ["mesh", "dots", "arch"], script: "gardens that grow", headline: "Gardens you’ll actually use.", sub: "Design, planting and maintenance for city gardens and roof terraces.", cta: "Book a garden visit", nav: ["Design", "Planting", "Maintenance"], items: [["Design", "A 3D plan in two weeks"], ["Planting", "Native and low-care"], ["Terraces", "Roofs and balconies"], ["Maintenance", "Monthly visits"]], h2: "What we do", script2: "let’s grow", band: "Your first visit is free.", aboutText: "We work across Utrecht and Amersfoort, all year round." },
  { id: "solar", name: "Sunkey", industry: "Solar panels", group: "Home & local services", style: "Modern", pk: "Business", layout: "bento", anim: "shimmer", cx: "Balanced", c: C("#FFFBEA", "#FFFFFF", "#1D1A10", "#6E6650", "#1D1A10", "#FFE14D", "#E8A400", "#FFEFA6"), head: F.unb, body: F.geist, hw: 700, hls: "-.03em", arts: ["sun", "grid"], kicker: "Solar for homes", headline: "Your roof could pay your bills.", sub: "Panels, batteries and a heat pump if you want one. Installed in a day, monitored for 25 years.", cta: "Calculate my savings", nav: ["How it works", "Prices", "FAQ"], items: [["Panels", "Installed in one day"], ["Battery", "Store sun for the evening"], ["App", "See your energy live"], ["25-year warranty", "Panels and installation"]], stats: [["1 day", "Installation"], ["25 yrs", "Warranty"], ["€0", "Roof survey"]], band: "Get your free roof check." },
  { id: "cowork", name: "The Common Desk", industry: "Coworking", group: "Professional services", style: "Modern", pk: "Business", layout: "bento", anim: "tilt", cx: "Balanced", city: "Rotterdam", c: C("#EEF0F2", "#FFFFFF", "#15181C", "#5E6670", "#2E5BFF", "#FFFFFF", "#FF6F59", "#D7DCE3"), head: F.space, body: F.geist, hw: 600, arts: ["split", "grid"], kicker: "Coworking at Rotterdam Centraal", headline: "A desk, a door, a community.", sub: "Flexible desks and private offices two minutes from the station. Coffee and fast wifi included.", cta: "Book a free day", nav: ["Desks", "Offices", "Events"], items: [["Flex desk", "€190 a month"], ["Fixed desk", "€290 a month"], ["Private office", "From €690"], ["Meeting rooms", "By the hour"]], stats: [["2 min", "From the station"], ["24/7", "Access"], ["120", "Members"]], band: "Try it free for a day." },
  { id: "physio", name: "Move Physio", industry: "Physiotherapy", group: "Health & wellness", style: "Modern", pk: "Essential", layout: "split", anim: "rise", cx: "Minimal", city: "Arnhem", c: C("#F2FAF7", "#FFFFFF", "#0F2E2A", "#54706B", "#0E8A74", "#FFFFFF", "#FFB35C", "#CFEDE4"), head: F.brico, body: F.geist, hw: 700, arts: ["mesh", "pill"], kicker: "Physiotherapy in Arnhem", headline: "Move without pain again.", sub: "Treatment for back, neck and sports injuries. No referral needed, covered by most insurance.", cta: "Book an appointment", nav: ["Treatments", "Team", "Insurance"], items: [["Back & neck", "Hands-on care and exercise"], ["Sports injuries", "Get back in the game"], ["Dry needling", "For stubborn knots"]], strip: ["No referral needed", "Evening slots", "Insurance covered"] },
  { id: "vet", name: "Northside Vet Clinic", industry: "Veterinarian", group: "Pets & animals", style: "Playful", pk: "Business", layout: "split", anim: "bounce", cx: "Balanced", city: "Groningen", c: C("#FFF9F0", "#FFFFFF", "#23304A", "#5F6A80", "#3E5BA9", "#FFFFFF", "#F6A04D", "#FDE6C8"), head: F.nunito, body: F.nunito, hw: 800, radius: 20, arts: ["dots", "sun"], kicker: "Vet clinic for cats & dogs", headline: "Care for the whole family, tails included.", sub: "Checkups, vaccinations and surgery, plus a 24/7 emergency line for registered pets.", cta: "Book a visit", nav: ["Services", "Emergency", "Team"], items: [["Checkups", "A yearly health check"], ["Vaccinations", "Puppy and kitten plans"], ["Emergency", "24/7 for our patients"]], strip: ["24/7 emergency line", "Free parking", "Cat-only waiting room"] },
  { id: "pizza", name: "Forno Rosso", industry: "Pizzeria", group: "Food & drink", style: "Bold", pk: "Essential", layout: "menu", anim: "pulse", cx: "Minimal", c: C("#FFF5EC", "#FFE7D1", "#3A0D06", "#7A3E31", "#C8271B", "#FFFFFF", "#2E7D32", "#F7C9A8"), head: F.bebas, body: F.geist, hw: 400, hls: ".01em", arts: ["sun", "pill"], kicker: "Wood-fired, Neapolitan", headline: "48-hour dough. 90-second bake.", sub: "Neapolitan pizza from a 450°C wood oven. Eat in, take away or order online.", cta: "Order online", items: [["Margherita", "Tomato, fior di latte, basil", "€11"], ["Diavola", "Spicy salami, chilli", "€14"], ["Funghi", "Mushroom, truffle cream", "€15"], ["Marinara", "Tomato, garlic, oregano", "€9"], ["Burrata", "Burrata, cherry tomato", "€16"], ["Tiramisu", "Made daily", "€7"]] },
  { id: "cocktail", name: "Velvet Hour", industry: "Cocktail bar", group: "Events & nightlife", style: "Luxury", pk: "Business", layout: "menu", anim: "zoom", cx: "Balanced", c: C("#160F1F", "#1F1630", "#F5E9FF", "#B39FC7", "#C8A2FF", "#160F1F", "#FF9F7A", "#2D2145"), head: F.ital, body: F.geist, hw: 400, arts: ["mesh", "cone"], kicker: "Cocktail bar, after dark", headline: "Slow drinks for late nights.", sub: "Seasonal cocktails, low lights and vinyl. No reservations after 23:00.", cta: "Reserve", items: [["Velvet negroni", "Gin, bitter, cacao", "€14"], ["Garden spritz", "Elderflower, cava", "€12"], ["Smoke & honey", "Mezcal, honey, lime", "€15"], ["Zero proof", "Seasonal, alcohol-free", "€9"], ["Oysters", "Half dozen", "€18"], ["Late plate", "Truffle fries", "€8"]], h2: "The list" },
  { id: "bikes", name: "Velo Atelier", industry: "Bike shop", group: "Retail & shops", style: "Minimal", pk: "Business", layout: "shop", anim: "tilt", cx: "Balanced", c: C("#F7F7F5", "#FFFFFF", "#121212", "#666666", "#121212", "#FFFFFF", "#FF5A1F", "#E6E6E2"), head: F.arch, body: F.geist, hw: 700, hls: "-.03em", arts: ["stripes", "split", "cone", "pill"], kicker: "City & gravel bikes", headline: "Ride further.", sub: "Hand-built city and gravel bikes, plus a workshop that fixes any brand.", cta: "Shop bikes", nav: ["Bikes", "Workshop", "Rentals"], items: [["City 7", "", "€1,290"], ["Gravel GR2", "", "€2,190"], ["E-commuter", "", "€2,890"], ["Kids 20 inch", "", "€390"]], band: "Free service in your first year" },
  { id: "skincare", name: "Dew Lab", industry: "Skincare brand", group: "Beauty & personal care", style: "Minimal", pk: "Business", layout: "shop", anim: "float", cx: "Minimal", c: C("#F4EFEA", "#FFFFFF", "#3B302A", "#85766C", "#3B302A", "#FFFFFF", "#D9A89A", "#EBDDD3"), head: F.serif, body: F.geist, hw: 400, arts: ["pill", "arch", "mesh"], kicker: "Clean skincare", headline: "Fewer steps. Better skin.", sub: "Three-step skincare made with fermented botanicals in Copenhagen.", cta: "Find your routine", nav: ["Shop", "Routine", "About"], items: [["Cleanser", "", "€24"], ["Serum", "", "€42"], ["Moisturiser", "", "€36"], ["Discovery set", "", "€29"]], band: "Free samples with every order" },
  { id: "books", name: "Paper Lantern", industry: "Bookshop", group: "Retail & shops", style: "Editorial", pk: "Essential", layout: "editorial", anim: "rise", cx: "Minimal", c: C("#F5EFE3", "#EDE3D0", "#1E2B23", "#5E665F", "#1E2B23", "#F5EFE3", "#C2502E", "#D9C9AB"), head: F.play, body: F.geist, hw: 700, arts: ["blinds", "arch"], kicker: "Independent bookshop", headline: "Paper Lantern", sub: "New and second-hand books, a reading club every month and staff picks you can trust.", cta: "This month’s picks", nav: ["Books", "Events", "Visit"], items: [["Fiction", "Staff picks"], ["Kids", "Ages 0 to 14"], ["Second-hand", "Bought and sold"], ["Book club", "Last Thursday of the month"]], h2: "Read something you didn’t plan to." },
  { id: "audio", name: "Hexa Audio", industry: "Audio gear", group: "Retail & shops", style: "Futuristic", pk: "Signature", layout: "immersive", anim: "zoom", cx: "Rich", c: C("#0C0C0E", "#16161A", "#F2F2F2", "#8E8E96", "#E4E4E4", "#0C0C0E", "#5BE7FF", "#222228"), head: F.space, body: F.geist, hw: 700, arts: ["mesh", "cone", "horizon"], kicker: "Wireless headphones", headline: "Hear what you’ve been missing.", sub: "Studio sound, a 60-hour battery and noise cancelling that actually works on a train.", cta: "Pre-order H1", nav: ["H1", "Compare", "Support"], stats: [["60 h", "Battery"], ["-38 dB", "Noise cancelling"], ["240 g", "Weight"]], items: [["Adaptive ANC", "Learns your commute"], ["Spatial audio", "Head-tracked"], ["Swappable pads", "Leather or knit"], ["2-year warranty", "Repair, don’t replace"]] },
  { id: "lingo", name: "Lingo Lab", industry: "Language school", group: "Education & kids", style: "Playful", pk: "Business", layout: "bento", anim: "bounce", cx: "Balanced", c: C("#F3F0FF", "#FFFFFF", "#1C1640", "#5F5A85", "#E8365A", "#FFFFFF", "#7B61FF", "#E0D9FF"), head: F.fred, body: F.geist, hw: 600, radius: 22, arts: ["dots", "cone"], kicker: "Language courses for adults", headline: "Speak Spanish by summer.", sub: "Evening courses in Spanish, Italian and Dutch. Small groups and real conversation from lesson one.", cta: "Find a course", nav: ["Courses", "Teachers", "Prices"], items: [["Spanish", "A1 to C1"], ["Italian", "A1 to B2"], ["Dutch", "For newcomers"], ["Free trial lesson", "Every Monday"]], stats: [["8", "Students max"], ["12", "Weeks per level"], ["3", "Languages"]], band: "Try a lesson for free." },
  { id: "community", name: "The Neighbourhood Room", industry: "Community centre", group: "Nonprofit & community", style: "Playful", pk: "Essential", layout: "bento", anim: "rise", cx: "Minimal", c: C("#FFF7E8", "#FFFFFF", "#2B2A26", "#6E6B62", "#1F7A6F", "#FFFFFF", "#E9C46A", "#F4E1B8"), head: F.nunito, body: F.nunito, hw: 800, radius: 18, arts: ["dots", "sun"], kicker: "Community centre, Oost", headline: "Your living room in the neighbourhood.", sub: "Coffee mornings, homework help, a repair café and a free lunch every Wednesday.", cta: "See this week", nav: ["Activities", "Volunteer", "Rent a room"], items: [["Repair café", "Saturday 10:00"], ["Homework help", "Mon–Thu after school"], ["Free lunch", "Wednesday 12:30"], ["Volunteer", "Two hours a week helps"]], stats: [["7", "Days open"], ["40", "Volunteers"], ["Free", "Most activities"]], band: "Everyone is welcome." },
  { id: "driving", name: "Forward Driving School", industry: "Driving school", group: "Automotive & transport", style: "Bold", pk: "Essential", layout: "split", anim: "slide", cx: "Minimal", city: "Breda", c: C("#F5F8FF", "#FFFFFF", "#101A33", "#56607A", "#FF5C00", "#FFFFFF", "#1F6FFF", "#DCE6FF"), head: F.arch, body: F.geist, hw: 800, radius: 4, arts: ["horizon", "stripes"], kicker: "Driving school in Breda", headline: "Pass with confidence.", sub: "Patient instructors, automatic or manual, and a free trial lesson before you commit.", cta: "Book a trial lesson", nav: ["Packages", "Instructors", "Exam"], items: [["Trial lesson", "Free, 60 minutes"], ["Package 20", "20 lessons and exam, €1,295"], ["Automatic", "Easier and faster to learn"]], strip: ["Free trial lesson", "Automatic & manual", "Evening lessons"] },
  { id: "climbing", name: "Boulderbar Grip", industry: "Climbing gym", group: "Sports & fitness", style: "Bold", pk: "Business", layout: "brutal", anim: "bounce", cx: "Balanced", city: "Leiden", c: C("#F2F0FF", "#FFFFFF", "#17133A", "#4E4A73", "#17133A", "#F2F0FF", "#FF8C42", "#D9D4FF"), head: F.unb, body: F.geist, hw: 800, hls: "-.04em", arts: ["dots", "cone"], headline: "Climb. Fall. Repeat.", sub: "400 boulder problems, reset every week. Coffee bar, kids’ wall and intro classes every evening.", cta: "Get a day pass", nav: ["Prices", "Classes", "Café"], items: [["Day pass", "€14, shoes €4"], ["Intro class", "Every evening, 19:00"], ["Kids club", "Wednesday & Saturday"], ["Membership", "€55 a month"], ["Café", "Coffee and bagels"]], ticker: ["New routes every week", "Open till 23:00", "Shoe rental €4", "Kids welcome"], band: "First visit? Intro is free." },
].forEach(N);

/* ---------------- Category order for filters ---------------- */
const GROUPS = ["Food & drink", "Retail & shops", "Health & wellness", "Beauty & personal care", "Home & local services", "Professional services", "Hospitality & travel", "Creative & media", "Tech & apps", "Education & kids", "Events & nightlife", "Sports & fitness", "Automotive & transport", "Pets & animals", "Nonprofit & community"];
const ANIM_LABEL = { none: "Still", float: "Floating", zoom: "Slow zoom", wave: "Colour drift", hue: "Colour cycle", glitch: "Glitch", shimmer: "Shimmer", pulse: "Pulse", tilt: "3D tilt", rise: "Rise in", type: "Type on", slide: "Slide in", bounce: "Bounce in" };
