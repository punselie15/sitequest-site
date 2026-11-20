/* =========================================================
   SiteQuest Studio showroom, part 3: flagship layouts.
   Each one borrows the structure and pacing of a kind of site
   that big brands are known for (product launch, booking
   marketplace, quiet luxury retail, sports campaign, direct-to-
   consumer store, resort, food ordering). Inspired by, never
   copied: no brand names, logos, copy or assets of theirs.
   ========================================================= */

const price = (it, i, base = 24) => it[2] || "€" + (base + i * 7);
const stars = n => `<span class="x-stars" aria-label="Rated ${n} out of 5">★★★★★</span>`;
const linkNav = (s, cls = "") => `<div class="m-links ${cls}">${(s.nav || ["Shop", "About", "Contact"]).map((n, i) => `<a data-goto="s${i + 1}">${n}</a>`).join("")}</div>`;

Object.assign(LAYOUTS, {
  /* Product launch: centred statement, giant photo, tiles with two quiet links each. */
  launch: s => `
    <div class="pl-bar"><div class="m-in pl-nav"><a class="m-logo" data-goto="top">${s.name}</a>${linkNav(s)}<a class="pl-buy" data-demo>${s.cta}</a></div></div>
    <header class="la-hero" id="top"><div class="m-in">
      <span class="pl-kick">${s.kicker || "New"}</span>
      <h1 class="m-h1">${s.headline}</h1>
      <p class="m-lead">${s.sub || ""}</p>
      <div class="pl-links"><a data-goto="s1">Learn more ›</a><a data-demo>${s.cta} ›</a></div>
    </div>
    <div class="m-in">${A(s, 0, "aspect-ratio:21/10")}</div></header>
    <section class="m-sec" id="s1"><div class="m-in pl-tiles">
      ${s.items.slice(0, 4).map((it, i) => `<div class="pl-tile${i === 0 ? " is-dark" : ""}">
        <div class="pl-tile__txt"><h2 class="m-h2">${it[0]}</h2><p>${it[1]}</p><div class="pl-links"><a data-demo>Learn more ›</a><a data-demo>${price(it, i, 199)} ›</a></div></div>
        ${A(s, i + 1)}</div>`).join("")}
    </div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in pl-stats">
      ${(s.stats || s.items.slice(0, 3).map((it, i) => [["2×", "48h", "5 yr"][i], it[0]])).map(st => `<div><b>${st[0]}</b><span>${st[1]}</span></div>`).join("")}
    </div></section>
    <section id="s3"></section>${foot(s)}`,

  /* Booking marketplace: search pill, category row, photo card grid with rating and price. */
  stay: s => `
    <div class="m-in st-top" id="top">
      <div class="st-nav"><a class="m-logo" data-goto="top"><i></i>${s.name}</a>${linkNav(s)}<a class="m-btn o" data-demo>Log in</a></div>
      <div class="st-search" data-demo>
        <div><b>Where</b><span>${s.city || "Search places"}</span></div>
        <div><b>Check in</b><span>Add dates</span></div>
        <div><b>Check out</b><span>Add dates</span></div>
        <div><b>Guests</b><span>Add guests</span></div>
        <a class="st-go" aria-label="Search">⌕</a>
      </div>
      <div class="st-cats">${s.items.map((it, i) => `<a class="${i === 0 ? "on" : ""}" data-demo><i></i>${it[0]}</a>`).join("")}</div>
    </div>
    <section class="m-sec" id="s1" style="padding-top:28px"><div class="m-in">
      <h1 class="st-h">${s.headline}</h1>
      <div class="st-grid">${Array.from({ length: 8 }, (_, i) => { const it = s.items[i % s.items.length]; return `
        <a class="st-card" data-demo>${A(s, i, "aspect-ratio:1")}<span class="st-fav">♡</span>
          <div class="st-row"><b>${it[0]}</b><span>★ ${(4.98 - i * .06).toFixed(2)}</span></div>
          <p>${it[1]}</p><p><b>${price(it, i, 89)}</b> night</p></a>`; }).join("")}</div>
    </div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in st-host">
      ${A(s, 3, "aspect-ratio:4/3")}<div><h2 class="m-h2">${s.band || "Become a host"}</h2><p class="m-lead">${s.sub || ""}</p><div class="m-acts"><a class="m-btn" data-demo>${s.cta}</a></div></div>
    </div></section>
    <section id="s3"></section>${foot(s)}`,

  /* Quiet luxury retail: lots of air, small type, product row on tinted panels, long-form story. */
  quiet: s => `
    <div class="m-in qt-nav" id="top"><a class="m-logo" data-goto="top">${s.name}</a>${linkNav(s)}<span class="qt-util"><a data-demo>Search</a><a data-demo>Cart (0)</a></span></div>
    <header class="qt-hero">
      <div class="qt-copy"><span class="m-kick">${s.kicker || "New formulation"}</span><h1 class="m-h1">${s.headline}</h1><p class="m-lead">${s.sub || ""}</p><a class="qt-link" data-demo>${s.cta}</a></div>
      ${A(s, 0)}
    </header>
    <section class="m-sec" id="s1"><div class="m-in"><div class="qt-head"><h2 class="m-h2">${s.h2 || "Considered for every day"}</h2><a class="qt-link" data-demo>View all</a></div>
      <div class="qt-row">${s.items.slice(0, 4).map((it, i) => `<a class="qt-prod" data-demo><div class="qt-panel">${A(s, i + 1, "aspect-ratio:4/5")}</div><b>${it[0]}</b><p>${it[1]}</p><span>${price(it, i, 35)}</span></a>`).join("")}</div>
    </div></section>
    <section class="qt-story" id="s2">${A(s, 5)}<div class="qt-story__txt"><span class="m-kick">${s.city || "Our story"}</span><p>${s.aboutText || s.desc || s.sub}</p><a class="qt-link" data-demo>Read more</a></div></section>
    <section class="m-sec" id="s3"><div class="m-in qt-store"><h2 class="m-h2">${s.band || "Visit a store"}</h2><p class="m-lead">Consultations in store and online. Complimentary samples with every order.</p><a class="qt-link" data-demo>Find a store</a></div></section>
    ${foot(s)}`,

  /* Sports campaign: full-bleed photo, huge condensed caps, trending carousel, two-up promo. */
  sport: s => `
    <div class="sp-util">${s.strip ? s.strip.join("  ·  ") : "Free delivery on orders over €50"}</div>
    <div class="m-in" id="top">${nav(s, "Join us")}</div>
    <header class="sp-hero">${A(s, 0)}<div class="sp-hero__txt"><h1>${s.headline}</h1><p>${s.sub || ""}</p><div class="m-acts"><a class="sp-pill" data-demo>${s.cta}</a><a class="sp-pill o" data-goto="s1">Explore</a></div></div></header>
    <section class="m-sec" id="s1"><div class="m-in"><div class="sp-head"><h2>Trending now</h2><span><a data-demo>‹</a><a data-demo>›</a></span></div>
      <div class="sp-row">${s.items.slice(0, 4).map((it, i) => `<a class="sp-card" data-demo>${A(s, i + 1, "aspect-ratio:4/5")}<b>${it[0]}</b><p>${it[1]}</p></a>`).join("")}</div>
    </div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in sp-two">
      ${[0, 1].map(i => `<div class="sp-promo">${A(s, i + 5, "aspect-ratio:4/5")}<div class="sp-promo__txt"><span>${(s.items[i + 2] || s.items[i])[0]}</span><b>${["Made for the long run", "Ready when you are"][i]}</b><a class="sp-pill" data-demo>Shop</a></div></div>`).join("")}
    </div></section>
    <section id="s3"></section>${foot(s)}`,

  /* Direct-to-consumer store: announcement bar, half-bleed hero, bestsellers with reviews, customer photos. */
  dtc: s => `
    <div class="dc-ann">${s.ann || "Free shipping over €50 · 30-day returns"}</div>
    <div class="m-in dc-nav" id="top">${linkNav(s)}<a class="m-logo" data-goto="top">${s.name}</a><span class="dc-util"><a data-demo>Account</a><a data-demo>Bag (0)</a></span></div>
    <header class="dc-hero">${A(s, 0)}<div class="dc-hero__txt"><span class="m-kick">${s.kicker || "Bestseller"}</span><h1 class="m-h1">${s.headline}</h1><p class="m-lead">${s.sub || ""}</p><div class="m-acts"><a class="m-btn" data-demo>${s.cta}</a></div></div></header>
    <section class="m-sec" id="s1"><div class="m-in"><div class="dc-head"><h2 class="m-h2">Bestsellers</h2><a data-demo>Shop all</a></div>
      <div class="dc-grid">${s.items.slice(0, 4).map((it, i) => `<div class="dc-prod">${A(s, i + 1, "aspect-ratio:1")}${i === 0 ? `<span class="dc-tag">New</span>` : ""}
        <div class="dc-row"><b>${it[0]}</b><span>${price(it, i)}</span></div>${stars(5)} <small>${[1240, 860, 412, 2033][i]} reviews</small><a class="m-btn dc-add" data-demo>Add to bag</a></div>`).join("")}</div>
    </div></section>
    <section class="m-sec dc-ugc" id="s2"><div class="m-in"><h2 class="m-h2">${s.band || "As seen on you"}</h2><p class="m-lead">Tag us to be featured.</p></div>
      <div class="dc-strip">${[2, 3, 4, 5, 6].map(i => A(s, i, "aspect-ratio:3/4")).join("")}</div></section>
    <section class="m-sec" id="s3"><div class="m-in dc-quote">${stars(5)}<blockquote>“${s.quote || "Honestly the best thing I bought this year. I’ve already ordered two more as gifts."}”</blockquote><span>Verified customer</span></div></section>
    ${foot(s)}`,

  /* Resort: full-bleed photo with centred wordmark and a booking bar, then slow editorial sections. */
  resort: s => `
    <header class="rs-hero" id="top">${A(s, 0)}
      <div class="rs-nav">${linkNav(s)}<a class="rs-logo" data-goto="top">${s.name}</a><a class="rs-book" data-demo>${s.cta}</a></div>
      <div class="rs-title"><span>${s.kicker || s.city || ""}</span><h1>${s.headline}</h1></div>
      <div class="rs-bar" data-demo><div><b>Arrive</b><span>Select date</span></div><div><b>Depart</b><span>Select date</span></div><div><b>Guests</b><span>2 adults</span></div><a>Check availability</a></div>
    </header>
    <section class="m-sec" id="s1"><div class="m-in rs-intro"><p>${s.sub || s.desc || ""}</p></div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in rs-three">
      ${s.items.slice(0, 3).map((it, i) => `<a class="rs-card" data-demo>${A(s, i + 1, "aspect-ratio:3/4")}<b>${it[0]}</b><p>${it[1]}</p><span>Discover</span></a>`).join("")}
    </div></section>
    <section class="rs-full" id="s3">${A(s, 4)}<div class="rs-full__txt"><h2>${s.band || "Stay a little longer."}</h2><a class="rs-book" data-demo>${s.cta}</a></div></section>
    ${foot(s)}`,

  /* Food ordering: delivery/pick-up toggle with address, category tabs, menu with add buttons. */
  order: s => `
    <div class="m-in" id="top">${nav(s, "Order now")}</div>
    <header class="m-in od-hero">
      <div><h1 class="m-h1">${s.headline}</h1><p class="m-lead">${s.sub || ""}</p>
        <div class="od-box"><div class="od-tog"><a class="on" data-demo>Delivery</a><a data-demo>Pick up</a></div>
          <div class="od-addr"><input placeholder="Enter your address" aria-label="Address"><a class="m-btn" data-demo>Find food</a></div>
          <small>⏱ ${s.eta || "25–35 min"} · Free delivery over €20</small></div></div>
      ${A(s, 0, "aspect-ratio:1")}
    </header>
    <section class="m-sec" id="s1"><div class="m-in">
      <div class="od-tabs">${["Popular", ...(s.nav || []).slice(0, 2), "Drinks", "Dessert"].map((t, i) => `<a class="${i === 0 ? "on" : ""}" data-demo>${t}</a>`).join("")}</div>
      <div class="od-grid">${s.items.slice(0, 6).map((it, i) => `<div class="od-item"><div><b>${it[0]}</b><p>${it[1]}</p><span>${price(it, i, 9)}</span></div><div class="od-pic">${A(s, i + 1, "aspect-ratio:1")}<a class="od-add" data-demo aria-label="Add ${it[0]}">+</a></div></div>`).join("")}</div>
    </div></section>
    <section class="m-sec" id="s2" style="padding-top:0"><div class="m-in od-band">${A(s, 7, "aspect-ratio:21/9")}<div class="od-band__txt"><h2 class="m-h2">${s.band || "Hungry? We’re open."}</h2><p>${s.aboutText || "Every day 12:00–22:00. Order online or call us."}</p></div></div></section>
    <section id="s3"></section>${foot(s)}`,
});
Object.assign(LAYOUT_LABEL, { launch: "Product launch", stay: "Booking marketplace", quiet: "Quiet luxury", sport: "Sport campaign", dtc: "Brand store", resort: "Resort", order: "Order online" });

(function injectFlagshipCSS() {
  const css = `
  /* launch */
  .l-launch .pl-bar{position:sticky;top:0;z-index:5;background:color-mix(in srgb,var(--bg) 82%,transparent);backdrop-filter:blur(14px);border-bottom:1px solid var(--line2)}
  .l-launch .pl-nav{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:12px 0;font-size:13px}
  .l-launch .pl-nav .m-logo{font-size:17px}
  .l-launch .pl-buy{background:var(--btn);color:var(--btnText);padding:6px 14px;border-radius:99px;font-size:12px;font-weight:600;cursor:pointer}
  .l-launch .la-hero{text-align:center;padding-top:clamp(48px,7cqi,96px)}
  .l-launch .pl-kick{display:block;font-size:clamp(18px,2cqi,24px);font-weight:600;color:var(--accent);margin-bottom:10px}
  .l-launch .m-h1{font-size:clamp(44px,7.4cqi,112px);letter-spacing:-.035em;max-width:14ch;margin-inline:auto}
  .l-launch .m-lead{margin:18px auto 0;font-size:clamp(17px,1.8cqi,22px)}
  .l-launch .pl-links{display:flex;gap:28px;justify-content:center;margin:22px 0 clamp(36px,5cqi,64px);font-size:clamp(15px,1.4cqi,18px);color:var(--btn)}
  .l-launch .pl-links a{cursor:pointer}.l-launch .pl-links a:hover{text-decoration:underline}
  .l-launch .la-hero .m-art{border-radius:calc(var(--r2) * 1.6)}
  .l-launch .pl-tiles{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .l-launch .pl-tile{position:relative;border-radius:calc(var(--r2) * 1.4);overflow:hidden;background:var(--surface);min-height:clamp(420px,52cqi,640px);display:flex;flex-direction:column;text-align:center}
  .l-launch .pl-tile .m-art{flex:1;border-radius:0;margin-top:auto}
  .l-launch .pl-tile__txt{padding:clamp(28px,4cqi,48px) 24px 20px}
  .l-launch .pl-tile .m-h2{font-size:clamp(26px,3.4cqi,44px)}
  .l-launch .pl-tile p{color:var(--muted);margin-top:8px}
  .l-launch .pl-tile .pl-links{margin:14px 0 0}
  .l-launch .pl-tile.is-dark{background:#000;color:#F5F5F7}.l-launch .pl-tile.is-dark p{color:#A1A1A6}
  .l-launch .pl-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;text-align:center}
  .l-launch .pl-stats div{padding:clamp(28px,4cqi,48px) 12px;border-radius:var(--r2);background:var(--surface)}
  .l-launch .pl-stats b{display:block;font-family:var(--head);font-size:clamp(40px,6cqi,80px);letter-spacing:-.04em;line-height:1;background:linear-gradient(120deg,var(--btn),var(--accent));-webkit-background-clip:text;background-clip:text;color:transparent}
  .l-launch .pl-stats span{color:var(--muted);font-size:14px}
  @container (max-width:640px){.l-launch .pl-tiles,.l-launch .pl-stats{grid-template-columns:1fr}.l-launch .pl-nav .m-links{display:none}}

  /* stay */
  .l-stay .st-top{border-bottom:1px solid var(--line2);padding-bottom:0}
  .l-stay .st-nav{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:20px 0}
  .l-stay .m-logo{color:var(--btn)}
  .l-stay .st-search{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr auto;align-items:center;max-width:860px;margin:6px auto 22px;border:1px solid var(--line);border-radius:99px;background:var(--surface);box-shadow:0 6px 24px rgba(0,0,0,.08);padding:6px;cursor:pointer}
  .l-stay .st-search>div{padding:10px 22px;border-right:1px solid var(--line2);display:grid;font-size:13px}
  .l-stay .st-search>div:nth-child(4){border:0}
  .l-stay .st-search b{font-size:12px}.l-stay .st-search span{color:var(--muted)}
  .l-stay .st-go{width:48px;height:48px;border-radius:50%;background:var(--btn);color:var(--btnText);display:grid;place-items:center;font-size:22px}
  .l-stay .st-cats{display:flex;gap:30px;justify-content:center;overflow:hidden;font-size:12.5px;color:var(--muted)}
  .l-stay .st-cats a{display:grid;justify-items:center;gap:8px;padding-bottom:12px;border-bottom:2px solid transparent;white-space:nowrap;cursor:pointer}
  .l-stay .st-cats a.on{color:var(--ink);border-color:var(--ink)}
  .l-stay .st-cats i{width:22px;height:22px;border-radius:6px;border:1.5px solid currentColor;display:block}
  .l-stay .st-h{font-size:clamp(22px,2.4cqi,30px);margin-bottom:22px}
  .l-stay .st-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:28px 22px}
  .l-stay .st-card{position:relative;display:grid;gap:4px;font-size:14px;cursor:pointer}
  .l-stay .st-card .m-art{border-radius:calc(var(--r2) * 1.2);margin-bottom:8px}
  .l-stay .st-card p{color:var(--muted)}.l-stay .st-card p:last-child{color:var(--ink)}
  .l-stay .st-row{display:flex;justify-content:space-between;gap:8px}
  .l-stay .st-fav{position:absolute;top:12px;right:14px;color:#fff;font-size:22px;text-shadow:0 1px 4px rgba(0,0,0,.4)}
  .l-stay .st-host{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,5cqi,64px);align-items:center;background:var(--surface);border-radius:calc(var(--r2) * 1.4);padding:clamp(16px,2cqi,24px)}
  @container (max-width:900px){.l-stay .st-grid{grid-template-columns:repeat(2,1fr)}}
  @container (max-width:640px){.l-stay .st-search{grid-template-columns:1fr auto;border-radius:24px}.l-stay .st-search>div:not(:first-child){display:none}.l-stay .st-search>div{border:0}.l-stay .st-nav .m-links{display:none}.l-stay .st-cats{justify-content:flex-start;gap:22px}.l-stay .st-host{grid-template-columns:1fr}}

  /* quiet */
  .l-quiet{font-size:15px}
  .l-quiet .qt-nav{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:22px 0;font-size:13px}
  .l-quiet .qt-nav .m-logo{font-size:18px;letter-spacing:.02em}
  .l-quiet .qt-nav .m-links{font-size:13px}
  .l-quiet .qt-util{display:flex;gap:20px;justify-content:flex-end;color:var(--muted)}
  .l-quiet .qt-hero{display:grid;grid-template-columns:5fr 7fr;min-height:clamp(560px,62cqi,820px)}
  .l-quiet .qt-copy{align-self:end;padding:clamp(32px,6cqi,88px) clamp(24px,5cqi,72px)}
  .l-quiet .m-h1{font-size:clamp(32px,4cqi,56px);font-weight:400;letter-spacing:-.01em;line-height:1.1}
  .l-quiet .m-lead{font-size:15px;line-height:1.7}
  .l-quiet .qt-hero .m-art{border-radius:0}
  .l-quiet .qt-link{display:inline-block;margin-top:24px;font-size:14px;border-bottom:1px solid currentColor;padding-bottom:3px;cursor:pointer}
  .l-quiet .qt-head{display:flex;justify-content:space-between;align-items:end;margin-bottom:28px}
  .l-quiet .qt-head .qt-link{margin:0}
  .l-quiet .m-h2{font-size:clamp(24px,2.8cqi,36px);font-weight:400}
  .l-quiet .qt-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  .l-quiet .qt-prod{display:grid;gap:6px;font-size:14px;cursor:pointer}
  .l-quiet .qt-panel{background:var(--surface2);padding:12%;margin-bottom:10px;border-radius:var(--r2)}
  .l-quiet .qt-panel .m-art{border-radius:calc(var(--r2) * .6)}
  .l-quiet .qt-prod p,.l-quiet .qt-prod span{color:var(--muted)}
  .l-quiet .qt-story{position:relative;min-height:clamp(420px,50cqi,640px);display:grid}
  .l-quiet .qt-story>.m-art{position:absolute;inset:0;border-radius:0}
  .l-quiet .qt-story__txt{position:relative;align-self:end;margin:clamp(24px,4cqi,56px);max-width:440px;background:var(--bg);padding:clamp(24px,3cqi,40px);border-radius:var(--r2)}
  .l-quiet .qt-story__txt p{line-height:1.75}
  .l-quiet .qt-store{text-align:center;display:grid;justify-items:center}
  @container (max-width:640px){.l-quiet .qt-nav{grid-template-columns:1fr auto}.l-quiet .qt-nav .m-links{display:none}.l-quiet .qt-hero{grid-template-columns:1fr}.l-quiet .qt-hero .m-art{aspect-ratio:4/5;order:-1}.l-quiet .qt-row{grid-template-columns:1fr 1fr}}

  /* sport */
  .l-sport .sp-util{background:var(--surface2);text-align:center;font-size:12px;padding:8px 16px}
  .l-sport .sp-hero{position:relative;min-height:clamp(520px,60cqi,780px);display:grid;color:#fff}
  .l-sport .sp-hero>.m-art{position:absolute;inset:0;border-radius:0}
  .l-sport .sp-hero>.m-art::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 40%,rgba(0,0,0,.55));z-index:1}
  .l-sport .sp-hero__txt{position:relative;z-index:2;align-self:end;padding:clamp(28px,5cqi,64px)}
  .l-sport .sp-hero h1{font-family:var(--head);font-size:clamp(56px,10cqi,168px);line-height:.86;text-transform:uppercase;letter-spacing:-.02em;max-width:12ch}
  .l-sport .sp-hero p{max-width:40ch;margin-top:14px;font-size:clamp(15px,1.5cqi,18px)}
  .l-sport .sp-pill{display:inline-block;background:#fff;color:#111;padding:12px 24px;border-radius:99px;font-weight:600;font-size:14px;cursor:pointer}
  .l-sport .sp-pill.o{background:transparent;color:#fff;box-shadow:inset 0 0 0 1.5px #fff}
  .l-sport .sp-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
  .l-sport .sp-head h2{font-size:22px;font-family:var(--body);letter-spacing:0;font-weight:600}
  .l-sport .sp-head span{display:flex;gap:8px}.l-sport .sp-head span a{width:40px;height:40px;border-radius:50%;background:var(--surface2);display:grid;place-items:center;cursor:pointer}
  .l-sport .sp-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
  .l-sport .sp-card{display:grid;gap:4px;font-size:14px;cursor:pointer}.l-sport .sp-card .m-art{border-radius:4px;margin-bottom:8px}.l-sport .sp-card p{color:var(--muted)}
  .l-sport .sp-two{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .l-sport .sp-promo{position:relative;color:#fff}.l-sport .sp-promo .m-art{border-radius:4px}
  .l-sport .sp-promo__txt{position:absolute;left:clamp(20px,3cqi,40px);bottom:clamp(20px,3cqi,40px);display:grid;gap:8px;justify-items:start}
  .l-sport .sp-promo b{font-family:var(--head);font-size:clamp(24px,3cqi,40px);text-transform:uppercase;line-height:1}
  .l-sport .sp-promo span{font-size:14px}
  @container (max-width:640px){.l-sport .sp-row{grid-template-columns:1fr 1fr}.l-sport .sp-two{grid-template-columns:1fr}}

  /* dtc */
  .l-dtc .dc-ann{background:var(--btn);color:var(--btnText);text-align:center;font-size:12.5px;padding:9px 16px}
  .l-dtc .dc-nav{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:18px 0}
  .l-dtc .dc-nav .m-logo{font-size:24px}
  .l-dtc .dc-util{display:flex;justify-content:flex-end;gap:20px;font-size:14px}
  .l-dtc .dc-hero{display:grid;grid-template-columns:1fr 1fr;background:var(--surface2);min-height:clamp(440px,48cqi,640px)}
  .l-dtc .dc-hero .m-art{border-radius:0}
  .l-dtc .dc-hero__txt{align-self:center;padding:clamp(28px,6cqi,88px)}
  .l-dtc .dc-head{display:flex;justify-content:space-between;align-items:end;margin-bottom:24px}.l-dtc .dc-head a{text-decoration:underline;cursor:pointer;font-size:14px}
  .l-dtc .dc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}
  .l-dtc .dc-prod{position:relative;display:grid;gap:6px;font-size:14px}
  .l-dtc .dc-prod .m-art{background-color:var(--surface2);border-radius:var(--r2);margin-bottom:6px}
  .l-dtc .dc-prod small{color:var(--muted)}
  .l-dtc .dc-tag{position:absolute;top:12px;left:12px;background:var(--surface);font-size:11px;font-weight:600;padding:4px 10px;border-radius:99px}
  .l-dtc .dc-row{display:flex;justify-content:space-between;gap:8px}
  .l-dtc .dc-add{justify-content:center;margin-top:6px;padding:11px 16px}
  .x-stars{color:var(--accent);letter-spacing:2px;font-size:13px}
  .l-dtc .dc-ugc{background:var(--surface);padding-bottom:0}
  .l-dtc .dc-strip{display:grid;grid-template-columns:repeat(5,1fr);gap:4px;margin-top:32px}.l-dtc .dc-strip .m-art{border-radius:0}
  .l-dtc .dc-quote{text-align:center;display:grid;justify-items:center;gap:14px;max-width:760px}
  .l-dtc .dc-quote blockquote{margin:0;font-family:var(--head);font-size:clamp(24px,3cqi,40px);line-height:1.2}
  .l-dtc .dc-quote>span:last-child{color:var(--muted);font-size:14px}
  @container (max-width:640px){.l-dtc .dc-nav{grid-template-columns:1fr auto}.l-dtc .dc-nav .m-links{display:none}.l-dtc .dc-hero{grid-template-columns:1fr}.l-dtc .dc-hero .m-art{aspect-ratio:1}.l-dtc .dc-grid{grid-template-columns:1fr 1fr}.l-dtc .dc-strip{grid-template-columns:repeat(3,1fr)}}

  /* resort */
  .l-resort .rs-hero{position:relative;min-height:clamp(560px,62cqi,820px);display:grid;grid-template-rows:auto 1fr auto;color:#fff}
  .l-resort .rs-hero>.m-art{position:absolute;inset:0;border-radius:0}
  .l-resort .rs-hero>.m-art::before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.4),transparent 30%,transparent 55%,rgba(0,0,0,.5));z-index:1}
  .l-resort .rs-nav{position:relative;z-index:2;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:22px clamp(20px,4cqi,48px)}
  .l-resort .rs-nav .m-links{color:rgba(255,255,255,.85);font-size:12px;letter-spacing:.14em;text-transform:uppercase}
  .l-resort .rs-logo{font-family:var(--head);font-size:clamp(18px,2cqi,26px);letter-spacing:.32em;text-transform:uppercase;cursor:pointer}
  .l-resort .rs-book{justify-self:end;font-size:12px;letter-spacing:.14em;text-transform:uppercase;border:1px solid currentColor;padding:10px 18px;cursor:pointer;border-radius:var(--rb)}
  .l-resort .rs-title{position:relative;z-index:2;align-self:center;text-align:center;padding:0 24px}
  .l-resort .rs-title span{font-size:12px;letter-spacing:.24em;text-transform:uppercase}
  .l-resort .rs-title h1{font-family:var(--head);font-size:clamp(40px,6.4cqi,96px);font-weight:400;line-height:1.02;margin-top:14px;max-width:16ch;margin-inline:auto}
  .l-resort .rs-bar{position:relative;z-index:2;display:grid;grid-template-columns:repeat(3,1fr) auto;background:var(--bg);color:var(--ink);margin:0 auto clamp(20px,3cqi,40px);width:min(100% - 40px,860px);border-radius:var(--r);cursor:pointer}
  .l-resort .rs-bar>div{padding:16px 22px;border-right:1px solid var(--line2);display:grid;font-size:14px}.l-resort .rs-bar b{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:500}
  .l-resort .rs-bar a{background:var(--btn);color:var(--btnText);display:grid;place-items:center;padding:0 26px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;border-radius:0 var(--r) var(--r) 0}
  .l-resort .rs-intro{text-align:center;max-width:760px}.l-resort .rs-intro p{font-family:var(--head);font-size:clamp(22px,2.6cqi,34px);line-height:1.35}
  .l-resort .rs-three{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2.4cqi,32px)}
  .l-resort .rs-card{display:grid;gap:6px;cursor:pointer}.l-resort .rs-card .m-art{margin-bottom:10px}
  .l-resort .rs-card b{font-family:var(--head);font-size:22px;font-weight:400}.l-resort .rs-card p{color:var(--muted);font-size:14px}
  .l-resort .rs-card span{font-size:11px;letter-spacing:.16em;text-transform:uppercase;margin-top:6px}
  .l-resort .rs-full{position:relative;min-height:clamp(420px,46cqi,620px);display:grid;place-items:center;text-align:center;color:#fff}
  .l-resort .rs-full>.m-art{position:absolute;inset:0;border-radius:0;filter:brightness(.7)}
  .l-resort .rs-full__txt{position:relative;display:grid;justify-items:center;gap:24px}
  .l-resort .rs-full h2{font-family:var(--head);font-size:clamp(32px,4.6cqi,64px);font-weight:400}
  .l-resort .rs-full .rs-book{justify-self:center}
  @container (max-width:640px){.l-resort .rs-hero{min-height:720px}.l-resort .rs-nav{grid-template-columns:1fr auto}.l-resort .rs-nav .m-links{display:none}.l-resort .rs-bar{grid-template-columns:1fr 1fr}.l-resort .rs-bar a{grid-column:1/-1;padding:14px;border-radius:0 0 var(--r) var(--r)}.l-resort .rs-three{grid-template-columns:1fr}}

  /* order */
  .l-order .od-hero{display:grid;grid-template-columns:1.1fr .9fr;gap:clamp(24px,5cqi,72px);align-items:center;padding-block:clamp(24px,4cqi,56px)}
  .l-order .od-hero .m-art{border-radius:calc(var(--r2) * 2)}
  .l-order .od-box{margin-top:28px;background:var(--surface);border-radius:calc(var(--r2) * 1.2);padding:18px;box-shadow:0 10px 40px rgba(0,0,0,.08);max-width:480px;display:grid;gap:12px}
  .l-order .od-tog{display:inline-flex;background:var(--surface2);border-radius:99px;padding:4px;justify-self:start}
  .l-order .od-tog a{padding:8px 18px;border-radius:99px;font-size:13px;font-weight:600;cursor:pointer}.l-order .od-tog a.on{background:var(--surface);box-shadow:0 1px 4px rgba(0,0,0,.12)}
  .l-order .od-addr{display:flex;gap:8px}.l-order .od-addr input{flex:1;min-width:0;padding:12px 14px;border-radius:var(--r);border:1px solid var(--line);background:var(--bg);color:var(--ink);font:inherit;font-size:14px}
  .l-order .od-box small{color:var(--muted)}
  .l-order .od-tabs{display:flex;gap:8px;margin-bottom:24px;overflow:hidden}
  .l-order .od-tabs a{padding:9px 18px;border-radius:99px;background:var(--surface);font-size:14px;font-weight:500;white-space:nowrap;cursor:pointer}.l-order .od-tabs a.on{background:var(--ink);color:var(--bg)}
  .l-order .od-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
  .l-order .od-item{display:grid;grid-template-columns:1fr 112px;gap:14px;background:var(--surface);border-radius:var(--r2);padding:16px;font-size:14px;align-items:start}
  .l-order .od-item b{font-size:16px}.l-order .od-item p{color:var(--muted);margin:4px 0 10px}.l-order .od-item span{font-weight:600}
  .l-order .od-pic{position:relative}.l-order .od-pic .m-art{border-radius:var(--r)}
  .l-order .od-add{position:absolute;right:-6px;bottom:-6px;width:34px;height:34px;border-radius:50%;background:var(--btn);color:var(--btnText);display:grid;place-items:center;font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,.2);cursor:pointer}
  .l-order .od-band{position:relative;color:#fff}.l-order .od-band .m-art{filter:brightness(.6);border-radius:calc(var(--r2) * 1.4)}
  .l-order .od-band__txt{position:absolute;left:clamp(24px,4cqi,56px);bottom:clamp(24px,4cqi,56px);max-width:440px}.l-order .od-band p{margin-top:10px;opacity:.85}
  @container (max-width:900px){.l-order .od-grid{grid-template-columns:1fr 1fr}}
  @container (max-width:640px){.l-order .od-hero{grid-template-columns:1fr}.l-order .od-hero .m-art{order:-1}.l-order .od-grid{grid-template-columns:1fr}.l-order .od-band .m-art{aspect-ratio:4/5!important}}
  `;
  const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
})();

/* Move a set of concepts onto the flagship layouts. */
const FLAGSHIP = {
  auto: "launch", audio: "launch", solar: "launch",
  bnb: "stay", cowork: "stay", travel: "stay",
  skincare: "quiet", florist: "quiet", books: "quiet",
  bikes: "sport", climbing: "sport", fitness: "sport",
  shop: "dtc", brewery: "dtc", farm: "dtc",
  spa: "resort", venue: "resort", winery: "resort",
  pizza: "order", tacos: "order", sushi: "order",
};
SITES.forEach(s => { if (FLAGSHIP[s.id]) s.layout = FLAGSHIP[s.id]; });
