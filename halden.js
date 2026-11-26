/* =========================================================
   Halden: the four package demos (a made-up coffee bar in Utrecht).
   Each demo has exactly the pages its package includes, and its own font pairing:
     Basic      €299   3 pages   Schibsted Grotesk + Martian Mono   (simple, minimal)
     Essential  €499   5 pages   Young Serif + Onest                (warm, photo-led, gallery, map)
     Business   €999  10 pages   Brygada 1918 + Albert Sans         (premium, rich motion, advanced forms, editor)
     Signature €1999  20 pages   Imbue + Anybody                    (bespoke, animated beans, scroll story, blog, tools)
   Pages switch inside the demo (data-hp). app.js calls HALDEN.mount(view) after each render.
   Loads after sites.js (uses photoUrl, BEAN_DEFS, beanLayer).
   ========================================================= */
(() => {
  const ph = (id, w = 1200) => `url(${photoUrl(id, w)}) center/cover no-repeat`;
  const P = {
    interior: "1554118811-1e0d58224f24", night: "1501339847302-ac426a4a7cbb", pour: "1514066558159-fc8c737ef259",
    latteBeans: "1512568400610-62da28bc8a13", latteMarble: "1627469431699-a418fd7065db", cheers: "1495474472287-4d71bcdd2085",
    plants: "1509042239860-f550ce710b93", croissant: "1555507036-ab1f4038808a", buns: "1683806627608-208157b34241",
    brunch: "1424847651672-bf20a4b0982b", pourover: "1442512595331-e89e73853f31", roast: "1511537190424-bbbab87ac5eb",
    bread: "1695020384056-09c9a49e537c", pastry: "1615670079266-612a80cb94b4", bake: "1656945731569-d621bfce4ca3",
  };
  const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PAGES = { basic: 3, essential: 5, business: 10, signature: 20 };

  /* A small hand-drawn map of the canal corner (stands in for the Google Maps embed on the real site). */
  const mapSvg = c => `<svg viewBox="0 0 600 380" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Map: Halden at Oudegracht 112, Utrecht" style="display:block;width:100%;height:100%;background:${c.land}">
    <g fill="none" stroke="${c.road}" stroke-linecap="round">
      <path d="M-20 70 C120 60 220 90 330 70 S520 40 640 60" stroke-width="14"/><path d="M-20 300 C140 290 260 320 400 300 S560 270 640 290" stroke-width="12"/>
      <path d="M90 -20 C100 120 80 240 110 400" stroke-width="10"/><path d="M470 -20 C460 130 500 250 480 400" stroke-width="12"/>
      <path d="M180 160 L420 175" stroke-width="7"/><path d="M200 230 L430 245" stroke-width="7"/><path d="M380 -20 L360 400" stroke-width="6"/>
    </g>
    <g fill="${c.block}"><rect x="130" y="95" width="70" height="50" rx="6"/><rect x="215" y="100" width="60" height="46" rx="6"/><rect x="390" y="92" width="58" height="62" rx="6"/><rect x="128" y="250" width="56" height="30" rx="6"/><rect x="395" y="190" width="56" height="40" rx="6"/><rect x="505" y="110" width="80" height="60" rx="6"/><rect x="505" y="200" width="70" height="60" rx="6"/><rect x="20" y="110" width="50" height="160" rx="6"/></g>
    <path d="M300 -20 C270 80 330 150 300 220 S250 330 290 400" fill="none" stroke="${c.water}" stroke-width="26" stroke-linecap="round"/>
    <text x="318" y="356" font-family="${c.font}" font-size="12" fill="${c.label}" letter-spacing="2">OUDEGRACHT</text>
    <g transform="translate(316 178)"><circle r="30" fill="${c.pin}" opacity=".18"><animate attributeName="r" values="14;34;14" dur="2.6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".35;0;.35" dur="2.6s" repeatCount="indefinite"/></circle>
      <path d="M0 6 C-14 -8 -14 -30 0 -30 S14 -8 0 6Z" fill="${c.pin}"/><circle cy="-18" r="5" fill="${c.land}"/></g>
    <g transform="translate(340 140)"><rect width="104" height="30" rx="15" fill="${c.tag}"/><text x="52" y="20" text-anchor="middle" font-family="${c.font}" font-size="13" font-weight="600" fill="${c.tagInk}">Halden · N°112</text></g>
  </svg>`;

  const BASE = `
.hd{container-type:inline-size;min-height:100%;-webkit-font-smoothing:antialiased;position:relative;overflow-x:clip;text-rendering:optimizeLegibility}
.hd *{box-sizing:border-box;margin:0;padding:0}
.hd a{color:inherit;text-decoration:none;cursor:pointer}
.hd button{font:inherit;color:inherit;background:none;border:0;cursor:pointer;text-align:inherit}
.hd ul,.hd ol{list-style:none}
.hd input,.hd textarea,.hd select{font:inherit;color:inherit}
.hd .hp{display:none}.hd .hp.on{display:block;animation:hdpg .55s cubic-bezier(.2,.7,.1,1) both}
@keyframes hdpg{from{opacity:0;transform:translateY(6px)}}
.hd .rv{opacity:0;transform:translateY(26px);transition:opacity 1s cubic-bezier(.2,.7,.1,1),transform 1s cubic-bezier(.2,.7,.1,1);transition-delay:calc(var(--i,0)*80ms)}
.hd .rv.in{opacity:1;transform:none}
.hd .h-ov{position:sticky;top:0;height:0;z-index:60}
.hd .h-lb{position:absolute;left:0;right:0;top:0;height:var(--vh,640px);display:none;place-items:center;padding:24px;background:rgba(10,8,6,.86);z-index:70;cursor:zoom-out}
.hd .h-lb.on{display:grid;animation:hdpg .35s ease both}
.hd .h-lb i{display:block;width:min(100%,900px);aspect-ratio:3/2;border-radius:10px;background-size:cover;background-position:center;box-shadow:0 40px 80px -30px #000}
.hd .h-lb span{position:absolute;bottom:22px;left:0;right:0;text-align:center;color:#fff;font-size:13px;opacity:.8}
@media (prefers-reduced-motion:reduce){.hd *,.hd *::before,.hd *::after{animation:none!important;transition:none!important}.hd .rv{opacity:1;transform:none}}
`;
  const lightbox = `<div class="h-ov"><div class="h-lb" data-lbx><i></i><span></span></div></div>`;

  /* =====================================================================
     BASIC: simple and minimal. 3 pages: Home, Menu, Visit.
     Schibsted Grotesk + Martian Mono. One accent, lots of air, minimal motion.
     ===================================================================== */
  const basic = () => {
    const coffee = [["Espresso", "Single shot, house blend", "2.60"], ["Cortado", "Equal parts espresso and milk", "3.10"], ["Flat white", "Double shot, silky milk", "3.80"], ["Cappuccino", "", "3.60"], ["Filter coffee", "Refilled once, on us", "3.20"], ["Iced latte", "", "4.20"]];
    const other = [["Chai latte", "", "4.00"], ["Fresh mint tea", "", "3.20"], ["Hot chocolate", "", "3.80"]];
    const bake = [["Butter croissant", "", "2.80"], ["Cardamom bun", "Baked at six", "3.40"], ["Banana bread", "", "3.20"], ["Cheese toastie", "Sourdough, mature Gouda", "6.50"]];
    const row = r => `<li><div><b>${r[0]}</b>${r[1] ? `<small>${r[1]}</small>` : ""}</div><span class="mono">${r[2]}</span></li>`;
    const nav = `<nav class="w"><a class="b-logo" data-hp="home"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 1.5a10.5 10.5 0 0 1 0 21z" fill="currentColor"/></svg>Halden</a>
      <div class="b-links"><a data-hp="home">Home</a><a data-hp="menu">Menu</a><a data-hp="visit">Visit</a></div>
      <span class="mono b-open"><i></i><span data-open>Open daily from 7:30</span></span></nav>`;
    const foot = `<footer class="w"><div class="b-fw">Halden<span>.</span></div><div class="b-fr mono"><span>Oudegracht 112, Utrecht</span><span>hello@halden-coffee.com</span><span>© 2026 · A made-up café for this demo</span></div></footer>`;
    return `<div class="hd hb">
<style>${BASE}
.hb{--bg:#F3F1EC;--ink:#151412;--mut:#6B675F;--line:rgba(21,20,18,.13);--acc:#A2441F;background:var(--bg);color:var(--ink);font:400 15.5px/1.6 "Schibsted Grotesk",system-ui,sans-serif}
.hb .w{width:min(100% - 2*clamp(20px,5.5cqi,64px),1080px);margin-inline:auto}
.hb .mono{font:400 11.5px/1.5 "Martian Mono",ui-monospace,monospace;letter-spacing:.01em}
.hb nav{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:24px 0;border-bottom:1px solid var(--line)}
.hb .b-logo{display:inline-flex;align-items:center;gap:9px;font-weight:700;font-size:17px;letter-spacing:-.02em}
.hb .b-logo svg{width:18px;height:18px}
.hb .b-links{display:flex;gap:30px;font-size:14px}
.hb .b-links a{color:var(--mut);padding:4px 0;border-bottom:1.5px solid transparent;transition:color .2s,border-color .2s}
.hb .b-links a:hover{color:var(--ink)}.hb .b-links a.cur{color:var(--ink);border-color:var(--ink)}
.hb .b-open{justify-self:end;display:inline-flex;align-items:center;gap:8px;color:var(--mut)}
.hb .b-open i{width:6px;height:6px;border-radius:50%;background:#3F8A57}
.hb .b-hero{padding:clamp(56px,10cqi,128px) 0 clamp(36px,5cqi,60px)}
.hb .kick{color:var(--mut);display:block}
.hb h1,.hb h2,.hb h3{font-family:"Schibsted Grotesk",system-ui,sans-serif}
.hb h1{font-weight:650;font-size:clamp(44px,8.6cqi,116px);line-height:.92;letter-spacing:-.058em;margin:22px 0 0}
.hb h1 span,.hb .b-fw span{color:var(--acc)}
.hb .b-row{display:flex;justify-content:space-between;align-items:end;gap:28px;flex-wrap:wrap;margin-top:clamp(28px,4cqi,44px)}
.hb .lead{color:var(--mut);max-width:38ch;font-size:clamp(15px,1.55cqi,17.5px)}
.hb .b-acts{display:flex;gap:22px;align-items:center}
.hb .hbtn{display:inline-flex;align-items:center;gap:10px;padding:13px 22px;background:var(--ink);color:var(--bg);font-size:14px;font-weight:600;border-radius:2px;transition:background .25s}
.hb .hbtn:hover{background:var(--acc)}
.hb .lnk{font-size:14px;font-weight:600;border-bottom:1.5px solid currentColor;padding-bottom:2px}
.hb figure{margin:0}
.hb .b-photo{aspect-ratio:16/7.5;border-radius:3px;background:${ph(P.plants, 1600)}}
.hb figcaption{display:flex;justify-content:space-between;gap:12px;padding-top:12px;color:var(--mut)}
.hb .b-facts{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(20px,4cqi,48px);padding:clamp(56px,8cqi,104px) 0}
.hb .b-facts div{border-top:1px solid var(--ink);padding-top:16px}
.hb .b-facts .mono{color:var(--acc)}
.hb h3{font-weight:650;font-size:19px;letter-spacing:-.02em;margin:22px 0 8px}
.hb .b-facts p{color:var(--mut);font-size:14.5px;max-width:32ch}
.hb .b-split{display:grid;grid-template-columns:1fr 1.35fr;gap:clamp(24px,6cqi,96px);padding:clamp(48px,7cqi,88px) 0;border-top:1px solid var(--line)}
.hb h2{font-weight:650;font-size:clamp(28px,3.8cqi,46px);line-height:1;letter-spacing:-.045em}
.hb .b-split .lnk{display:inline-block;margin-top:22px}
.hb .list li{display:flex;justify-content:space-between;align-items:baseline;gap:20px;padding:15px 0;border-bottom:1px solid var(--line)}
.hb .list li:first-child{border-top:1px solid var(--line)}
.hb .list b{font-weight:550}.hb .list small{display:block;color:var(--mut);font-size:13px}
.hb .list .mono{font-size:12.5px}
.hb .b-ph{padding:clamp(48px,8cqi,104px) 0 clamp(28px,4cqi,44px)}
.hb .b-ph h1{font-size:clamp(40px,6.6cqi,84px)}
.hb .b-menu{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(28px,5cqi,72px);padding-bottom:clamp(40px,6cqi,72px)}
.hb .b-menu h3{margin:0 0 14px;display:flex;justify-content:space-between;align-items:baseline}
.hb .b-menu h3 .mono{color:var(--mut);font-weight:400}
.hb .b-note{display:flex;gap:28px;flex-wrap:wrap;padding:20px 0 clamp(48px,7cqi,88px);color:var(--mut);border-top:1px solid var(--line)}
.hb .b-visit{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,6cqi,96px);padding-bottom:clamp(48px,7cqi,88px)}
.hb dl{display:grid;grid-template-columns:110px 1fr;gap:12px 20px;border-top:1px solid var(--ink);padding-top:18px}
.hb dt{color:var(--mut)}.hb dd{font-weight:500}
.hb .b-vphoto{aspect-ratio:4/3;border-radius:3px;margin-top:32px;background:${ph(P.interior, 1000)}}
.hb form{display:grid;gap:4px;align-content:start}
.hb label{display:grid;gap:2px;padding:12px 0;border-bottom:1px solid var(--line)}
.hb label span{color:var(--mut)}
.hb input,.hb textarea{border:0;background:none;outline:none;font-size:15.5px;padding:4px 0}
.hb textarea{height:84px;resize:none}
.hb label:focus-within{border-color:var(--ink)}
.hb form .hbtn{justify-self:start;margin-top:22px}
.hb footer{display:flex;justify-content:space-between;align-items:end;gap:24px;flex-wrap:wrap;padding:clamp(40px,6cqi,72px) 0 30px;border-top:1px solid var(--line)}
.hb .b-fw{font-weight:700;font-size:clamp(40px,7cqi,84px);letter-spacing:-.06em;line-height:.8}
.hb .b-fr{display:grid;gap:2px;text-align:right;color:var(--mut)}
@container (max-width:640px){
  .hb nav{grid-template-columns:1fr auto}.hb .b-open{display:none}.hb .b-links{gap:18px}
  .hb .b-facts,.hb .b-split,.hb .b-menu,.hb .b-visit{grid-template-columns:1fr}
  .hb .b-photo{aspect-ratio:4/3.4}.hb .b-fr{text-align:left}
  .hb figcaption span:last-child{display:none}
}
</style>
${nav}
<main>
<section class="hp on" data-p="home"><div class="w">
  <div class="b-hero"><span class="mono kick">N°112 — Oudegracht, Utrecht</span><h1>Good coffee,<br>close to home<span>.</span></h1>
    <div class="b-row"><p class="lead">Freshly roasted beans, a short menu and a quiet corner by the canal. Open every morning from half past seven.</p>
      <div class="b-acts"><a class="hbtn" data-hp="menu">See the menu</a><a class="lnk" data-hp="visit">Plan a visit</a></div></div></div>
  <figure><div class="b-photo" role="img" aria-label="Coffee on a café table with plants"></div><figcaption class="mono"><span>Morning light at the bar</span><span>Mon–Fri 7:30–17:00 · Sat–Sun 9:00–17:00</span></figcaption></figure>
  <div class="b-facts">
    <div><span class="mono">01</span><h3>Roasted in house</h3><p>Small batches every Tuesday, so the beans in your cup are never older than a week.</p></div>
    <div><span class="mono">02</span><h3>Baked each morning</h3><p>Croissants and cardamom buns come out of the oven before we open the doors.</p></div>
    <div><span class="mono">03</span><h3>Six tables, one bar</h3><p>Small on purpose. Come for a quick espresso or stay with a book.</p></div></div>
  <div class="b-split"><div><h2>Today<br>at the bar</h2><a class="lnk" data-hp="menu">Full menu →</a></div><ul class="list">${coffee.slice(0, 3).concat(bake.slice(0, 2)).map(row).join("")}</ul></div>
</div></section>

<section class="hp" data-p="menu"><div class="w">
  <div class="b-ph"><span class="mono kick">Menu — prices in euro</span><h1>Short menu,<br>done well<span>.</span></h1></div>
  <div class="b-menu"><div><h3>Coffee <span class="mono">${coffee.length} drinks</span></h3><ul class="list">${coffee.map(row).join("")}</ul></div>
    <div><h3>Tea and more <span class="mono">${other.length} drinks</span></h3><ul class="list">${other.map(row).join("")}</ul>
      <h3 style="margin-top:40px">From the oven <span class="mono">Until sold out</span></h3><ul class="list">${bake.map(row).join("")}</ul></div></div>
  <div class="b-note mono"><span>Oat milk at no extra cost</span><span>Beans to take home: €12 / 250 g</span><span>Ask us about allergens</span></div>
</div></section>

<section class="hp" data-p="visit"><div class="w">
  <div class="b-ph"><span class="mono kick">Visit and contact</span><h1>Come by,<br>or say hello<span>.</span></h1></div>
  <div class="b-visit"><div><dl><dt>Address</dt><dd>Oudegracht 112<br>3511 AW Utrecht</dd><dt>Mon–Fri</dt><dd>7:30 – 17:00</dd><dt>Sat–Sun</dt><dd>9:00 – 17:00</dd><dt>Email</dt><dd>hello@halden-coffee.com</dd></dl><div class="b-vphoto" role="img" aria-label="Inside Halden"></div></div>
    <form onsubmit="return false"><h3 style="margin:0 0 10px">Send us a message</h3><label><span class="mono">Name</span><input aria-label="Your name"></label><label><span class="mono">Email</span><input type="email" aria-label="Email"></label><label><span class="mono">Message</span><textarea aria-label="Message"></textarea></label><a class="hbtn" data-demo>Send message</a></form></div>
</div></section>
</main>
${foot}
</div>`;
  };

  /* =====================================================================
     ESSENTIAL: warm and personal. 5 pages: Home, Menu, Story, Gallery, Visit.
     Young Serif + Onest. Photo-led, a gallery with lightbox, a map, subtle motion.
     ===================================================================== */
  const essential = () => {
    const favs = [["Flat white", "Our house blend, silky and sweet", "3.80", P.pour], ["Cardamom bun", "Baked every morning at six", "3.40", P.buns], ["Pour over", "Today’s single origin, brewed slowly", "4.50", P.pourover]];
    const menu = [
      ["Coffee", [["Espresso", "2.60"], ["Cortado", "3.10"], ["Flat white", "3.80"], ["Cappuccino", "3.60"], ["Oat latte", "4.00"], ["Pour over", "4.50"]]],
      ["Not coffee", [["Chai latte", "4.00"], ["Matcha", "4.40"], ["Fresh mint tea", "3.20"], ["Hot chocolate", "3.80"]]],
      ["From the oven", [["Butter croissant", "2.80"], ["Cardamom bun", "3.40"], ["Almond croissant", "3.60"], ["Banana bread", "3.20"]]],
      ["Brunch, weekends", [["Sourdough, eggs & greens", "11.50"], ["Yoghurt, fruit & granola", "8.50"], ["Cheese toastie", "6.50"]]],
    ];
    const gal = [[P.interior, "The front room", "t"], [P.latteMarble, "A cortado at the bar", ""], [P.croissant, "Croissants, 7 am", ""], [P.cheers, "Saturday regulars", "w"], [P.pourover, "Slow pour over", "t"], [P.buns, "Cardamom buns", ""], [P.latteBeans, "This week’s roast", ""], [P.brunch, "Weekend brunch", "w"]];
    const links = [["home", "Home"], ["menu", "Menu"], ["story", "Our story"], ["gallery", "Gallery"], ["visit", "Visit"]];
    const logo = `<a class="e-logo" data-hp="home"><svg viewBox="0 0 34 34" aria-hidden="true"><circle cx="17" cy="17" r="17" fill="#C0582B"/><path d="M8 22a9 9 0 0 1 18 0" fill="none" stroke="#FBF7F0" stroke-width="2.2" stroke-linecap="round"/><path d="M17 8v4M10 11l2 3M24 11l-2 3" stroke="#FBF7F0" stroke-width="2.2" stroke-linecap="round"/></svg>Halden</a>`;
    const map = mapSvg({ land: "#EADFCC", road: "#FBF7F0", block: "#E0D2BB", water: "#9DB5A8", pin: "#C0582B", label: "#6E7F72", font: "Onest, sans-serif", tag: "#2A1C15", tagInk: "#FBF7F0" });
    const head = (k, t, p) => `<div class="e-ph"><span class="e-kick rv">${k}</span><h1 class="rv" style="--i:1">${t}</h1>${p ? `<p class="e-lead rv" style="--i:2">${p}</p>` : ""}</div>`;
    return `<div class="hd he">
<style>${BASE}
.he{--bg:#F3EBDF;--card:#FBF7F0;--ink:#2A1C15;--mut:#7A685B;--ter:#C0582B;--sage:#7D8E6C;--sagebg:#DDE2D0;--butter:#EFCF86;--line:rgba(42,28,21,.13);background:var(--bg);color:var(--ink);font:400 15.5px/1.65 "Onest",system-ui,sans-serif}
.he .w{width:min(100% - 2*clamp(20px,5cqi,64px),1140px);margin-inline:auto}
.he h1,.he h2,.he h3,.he .e-logo,.he .serif{font-family:"Young Serif",Georgia,serif;font-weight:400;letter-spacing:-.015em}
.he nav{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 0}
.he .e-logo{display:flex;align-items:center;gap:10px;font-size:25px;line-height:1}
.he .e-logo svg{width:34px;height:34px;transition:transform .6s cubic-bezier(.2,.7,.1,1)}.he .e-logo:hover svg{transform:rotate(-14deg)}
.he .e-links{display:flex;gap:6px;font-size:14px;padding:5px;border-radius:99px;background:var(--card);box-shadow:0 0 0 1px var(--line)}
.he .e-links a{padding:7px 14px;border-radius:99px;color:var(--mut);transition:background .3s,color .3s}
.he .e-links a:hover{color:var(--ink)}.he .e-links a.cur{background:var(--ink);color:var(--card)}
.he .hbtn{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;border-radius:99px;background:var(--ter);color:#fff;font-size:14px;font-weight:500;transition:transform .35s cubic-bezier(.2,.7,.1,1),background .3s}
.he .hbtn:hover{transform:translateY(-2px);background:var(--ink)}
.he .hbtn.gh{background:transparent;color:var(--ink);box-shadow:inset 0 0 0 1.5px var(--line)}.he .hbtn.gh:hover{background:var(--card)}
.he .e-burger{display:none;width:42px;height:42px;border-radius:50%;background:var(--card);box-shadow:0 0 0 1px var(--line);place-items:center}
.he .e-burger i{display:block;width:16px;height:1.6px;background:var(--ink);box-shadow:0 5px 0 var(--ink),0 -5px 0 var(--ink)}
.he .e-hero{display:grid;grid-template-columns:1.05fr 1fr;gap:clamp(28px,5cqi,72px);align-items:center;padding:clamp(24px,4cqi,56px) 0 clamp(56px,8cqi,104px)}
.he .e-open{display:inline-flex;align-items:center;gap:8px;padding:6px 13px;border-radius:99px;background:var(--card);font-size:13px;box-shadow:0 0 0 1px var(--line)}
.he .e-open i{width:7px;height:7px;border-radius:50%;background:#5E9A67;box-shadow:0 0 0 4px rgba(94,154,103,.18)}
.he .e-hero h1{font-size:clamp(46px,7cqi,92px);line-height:.98;margin:22px 0 20px}
.he h1 em,.he h2 em{font-style:normal;color:var(--ter)}
.he .e-lead{color:var(--mut);max-width:40ch;font-size:clamp(15px,1.55cqi,17.5px)}
.he .e-acts{display:flex;flex-wrap:wrap;gap:10px;margin-top:28px}
.he .e-pics{position:relative;aspect-ratio:1/1.04}
.he .e-big{position:absolute;inset:0 0 9% 13%;border-radius:999px 999px 26px 26px;background:${ph(P.plants, 1100)};animation:heIn 1.2s cubic-bezier(.2,.7,.1,1) both}
.he .e-small{position:absolute;left:0;bottom:0;width:42%;aspect-ratio:1;border-radius:50%;background:${ph(P.croissant, 600)};box-shadow:0 0 0 9px var(--bg);animation:heIn 1.2s .18s cubic-bezier(.2,.7,.1,1) both}
.he .e-stk{position:absolute;right:2%;top:7%;width:96px;height:96px;border-radius:50%;background:var(--butter);display:grid;place-items:center;text-align:center;font:400 14px/1.1 "Young Serif",serif;transform:rotate(10deg);animation:heIn 1s .4s both}
@keyframes heIn{from{opacity:0;transform:translateY(26px) scale(.97)}}
.he section.sec{padding:clamp(56px,8cqi,104px) 0}
.he .e-head{display:flex;justify-content:space-between;align-items:end;gap:16px;flex-wrap:wrap;margin-bottom:clamp(24px,3.4cqi,40px)}
.he .e-kick{display:inline-block;font-size:13px;color:var(--ter);font-weight:500}
.he h2{font-size:clamp(32px,4.4cqi,54px);line-height:1.04;margin-top:8px}
.he .e-favs{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(12px,2cqi,22px)}
.he .e-fav{background:var(--card);border-radius:24px;padding:10px 10px 20px;box-shadow:0 0 0 1px var(--line);transition:transform .5s cubic-bezier(.2,.7,.1,1),box-shadow .5s}
.he .e-fav:hover{transform:translateY(-5px);box-shadow:0 0 0 1px var(--line),0 30px 44px -30px rgba(42,28,21,.55)}
.he .e-fav>i{display:block;aspect-ratio:4/3;border-radius:16px;margin-bottom:16px;overflow:hidden;position:relative}
.he .e-fav>i b{position:absolute;inset:0;background:inherit;transition:transform 1.2s cubic-bezier(.2,.7,.1,1)}
.he .e-fav:hover>i b{transform:scale(1.06)}
.he .e-fav div{display:flex;justify-content:space-between;gap:10px;padding:0 8px}
.he .e-fav strong{font:400 22px/1.15 "Young Serif",serif}
.he .e-fav span{color:var(--ter);font-weight:500}
.he .e-fav p{padding:4px 8px 0;color:var(--mut);font-size:14px}
.he .e-band{background:var(--sagebg)}
.he .e-band .w{display:grid;grid-template-columns:1fr 1.1fr;gap:clamp(28px,6cqi,88px);align-items:center}
.he .e-band i{display:block;aspect-ratio:4/4.4;border-radius:26px 26px 26px 160px;background:${ph(P.roast, 900)}}
.he .e-band p{color:#55604B;max-width:42ch;margin:16px 0 26px}
.he .e-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.he .e-strip a{aspect-ratio:1;border-radius:20px;overflow:hidden;position:relative}
.he .e-strip a b{position:absolute;inset:0;transition:transform 1.2s cubic-bezier(.2,.7,.1,1)}.he .e-strip a:hover b{transform:scale(1.07)}
.he .e-visitcard{display:grid;grid-template-columns:1fr 1.25fr;border-radius:28px;overflow:hidden;background:var(--ink);color:var(--card)}
.he .e-visitcard>div:first-child{padding:clamp(28px,5cqi,56px);display:flex;flex-direction:column;gap:14px;justify-content:center}
.he .e-visitcard p{color:rgba(251,247,240,.7)}
.he .e-visitcard .hbtn{align-self:start}
.he .e-map{min-height:280px}
.he .e-ph{padding:clamp(40px,7cqi,88px) 0 clamp(28px,4cqi,48px);text-align:center;display:grid;justify-items:center}
.he .e-ph h1{font-size:clamp(42px,6.4cqi,80px);line-height:1;margin:14px 0 14px;max-width:16ch}
.he .e-menu{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(16px,2.4cqi,26px);padding-bottom:clamp(56px,8cqi,96px)}
.he .e-mc{background:var(--card);border-radius:26px;padding:clamp(22px,3.4cqi,36px);box-shadow:0 0 0 1px var(--line)}
.he .e-mc h3{font-size:26px;margin-bottom:14px;display:flex;align-items:center;gap:12px}
.he .e-mc h3 i{width:10px;height:10px;border-radius:50%;background:var(--ter)}
.he .e-mc li{display:flex;align-items:baseline;gap:10px;padding:9px 0}
.he .e-mc li::after{content:"";order:2;flex:1;border-bottom:1.5px dotted rgba(42,28,21,.25)}
.he .e-mc li span{order:3;font-variant-numeric:tabular-nums;color:var(--mut)}
.he .e-mc.ph{padding:0;overflow:hidden;min-height:260px;background:${ph(P.latteMarble, 900)};box-shadow:none;display:flex;align-items:end}
.he .e-mc.ph p{margin:16px;padding:14px 18px;border-radius:18px;background:var(--card);font-size:14px}
.he .e-story{display:grid;grid-template-columns:1.1fr 1fr;gap:clamp(24px,5cqi,72px);align-items:start;padding-bottom:clamp(40px,6cqi,72px)}
.he .e-story .e-sp{aspect-ratio:4/5;border-radius:200px 200px 26px 26px;background:${ph(P.interior, 1000)}}
.he .e-story p{color:var(--mut);margin-top:16px}
.he .e-story p.big{font:400 clamp(21px,2.4cqi,28px)/1.35 "Young Serif",serif;color:var(--ink);margin-top:0}
.he .e-sign{margin-top:26px;font:400 15px "Young Serif",serif}
.he .e-vals{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding-bottom:clamp(56px,8cqi,96px)}
.he .e-vals div{background:var(--card);border-radius:24px;padding:26px;box-shadow:0 0 0 1px var(--line)}
.he .e-vals svg{width:44px;height:44px;color:var(--ter);margin-bottom:18px}
.he .e-vals h3{font-size:22px;margin-bottom:6px}.he .e-vals p{color:var(--mut);font-size:14.5px}
.he .e-gal{columns:3 240px;column-gap:14px;padding-bottom:clamp(56px,8cqi,96px)}
.he .e-gal a{display:block;break-inside:avoid;margin-bottom:14px;border-radius:20px;overflow:hidden;position:relative;aspect-ratio:4/3;cursor:zoom-in}
.he .e-gal a.t{aspect-ratio:3/4}.he .e-gal a.w{aspect-ratio:1}
.he .e-gal a b{position:absolute;inset:0;transition:transform 1.2s cubic-bezier(.2,.7,.1,1)}.he .e-gal a:hover b{transform:scale(1.06)}
.he .e-gal a span{position:absolute;left:12px;bottom:12px;padding:6px 12px;border-radius:99px;background:rgba(251,247,240,.92);font-size:12.5px;opacity:0;transform:translateY(6px);transition:.4s}
.he .e-gal a:hover span{opacity:1;transform:none}
.he .e-visit{display:grid;grid-template-columns:1.2fr 1fr;gap:clamp(16px,3cqi,32px);padding-bottom:clamp(56px,8cqi,96px)}
.he .e-vmap{border-radius:28px;overflow:hidden;min-height:380px;position:relative;box-shadow:0 0 0 1px var(--line)}
.he .e-vmap .hbtn{position:absolute;left:16px;bottom:16px}
.he .e-info{display:grid;gap:16px}
.he .e-box{background:var(--card);border-radius:24px;padding:26px;box-shadow:0 0 0 1px var(--line)}
.he .e-box h3{font-size:22px;margin-bottom:12px}
.he .e-box dl{display:grid;grid-template-columns:auto 1fr;gap:6px 22px;font-size:14.5px}.he .e-box dt{color:var(--mut)}
.he .e-box form{display:grid;gap:10px}
.he .e-box input,.he .e-box textarea{width:100%;padding:12px 14px;border-radius:14px;border:0;background:var(--bg);outline:none;font-size:14.5px;transition:box-shadow .2s}
.he .e-box input:focus,.he .e-box textarea:focus{box-shadow:0 0 0 2px var(--ter)}
.he .e-box textarea{height:90px;resize:none}.he .e-box .hbtn{justify-self:start}
.he footer{padding:clamp(40px,6cqi,64px) 0 30px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;font-size:13px;color:var(--mut)}
.he footer .e-fl{display:flex;gap:18px;flex-wrap:wrap}.he footer .e-fl a:hover{color:var(--ink)}
.he .e-mob{display:none}
@container (max-width:760px){
  .he .e-links,.he nav>.hbtn{display:none}.he .e-burger{display:grid}
  .he.menu-open .e-mob{display:grid;gap:4px;padding:6px 0 20px}
  .he .e-mob a{padding:12px 18px;border-radius:16px;background:var(--card);font:400 20px "Young Serif",serif}
  .he .e-mob a.cur{background:var(--ink);color:var(--card)}
  .he .e-hero,.he .e-band .w,.he .e-visitcard,.he .e-story,.he .e-visit,.he .e-menu{grid-template-columns:1fr}
  .he .e-favs,.he .e-vals{grid-template-columns:1fr}.he .e-strip{grid-template-columns:1fr 1fr}
  .he .e-pics{max-width:420px;width:100%;margin-inline:auto}
}
</style>
${lightbox}
<div class="w"><nav>${logo}<div class="e-links">${links.map(l => `<a data-hp="${l[0]}">${l[1]}</a>`).join("")}</div><a class="hbtn" data-hp="visit">Find us</a><button class="e-burger" data-menu aria-label="Menu"><i></i></button></nav>
  <div class="e-mob">${links.map(l => `<a data-hp="${l[0]}">${l[1]}</a>`).join("")}</div></div>
<main>
<section class="hp on" data-p="home">
  <div class="w e-hero"><div><span class="e-open"><i></i><span data-open>Open today from 7:30</span></span>
      <h1>Your morning,<br><em>made by hand.</em></h1>
      <p class="e-lead">A small coffee bar by the Oudegracht. We roast our own beans, bake before sunrise and know most of our guests by name.</p>
      <div class="e-acts"><a class="hbtn" data-hp="menu">See the menu</a><a class="hbtn gh" data-hp="story">Our story</a></div></div>
    <div class="e-pics" aria-hidden="true"><div class="e-big"></div><div class="e-small"></div><div class="e-stk">Fresh<br>since<br>7:30</div></div></div>
  <section class="sec" style="padding-top:0"><div class="w"><div class="e-head"><div><span class="e-kick rv">Most loved</span><h2 class="rv" style="--i:1">Our favourites</h2></div><a class="hbtn gh rv" data-hp="menu">Full menu →</a></div>
    <div class="e-favs">${favs.map((f, i) => `<a class="e-fav rv" style="--i:${i}" data-hp="menu"><i><b style="background:${ph(f[3], 700)}"></b></i><div><strong>${f[0]}</strong><span>€${f[2]}</span></div><p>${f[1]}</p></a>`).join("")}</div></div></section>
  <section class="sec e-band"><div class="w"><i class="rv" role="img" aria-label="Freshly roasted beans"></i><div><span class="e-kick rv" style="color:#55604B">Since 2016</span><h2 class="rv" style="--i:1">Roasted on Tuesday,<br>in your cup by Friday.</h2><p class="rv" style="--i:2">We started with one second-hand roaster and a lot of patience. Today we roast every week for the café and for neighbours who take a bag home.</p><a class="hbtn rv" style="--i:3;background:#55604B" data-hp="story">Read our story</a></div></div></section>
  <section class="sec"><div class="w"><div class="e-head"><div><span class="e-kick rv">A look inside</span><h2 class="rv" style="--i:1">The gallery</h2></div><a class="hbtn gh rv" data-hp="gallery">See all photos →</a></div>
    <div class="e-strip">${gal.slice(0, 4).map((g, i) => `<a class="rv" style="--i:${i}" data-lb="${g[0]}" data-cap="${g[1]}"><b style="background:${ph(g[0], 600)}"></b></a>`).join("")}</div></div></section>
  <section class="sec" style="padding-top:0"><div class="w"><div class="e-visitcard rv"><div><span class="e-kick" style="color:var(--butter)">Come by</span><h2>Oudegracht 112,<br>Utrecht</h2><p>Weekdays 7:30–17:00, weekends 9:00–17:00. Two minutes from the Dom tower.</p><a class="hbtn" data-hp="visit">Plan your visit</a></div><div class="e-map">${map}</div></div></div></section>
</section>

<section class="hp" data-p="menu"><div class="w">${head("The menu", "Everything we <em>pour and bake</em>", "Our beans are roasted in house, our milk comes from a farm near Lopik and oat milk never costs extra.")}
  <div class="e-menu">${menu.map((g, i) => `<div class="e-mc rv" style="--i:${i % 2}"><h3><i></i>${g[0]}</h3><ul>${g[1].map(m => `<li>${m[0]}<span>€${m[1]}</span></li>`).join("")}</ul></div>`).join("")}
    <div class="e-mc ph rv"><p>Taking beans home? This week’s roast is €12 for 250 g, ground for you if you like.</p></div>
    <div class="e-mc rv" style="--i:1"><h3><i style="background:var(--sage)"></i>Good to know</h3><p style="color:var(--mut)">Most bakes can be made without nuts on request. Ask us about allergens, we are happy to help.</p></div></div>
</div></section>

<section class="hp" data-p="story"><div class="w">${head("Our story", "Small, <em>on purpose</em>")}
  <div class="e-story"><div class="e-sp rv" role="img" aria-label="Inside Halden"></div><div><p class="big rv">Halden is one room, six tables and a long wooden bar. We opened in 2016 with a simple idea: do a few things, and do them really well.</p>
    <p class="rv" style="--i:1">Every Tuesday we roast in small batches. Every morning at six the first buns go into the oven. In between we brew, talk, and learn our guests’ orders by heart.</p>
    <p class="rv" style="--i:2">We buy green coffee from importers who visit the farms and pay above the market price. It costs a little more, and it tastes like it.</p>
    <p class="e-sign rv" style="--i:3">Sanne &amp; Joris, owners of Halden<br><small style="color:var(--mut);font-family:Onest,sans-serif">(made-up names for this demo)</small></p></div></div>
  <div class="e-vals">
    <div class="rv"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><ellipse cx="24" cy="24" rx="13" ry="18" transform="rotate(25 24 24)"/><path d="M28 8c-8 10 4 20-4 32"/></svg><h3>Roasted here</h3><p>Small batches every week, so nothing sits on a shelf for long.</p></div>
    <div class="rv" style="--i:1"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M8 30c0-9 7-15 16-15s16 6 16 15"/><path d="M6 30h36M14 30v6h20v-6"/></svg><h3>Baked at six</h3><p>Real butter, slow dough and a cardamom bun recipe we will never share.</p></div>
    <div class="rv" style="--i:2"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M24 40s-14-8-14-19a8 8 0 0 1 14-5 8 8 0 0 1 14 5c0 11-14 19-14 19z"/></svg><h3>Know your name</h3><p>A neighbourhood place. Stay for five minutes or for the whole morning.</p></div></div>
</div></section>

<section class="hp" data-p="gallery"><div class="w">${head("Gallery", "A look <em>inside Halden</em>", "Tap a photo to see it larger.")}
  <div class="e-gal">${gal.map((g, i) => `<a class="${g[2]} rv" style="--i:${i % 3}" data-lb="${g[0]}" data-cap="${g[1]}"><b style="background:${ph(g[0], 700)}"></b><span>${g[1]}</span></a>`).join("")}</div>
</div></section>

<section class="hp" data-p="visit"><div class="w">${head("Visit", "Come say <em>hello</em>", "Two minutes from the Dom tower, right on the water.")}
  <div class="e-visit"><div class="e-vmap rv">${map}<a class="hbtn" data-demo>Open in Google Maps</a></div>
    <div class="e-info"><div class="e-box rv" style="--i:1"><h3>Opening hours</h3><dl><dt>Mon–Fri</dt><dd>7:30 – 17:00</dd><dt>Sat–Sun</dt><dd>9:00 – 17:00</dd><dt>Address</dt><dd>Oudegracht 112, Utrecht</dd></dl></div>
      <div class="e-box rv" style="--i:2"><h3>Send us a note</h3><form onsubmit="return false"><input placeholder="Your name" aria-label="Your name"><input placeholder="Email" aria-label="Email"><textarea placeholder="Your message" aria-label="Message"></textarea><a class="hbtn" data-demo>Send message</a></form></div></div></div>
</div></section>
</main>
<div class="w"><footer>${logo.replace('class="e-logo"', 'class="e-logo" style="font-size:20px"')}<div class="e-fl">${links.map(l => `<a data-hp="${l[0]}">${l[1]}</a>`).join("")}</div><span>© 2026 Halden · a made-up café for this demo</span></footer></div>
</div>`;
  };

  /* =====================================================================
     BUSINESS: premium and complete. 10 pages.
     Brygada 1918 + Albert Sans. Forest, cream and brass. Rich motion, tabs, filters,
     a multi-step reservation, a pickup order form, an enquiry form with upload, and a try-the-editor mode (CMS).
     ===================================================================== */
  const business = () => {
    const pages = [["home", "Home", "Welcome to Halden"], ["menu", "Menu", "Coffee, kitchen and bakery"], ["coffee", "Our coffee", "This season’s roasts"], ["story", "Story", "Since 2016"], ["gallery", "Gallery", "Inside the koffiehuis"], ["events", "Events", "Tastings and evenings"], ["reserve", "Reserve", "Book a table"], ["order", "Order ahead", "Pick up at the bar"], ["private", "Private hire", "Meetings and catering"], ["visit", "Visit & contact", "Hours, map and questions"]];
    const ic = { v: "Vegetarian", vg: "Vegan", gf: "Gluten free" };
    const tag = t => t ? t.split(" ").map(x => `<abbr title="${ic[x]}">${x.toUpperCase()}</abbr>`).join("") : "";
    const menu = {
      Coffee: [["Espresso", "House blend, chocolate and red fruit", "2.80", ""], ["Cortado", "Equal parts espresso and steamed milk", "3.30", ""], ["Flat white", "Double ristretto, velvet milk", "3.90", ""], ["Pour over", "Single origin, brewed to order", "4.80", ""], ["Espresso tonic", "Over ice, with orange peel", "4.60", ""], ["Iced oat latte", "Oat milk at no extra cost", "4.40", "vg"]],
      "Tea & more": [["Masala chai", "Brewed in house with whole spices", "4.20", "v"], ["Ceremonial matcha", "Whisked, with oat or whole milk", "4.80", "v"], ["Fresh mint", "Mint, honey, lemon", "3.40", "vg"], ["Hot chocolate", "70% Ecuador, whipped cream", "4.20", "v"]],
      Kitchen: [["Halden breakfast", "Sourdough, eggs, greens, aged Gouda", "13.50", "v"], ["Shakshuka", "Spiced tomato, eggs, labneh, flatbread", "12.50", "v"], ["Granola bowl", "Yoghurt, roasted fruit, honey", "9.50", "v gf"], ["Mushroom toast", "Brown butter, thyme, sourdough", "11.00", "v"]],
      Bakery: [["Butter croissant", "Laminated over three days", "3.00", "v"], ["Cardamom bun", "Our most loved bake", "3.60", "v"], ["Pistachio cruffin", "Weekends only", "4.40", "v"], ["Olive oil cake", "Orange, almond", "4.20", "v gf"]],
    };
    const roasts = [["Guji", "Ethiopia", "Washed · 2,100 m", "Peach, jasmine, honey", [80, 35, 70], P.latteBeans, "€14"], ["Huila", "Colombia", "Washed · 1,750 m", "Red apple, caramel", [60, 55, 75], P.roast, "€13"], ["Cerrado", "Brazil", "Natural · 1,100 m", "Cocoa, hazelnut", [25, 85, 65], P.pour, "€12"], ["Cajamarca", "Peru · Decaf", "Sugarcane decaf", "Plum, milk chocolate", [40, 60, 70], P.pourover, "€13"]];
    const events = [["04", "Dec", "Thu · 19:30", "Coffee tasting", "Taste four origins side by side with our head roaster.", "€18"], ["12", "Dec", "Fri · 20:00", "Jazz by the canal", "A trio in the window and late-night espresso martinis.", "Free"], ["20", "Dec", "Sat · 10:00", "Home barista class", "Two hours on grind, dose and milk for home machines.", "€45"], ["09", "Jan", "Fri · 19:00", "Natural wine & bakes", "With our friends from a wine bar down the street.", "€22"]];
    const gal = [[P.interior, "cafe", "The front room"], [P.latteBeans, "coffee", "Guji, fresh from the roaster"], [P.croissant, "food", "Croissants, 7 am"], [P.night, "cafe", "Evenings at Halden"], [P.pourover, "coffee", "Pour over at the bar"], [P.brunch, "food", "Weekend brunch"], [P.cheers, "cafe", "Saturday morning"], [P.roast, "coffee", "Tuesday roast day"], [P.buns, "food", "Cardamom buns"]];
    const orderItems = [["Flat white", 3.9], ["Oat latte", 4.4], ["Pour over", 4.8], ["Espresso", 2.8], ["Butter croissant", 3.0], ["Cardamom bun", 3.6], ["Olive oil cake", 4.2], ["Beans, Guji 250 g", 14]];
    const days = (() => { const o = [], d = new Date(), wd = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], mo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; for (let i = 0; i < 6; i++) { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i); o.push([i === 0 ? "Today" : i === 1 ? "Tomorrow" : wd[x.getDay()], x.getDate() + " " + mo[x.getMonth()]]); } return o; })();
    const map = mapSvg({ land: "#1C2E26", road: "#2A4036", block: "#233830", water: "#3E6B63", pin: "#C9A063", label: "#7E978B", font: "Albert Sans, sans-serif", tag: "#EFE7D8", tagInk: "#13211B" });
    const mark = `<a class="z-mark" data-hp="home"><b>HALDEN</b><small>Koffiehuis · Utrecht</small></a>`;
    const head = (n, k, t, p, img) => `<header class="z-ph${img ? " img" : ""}"${img ? ` style="--img:${ph(img, 1600)}"` : ""}><div class="w"><span class="z-caps rv">${String(n).padStart(2, "0")} — ${k}</span><h1 class="rv" style="--i:1" data-ed>${t}</h1>${p ? `<p class="rv" style="--i:2" data-ed>${p}</p>` : ""}</div></header>`;
    const grid = `<svg viewBox="0 0 20 20" aria-hidden="true"><g fill="currentColor"><rect x="2" y="2" width="6" height="6" rx="1.5"/><rect x="12" y="2" width="6" height="6" rx="1.5"/><rect x="2" y="12" width="6" height="6" rx="1.5"/><rect x="12" y="12" width="6" height="6" rx="1.5"/></g></svg>`;
    return `<div class="hd hz">
<style>${BASE}
.hz{--fo:#13211B;--fo2:#1C2E26;--cr:#EFE7D8;--pa:#F7F2E9;--br:#B48A4C;--br2:#C9A063;--ink:#1B1A16;--mut:#6B6A5F;--line:rgba(27,26,22,.12);--lined:rgba(239,231,216,.14);background:var(--pa);color:var(--ink);font:400 15.5px/1.65 "Albert Sans",system-ui,sans-serif}
.hz .w{width:min(100% - 2*clamp(20px,5cqi,64px),1200px);margin-inline:auto}
.hz h1,.hz h2,.hz h3,.hz .serif{font-family:"Brygada 1918",Georgia,serif;font-weight:500;letter-spacing:-.02em}
.hz h1 i,.hz h2 i{font-style:italic;font-weight:400;color:var(--br)}
.hz .z-caps{display:inline-block;font-size:11.5px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--br)}
.hz .hbtn{display:inline-flex;align-items:center;gap:10px;padding:13px 22px;border-radius:2px;font-size:13.5px;font-weight:600;letter-spacing:.04em;background:var(--br);color:#fff;transition:background .35s,transform .35s cubic-bezier(.2,.7,.1,1),color .35s;position:relative;overflow:hidden}
.hz .hbtn:hover{background:var(--fo);transform:translateY(-2px)}
.hz .hbtn.ln{background:transparent;color:inherit;box-shadow:inset 0 0 0 1px currentColor}.hz .hbtn.ln:hover{background:var(--cr);color:var(--fo)}
.hz .hbtn.dk{background:var(--fo);color:var(--cr)}.hz .hbtn.dk:hover{background:var(--br)}
.hz .z-util{background:var(--fo);color:rgba(239,231,216,.72);font-size:12.5px}
.hz .z-util .w{display:flex;justify-content:space-between;gap:12px;padding:9px 0}
.hz .z-util i{display:inline-block;width:6px;height:6px;border-radius:50%;background:#7CC08F;margin-right:8px;box-shadow:0 0 0 3px rgba(124,192,143,.2);animation:zPulse 2s infinite}
@keyframes zPulse{50%{box-shadow:0 0 0 6px rgba(124,192,143,0)}}
.hz .z-nav{position:sticky;top:0;z-index:50;background:rgba(247,242,233,.88);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--line)}
.hz .z-nav .w{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:14px 0}
.hz .z-links{display:flex;gap:26px;font-size:13.5px;font-weight:500}
.hz .z-links a{position:relative;padding:4px 0}
.hz .z-links a::after{content:"";position:absolute;left:0;right:0;bottom:-2px;height:1px;background:var(--br);transform:scaleX(0);transform-origin:left;transition:transform .45s cubic-bezier(.2,.7,.1,1)}
.hz .z-links a:hover::after,.hz .z-links a.cur::after{transform:none}
.hz .z-mark{text-align:center;line-height:1}
.hz .z-mark b{display:block;font:600 24px "Brygada 1918",serif;letter-spacing:.32em;padding-left:.32em}
.hz .z-mark small{display:block;font-size:9.5px;letter-spacing:.34em;text-transform:uppercase;color:var(--mut);margin-top:5px;padding-left:.34em}
.hz .z-acts{display:flex;gap:8px;justify-content:end;align-items:center}
.hz .z-acts .hbtn{padding:10px 16px}
.hz .z-all{display:inline-flex;align-items:center;gap:8px;padding:10px 12px;font-size:13px;font-weight:600}
.hz .z-all svg{width:16px;height:16px;transition:transform .5s cubic-bezier(.2,.7,.1,1)}.hz .z-all:hover svg{transform:rotate(90deg)}
.hz .z-mega{position:absolute;left:0;right:0;top:0;height:var(--vh,640px);background:var(--fo);color:var(--cr);display:grid;grid-template-columns:1.4fr 1fr;opacity:0;visibility:hidden;transition:opacity .5s,visibility .5s;z-index:65}
.hz.menu-open .z-mega{opacity:1;visibility:visible}
.hz .z-mega>div{padding:clamp(24px,4cqi,48px);overflow:auto}
.hz .z-mtop{display:flex;justify-content:space-between;align-items:center;margin-bottom:clamp(20px,3cqi,36px)}
.hz .z-mtop .z-mark small{color:rgba(239,231,216,.55)}
.hz .z-x{width:42px;height:42px;border-radius:50%;box-shadow:inset 0 0 0 1px var(--lined);font-size:20px;line-height:1}
.hz .z-ml{display:grid;grid-template-columns:1fr 1fr;gap:0 32px}
.hz .z-ml a{display:grid;grid-template-columns:34px 1fr;padding:13px 0;border-bottom:1px solid var(--lined);opacity:0;transform:translateY(14px);transition:opacity .6s,transform .6s cubic-bezier(.2,.7,.1,1),color .3s}
.hz.menu-open .z-ml a{opacity:1;transform:none;transition-delay:calc(var(--i)*45ms + .1s)}
.hz .z-ml a span{font-size:11px;color:var(--br2);letter-spacing:.1em;padding-top:7px}
.hz .z-ml a b{font:500 clamp(20px,2.4cqi,28px)/1.1 "Brygada 1918",serif}
.hz .z-ml a small{display:block;font-size:12.5px;color:rgba(239,231,216,.55);margin-top:2px}
.hz .z-ml a:hover b,.hz .z-ml a.cur b{color:var(--br2);font-style:italic}
.hz .z-mph{background:${ph(P.night, 1000)};position:relative}
.hz .z-mph p{position:absolute;left:24px;right:24px;bottom:24px;padding:18px 20px;background:rgba(19,33,27,.82);backdrop-filter:blur(8px);font-size:13.5px;line-height:1.5}
.hz .z-hero{position:relative;min-height:clamp(560px,66cqi,780px);color:var(--cr);display:flex;align-items:end;overflow:hidden;isolation:isolate}
.hz .z-hero::before{content:"";position:absolute;inset:-4%;z-index:-2;background:${ph(P.night, 2000)};animation:zKen 22s ease-in-out infinite alternate}
.hz .z-hero::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(19,33,27,.25),rgba(19,33,27,.35) 40%,rgba(19,33,27,.92))}
@keyframes zKen{to{transform:scale(1.08) translate(-1.5%,-1%)}}
.hz .z-hero .w{display:grid;grid-template-columns:1.5fr 1fr;gap:32px;align-items:end;padding-bottom:clamp(36px,5cqi,64px)}
.hz .z-hero h1{font-size:clamp(46px,7.4cqi,104px);line-height:.96;margin:18px 0 22px}
.hz .z-hero h1 .ln{display:block;overflow:hidden}.hz .z-hero h1 .ln>span{display:inline-block;animation:zUp 1.2s cubic-bezier(.16,1,.3,1) both;animation-delay:calc(var(--i)*.12s + .15s)}
@keyframes zUp{from{transform:translateY(105%)}}
.hz .z-hero h1 i{color:var(--br2)}
.hz .z-hero p{max-width:44ch;color:rgba(239,231,216,.8);font-size:clamp(15px,1.5cqi,17px)}
.hz .z-hacts{display:flex;gap:10px;flex-wrap:wrap;margin-top:28px}
.hz .z-glass{background:rgba(239,231,216,.1);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);box-shadow:inset 0 0 0 1px rgba(239,231,216,.2);padding:22px;display:grid;grid-template-columns:72px 1fr;gap:16px;align-items:center;animation:hdpg 1.2s .8s both}
.hz .z-glass i{aspect-ratio:1;background:${ph(P.latteBeans, 300)};border-radius:50%}
.hz .z-glass b{display:block;font:500 20px/1.2 "Brygada 1918",serif;margin:4px 0}
.hz .z-glass small{color:rgba(239,231,216,.7)}
.hz .z-glass a{font-size:12.5px;font-weight:600;letter-spacing:.06em;color:var(--br2);display:inline-block;margin-top:6px}
.hz .z-marq{background:var(--fo2);color:var(--br2);overflow:hidden;white-space:nowrap;border-top:1px solid var(--lined)}
.hz .z-marq div{display:inline-flex;gap:40px;padding:16px 0;animation:zMarq 38s linear infinite;font:italic 400 20px "Brygada 1918",serif}
.hz .z-marq span::after{content:"✦";margin-left:40px;font-style:normal;font-size:12px;vertical-align:middle;opacity:.7}
@keyframes zMarq{to{transform:translateX(-50%)}}
.hz .sec{padding:clamp(64px,9cqi,120px) 0}
.hz .z-intro{display:grid;grid-template-columns:1fr 1.6fr;gap:clamp(28px,6cqi,96px);align-items:start}
.hz .z-intro p.big{font:400 clamp(24px,3cqi,38px)/1.28 "Brygada 1918",serif;letter-spacing:-.015em}
.hz .z-intro p.big i{color:var(--br)}
.hz .z-facts{display:grid;grid-template-columns:repeat(3,1fr);margin-top:40px;border-top:1px solid var(--line)}
.hz .z-facts div{padding:22px 20px 0 0}.hz .z-facts b{display:block;font:500 clamp(34px,4.2cqi,52px)/1 "Brygada 1918",serif;color:var(--fo)}
.hz .z-facts small{color:var(--mut);font-size:13px}
.hz .z-three{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.hz .z-card{position:relative;aspect-ratio:3/4.1;overflow:hidden;color:var(--cr);display:flex;flex-direction:column;justify-content:end;padding:24px;isolation:isolate}
.hz .z-card::before{content:"";position:absolute;inset:0;z-index:-2;background:var(--img);transition:transform 1.6s cubic-bezier(.2,.7,.1,1)}
.hz .z-card::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(rgba(19,33,27,0) 35%,rgba(19,33,27,.9));transition:background .6s}
.hz .z-card:hover::before{transform:scale(1.08)}
.hz .z-card h3{font-size:clamp(26px,2.8cqi,34px);margin:8px 0}
.hz .z-card p{font-size:14px;color:rgba(239,231,216,.78);max-height:0;opacity:0;overflow:hidden;transition:max-height .7s cubic-bezier(.2,.7,.1,1),opacity .5s}
.hz .z-card:hover p{max-height:90px;opacity:1}
.hz .z-card em{font-style:normal;font-size:12.5px;font-weight:600;letter-spacing:.08em;color:var(--br2);margin-top:12px}
.hz .z-dark{background:var(--fo);color:var(--cr)}
.hz .z-dark .z-caps{color:var(--br2)}
.hz .z-split{display:grid;grid-template-columns:1fr 1fr;align-items:stretch;min-height:clamp(420px,46cqi,580px)}
.hz .z-split .z-sp{background:var(--img);min-height:300px}
.hz .z-split .z-st{padding:clamp(36px,6cqi,88px);display:flex;flex-direction:column;justify-content:center;gap:18px}
.hz .z-split h2{font-size:clamp(34px,4.4cqi,58px);line-height:1.02}
.hz .z-split p{color:rgba(239,231,216,.72);max-width:40ch}
.hz .z-steps{display:flex;gap:26px;flex-wrap:wrap;font-size:13px;color:rgba(239,231,216,.8)}
.hz .z-steps span b{display:block;font:500 28px "Brygada 1918",serif;color:var(--br2)}
.hz .z-h2row{display:flex;justify-content:space-between;align-items:end;gap:16px;flex-wrap:wrap;margin-bottom:clamp(28px,4cqi,48px)}
.hz .z-h2row h2{font-size:clamp(34px,4.6cqi,60px);line-height:1.02;margin-top:10px}
.hz .z-ev{display:grid;grid-template-columns:96px 1fr auto auto;gap:24px;align-items:center;padding:22px 0;border-top:1px solid var(--line);transition:padding .5s cubic-bezier(.2,.7,.1,1),background .5s}
.hz .z-ev:last-child{border-bottom:1px solid var(--line)}
.hz .z-ev:hover{padding-left:14px;background:var(--cr)}
.hz .z-ev .d{font:500 46px/0.9 "Brygada 1918",serif;color:var(--fo)}.hz .z-ev .d small{display:block;font:600 11px "Albert Sans";letter-spacing:.2em;text-transform:uppercase;color:var(--br);margin-top:6px}
.hz .z-ev h3{font-size:24px}.hz .z-ev p{color:var(--mut);font-size:14px}
.hz .z-ev .when{font-size:13px;color:var(--mut);white-space:nowrap}.hz .z-ev .pr{font-weight:600}
.hz .z-quick{background:var(--cr);padding:clamp(28px,4cqi,48px);display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center}
.hz .z-quick h2{font-size:clamp(28px,3.4cqi,42px)}
.hz .z-qf{display:flex;gap:1px;background:var(--line)}
.hz .z-qf span{background:var(--pa);padding:12px 18px;font-size:14px;font-weight:600;min-width:110px}.hz .z-qf small{display:block;font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:var(--mut);font-weight:600}
.hz footer{background:var(--fo);color:rgba(239,231,216,.7);padding:clamp(56px,8cqi,96px) 0 28px;font-size:14px}
.hz .z-fg{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:32px}
.hz footer h4{font:600 11px "Albert Sans";letter-spacing:.22em;text-transform:uppercase;color:var(--br2);margin-bottom:14px}
.hz footer li{padding:3px 0}.hz footer a:hover{color:var(--cr)}
.hz footer .z-mark{text-align:left}.hz footer .z-mark b{color:var(--cr);padding-left:0}.hz footer .z-mark small{padding-left:0;color:rgba(239,231,216,.5)}
.hz .z-fb{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:56px;padding-top:22px;border-top:1px solid var(--lined);font-size:12.5px}
.hz .z-ph{padding:clamp(56px,8cqi,104px) 0 clamp(36px,5cqi,56px);border-bottom:1px solid var(--line)}
.hz .z-ph h1{font-size:clamp(44px,6.6cqi,92px);line-height:.98;margin:16px 0 0;max-width:14ch}
.hz .z-ph p{color:var(--mut);max-width:52ch;margin-top:20px;font-size:clamp(15px,1.5cqi,17px)}
.hz .z-ph.img{position:relative;color:var(--cr);border:0;isolation:isolate;padding-top:clamp(100px,14cqi,180px)}
.hz .z-ph.img::before{content:"";position:absolute;inset:0;z-index:-2;background:var(--img)}
.hz .z-ph.img::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(rgba(19,33,27,.3),rgba(19,33,27,.88))}
.hz .z-ph.img p{color:rgba(239,231,216,.8)}.hz .z-ph.img .z-caps{color:var(--br2)}.hz .z-ph.img h1 i{color:var(--br2)}
.hz .z-tabs{display:flex;gap:4px;border-bottom:1px solid var(--line);margin:clamp(32px,5cqi,56px) 0 0;overflow-x:auto}
.hz .z-tabs button{padding:14px 18px;font-size:14px;font-weight:600;color:var(--mut);position:relative;white-space:nowrap}
.hz .z-tabs button::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--br);transform:scaleX(0);transition:transform .45s cubic-bezier(.2,.7,.1,1)}
.hz .z-tabs button[aria-selected="true"]{color:var(--ink)}.hz .z-tabs button[aria-selected="true"]::after{transform:none}
.hz [data-panel]{display:none}.hz [data-panel].on{display:grid;animation:hdpg .6s cubic-bezier(.2,.7,.1,1) both}
.hz .z-mgrid{grid-template-columns:1fr 1fr;gap:0 clamp(28px,5cqi,72px);padding:12px 0 clamp(56px,8cqi,96px)}
.hz .z-mi{display:grid;grid-template-columns:1fr auto;gap:2px 20px;padding:20px 0;border-bottom:1px solid var(--line)}
.hz .z-mi b{font:500 21px "Brygada 1918",serif}.hz .z-mi span{font-weight:600;font-variant-numeric:tabular-nums}
.hz .z-mi p{color:var(--mut);font-size:14px;grid-column:1/-1}
.hz abbr{text-decoration:none;font-size:9.5px;font-weight:700;letter-spacing:.06em;margin-left:8px;padding:2px 5px;border:1px solid var(--br);color:var(--br);border-radius:2px;vertical-align:3px}
.hz .z-roasts{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;padding:clamp(40px,6cqi,72px) 0}
.hz .z-ro{display:grid;grid-template-columns:.9fr 1fr;background:#fff;box-shadow:0 0 0 1px var(--line);transition:box-shadow .5s,transform .5s cubic-bezier(.2,.7,.1,1)}
.hz .z-ro:hover{transform:translateY(-4px);box-shadow:0 0 0 1px var(--line),0 40px 60px -40px rgba(19,33,27,.5)}
.hz .z-ro i{background:var(--img);min-height:220px}
.hz .z-ro>div{padding:24px;display:flex;flex-direction:column;gap:6px}
.hz .z-ro h3{font-size:30px;line-height:1}.hz .z-ro .o{font-size:13px;color:var(--mut)}
.hz .z-ro .n{font:italic 400 17px "Brygada 1918",serif;color:var(--br);margin:4px 0 8px}
.hz .z-bar{display:grid;grid-template-columns:80px 1fr;align-items:center;gap:10px;font-size:12px;color:var(--mut)}
.hz .z-bar u{display:block;height:3px;background:var(--cr);position:relative;text-decoration:none}
.hz .z-bar u::after{content:"";position:absolute;inset:0;width:var(--v);background:var(--fo);transform:scaleX(0);transform-origin:left;transition:transform 1.4s cubic-bezier(.16,1,.3,1) .3s}
.hz .rv.in .z-bar u::after{transform:none}
.hz .z-ro .ft{display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:14px;font-weight:600}
.hz .z-proc{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;padding-bottom:clamp(56px,8cqi,96px)}
.hz .z-proc div{border-top:1px solid var(--fo);padding-top:18px}.hz .z-proc b{font:italic 400 44px/1 "Brygada 1918",serif;color:var(--br)}
.hz .z-proc h3{font-size:24px;margin:14px 0 6px}.hz .z-proc p{color:var(--mut);font-size:14.5px}
.hz .z-quote{font:italic 400 clamp(26px,3.4cqi,44px)/1.25 "Brygada 1918",serif;max-width:26ch;padding:clamp(56px,8cqi,104px) 0;margin-inline:auto;text-align:center}
.hz .z-quote small{display:block;font:600 11px "Albert Sans";letter-spacing:.22em;text-transform:uppercase;color:var(--br);margin-top:22px}
.hz .z-tl{position:relative;padding-bottom:clamp(56px,8cqi,96px)}
.hz .z-tl::before{content:"";position:absolute;left:50%;top:0;bottom:clamp(56px,8cqi,96px);width:1px;background:var(--line)}
.hz .z-tli{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,6cqi,96px);align-items:center;padding:24px 0}
.hz .z-tli i{aspect-ratio:4/3;background:var(--img)}
.hz .z-tli:nth-child(even) i{order:2}
.hz .z-tli b{font:500 clamp(40px,5cqi,64px)/1 "Brygada 1918",serif;color:var(--br)}
.hz .z-tli h3{font-size:26px;margin:8px 0}.hz .z-tli p{color:var(--mut);max-width:40ch}
.hz .z-filt{display:flex;gap:8px;flex-wrap:wrap;padding:clamp(28px,4cqi,40px) 0 24px}
.hz .z-filt button{padding:9px 18px;border-radius:99px;font-size:13.5px;font-weight:600;box-shadow:inset 0 0 0 1px var(--line);transition:.3s}
.hz .z-filt button[aria-pressed="true"]{background:var(--fo);color:var(--cr);box-shadow:none}
.hz .z-gal{display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:clamp(160px,20cqi,260px);gap:12px;padding-bottom:clamp(56px,8cqi,96px)}
.hz .z-gal a{position:relative;overflow:hidden;cursor:zoom-in;transition:opacity .5s,transform .5s}
.hz .z-gal a:nth-child(4n+1){grid-row:span 2}
.hz .z-gal a b{position:absolute;inset:0;transition:transform 1.4s cubic-bezier(.2,.7,.1,1)}.hz .z-gal a:hover b{transform:scale(1.06)}
.hz .z-gal a span{position:absolute;left:0;right:0;bottom:0;padding:30px 16px 14px;color:var(--cr);font-size:13px;background:linear-gradient(transparent,rgba(19,33,27,.8));opacity:0;transition:opacity .4s}
.hz .z-gal a:hover span{opacity:1}
.hz .z-gal a.off{display:none}
.hz .z-form{display:grid;grid-template-columns:1.5fr 1fr;gap:clamp(20px,4cqi,48px);padding:clamp(40px,6cqi,72px) 0 clamp(56px,8cqi,96px);align-items:start}
.hz .z-panel{background:#fff;box-shadow:0 0 0 1px var(--line);padding:clamp(22px,4cqi,44px)}
.hz .z-prog{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:28px}
.hz .z-prog span{font-size:11.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--mut);padding-top:10px;border-top:2px solid var(--cr);transition:.4s}
.hz .z-prog span.on{color:var(--ink);border-color:var(--br)}
.hz [data-step]{display:none}.hz [data-step].on{display:block;animation:hdpg .5s both}
.hz .z-lbl{display:block;font-size:11.5px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--mut);margin:20px 0 10px}
.hz .z-lbl:first-child{margin-top:0}
.hz .z-chips{display:flex;flex-wrap:wrap;gap:8px}
.hz .z-chips button{padding:10px 14px;font-size:13.5px;box-shadow:inset 0 0 0 1px var(--line);transition:.25s;min-width:84px;text-align:center;line-height:1.25}
.hz .z-chips button small{display:block;font-size:11px;color:var(--mut)}
.hz .z-chips button:hover{box-shadow:inset 0 0 0 1px var(--fo)}
.hz .z-chips button[aria-pressed="true"]{background:var(--fo);color:var(--cr);box-shadow:none}.hz .z-chips button[aria-pressed="true"] small{color:rgba(239,231,216,.6)}
.hz .z-inp{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.hz .z-inp label{display:grid;gap:6px;font-size:12px;font-weight:600;color:var(--mut)}
.hz .z-inp label.zfull{grid-column:1/-1}
.hz .z-inp input,.hz .z-inp textarea,.hz .z-inp select{width:100%;padding:13px 14px;border:0;background:var(--pa);box-shadow:inset 0 0 0 1px var(--line);outline:none;font-size:15px;font-weight:400;color:var(--ink);transition:box-shadow .25s}
.hz .z-inp input:focus,.hz .z-inp textarea:focus,.hz .z-inp select:focus{box-shadow:inset 0 0 0 1.5px var(--br)}
.hz .z-inp textarea{height:96px;resize:none}
.hz .z-file{display:flex;align-items:center;gap:12px;padding:16px;border:1.5px dashed rgba(27,26,22,.25);font-size:13.5px;color:var(--mut)}
.hz .z-file b{color:var(--ink)}
.hz .z-check{display:flex;gap:10px;align-items:center;font-size:14px;margin-top:16px}
.hz .z-check input{accent-color:var(--fo);width:18px;height:18px}
.hz .z-nx{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:28px;padding-top:22px;border-top:1px solid var(--line)}
.hz .z-nx .back{font-size:13.5px;font-weight:600;color:var(--mut)}
.hz .z-sum dl{display:grid;grid-template-columns:auto 1fr;gap:10px 24px;font-size:15px}.hz .z-sum dt{color:var(--mut)}.hz .z-sum dd{font-weight:600}
.hz .z-done{text-align:center;padding:24px 0}
.hz .z-done svg{width:64px;height:64px;color:var(--br)}
.hz .z-done svg path{stroke-dasharray:60;stroke-dashoffset:60;animation:zDraw 1s .2s cubic-bezier(.6,0,.2,1) forwards}
@keyframes zDraw{to{stroke-dashoffset:0}}
.hz .z-done h3{font-size:32px;margin:14px 0 8px}.hz .z-done p{color:var(--mut);max-width:40ch;margin-inline:auto}
.hz .z-aside{display:grid;gap:12px}
.hz .z-aside>div{padding:24px;background:var(--cr)}
.hz .z-aside h3{font-size:22px;margin-bottom:8px}.hz .z-aside p{font-size:14px;color:var(--mut)}
.hz .z-aside .ph{min-height:220px;background:var(--img)}
.hz .z-oi{display:grid;grid-template-columns:1fr auto auto;gap:16px;align-items:center;padding:14px 0;border-bottom:1px solid var(--line)}
.hz .z-oi b{font:500 19px "Brygada 1918",serif}.hz .z-oi small{display:block;color:var(--mut);font-size:13px}
.hz .z-qty{display:flex;align-items:center;box-shadow:inset 0 0 0 1px var(--line)}
.hz .z-qty button{width:34px;height:34px;font-size:18px;line-height:1}.hz .z-qty button:hover{background:var(--cr)}
.hz .z-qty output{width:28px;text-align:center;font-weight:600;font-variant-numeric:tabular-nums}
.hz .z-bag{position:sticky;top:96px;background:var(--fo);color:var(--cr);padding:28px}
.hz .z-bag h3{font-size:26px}.hz .z-bag ul{margin:16px 0;font-size:14px;color:rgba(239,231,216,.8);min-height:40px}
.hz .z-bag li{display:flex;justify-content:space-between;padding:4px 0}
.hz .z-bag .tot{display:flex;justify-content:space-between;font:500 24px "Brygada 1918",serif;padding-top:14px;border-top:1px solid var(--lined)}
.hz .z-bag select{width:100%;margin:14px 0;padding:12px;background:var(--fo2);color:var(--cr);border:0;box-shadow:inset 0 0 0 1px var(--lined)}
.hz .z-bag .hbtn{width:100%;justify-content:center}.hz .z-bag p{font-size:12.5px;color:rgba(239,231,216,.55);margin-top:12px}
.hz .z-opts{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:clamp(40px,6cqi,72px) 0 0}
.hz .z-opt{background:#fff;box-shadow:0 0 0 1px var(--line);display:flex;flex-direction:column}
.hz .z-opt i{aspect-ratio:16/10;background:var(--img)}
.hz .z-opt div{padding:22px}.hz .z-opt h3{font-size:24px}.hz .z-opt p{color:var(--mut);font-size:14px;margin:6px 0 12px}
.hz .z-opt small{font-weight:600;color:var(--br);letter-spacing:.04em}
.hz .z-visit{display:grid;grid-template-columns:1.3fr 1fr;gap:0;margin:clamp(40px,6cqi,72px) 0 0;background:var(--fo);color:var(--cr)}
.hz .z-vmap{min-height:420px;position:relative}
.hz .z-vmap .hbtn{position:absolute;left:18px;bottom:18px}
.hz .z-hours{padding:clamp(28px,4cqi,44px)}
.hz .z-hours h3{font-size:28px;margin:10px 0 18px}
.hz .z-hours li{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--lined);font-size:14.5px;color:rgba(239,231,216,.75)}
.hz .z-hours li.today{color:var(--cr);font-weight:600}.hz .z-hours li.today span::after{content:" · today";color:var(--br2);font-weight:400}
.hz .z-status{display:inline-flex;align-items:center;gap:8px;font-size:13px;padding:6px 12px;background:rgba(124,192,143,.14);color:#A9DDB7}
.hz .z-status.shut{background:rgba(201,160,99,.14);color:var(--br2)}
.hz .z-faq{padding:clamp(56px,8cqi,96px) 0;display:grid;grid-template-columns:1fr 1.6fr;gap:clamp(28px,6cqi,96px)}
.hz details{border-bottom:1px solid var(--line)}
.hz summary{list-style:none;cursor:pointer;display:flex;justify-content:space-between;gap:16px;padding:20px 0;font:500 20px "Brygada 1918",serif}
.hz summary::-webkit-details-marker{display:none}
.hz summary::after{content:"+";font:300 26px/1 "Albert Sans";color:var(--br);transition:transform .4s}
.hz details[open] summary::after{transform:rotate(45deg)}
.hz details p{color:var(--mut);padding:0 0 20px;max-width:56ch}
.hz [data-ed][contenteditable="true"]{outline:1.5px dashed var(--br);outline-offset:6px;cursor:text}
.hz [data-ed][contenteditable="true"]:focus{outline-style:solid;background:rgba(180,138,76,.08)}
.hz .z-cms{position:sticky;bottom:0;height:0;z-index:58}
.hz .z-cms>div{position:absolute;right:16px;bottom:16px;display:flex;align-items:center;gap:12px;background:var(--ink);color:var(--cr);padding:8px 8px 8px 16px;border-radius:99px;font-size:13px;box-shadow:0 20px 40px -20px rgba(0,0,0,.5)}
.hz .z-cms span{max-width:0;overflow:hidden;white-space:nowrap;transition:max-width .6s cubic-bezier(.2,.7,.1,1);color:rgba(239,231,216,.75)}
.hz.cms-on .z-cms span{max-width:360px}
.hz .z-cms button{padding:9px 14px;border-radius:99px;background:var(--br);color:#fff;font-weight:600;font-size:12.5px}
.hz .z-burger{display:none}
@container (max-width:860px){
  .hz .z-links,.hz .z-acts .hbtn.ln,.hz .z-all span{display:none}
  .hz .z-nav .w{grid-template-columns:auto 1fr auto}.hz .z-nav .z-mark{grid-column:1;grid-row:1;text-align:left}.hz .z-nav .z-mark b,.hz .z-nav .z-mark small{padding-left:0}
  .hz .z-acts{grid-column:3}
  .hz .z-mega{grid-template-columns:1fr}.hz .z-mph{display:none}.hz .z-ml{grid-template-columns:1fr}
  .hz .z-hero .w,.hz .z-intro,.hz .z-split,.hz .z-form,.hz .z-visit,.hz .z-faq,.hz .z-quick,.hz .z-tli{grid-template-columns:1fr}
  .hz .z-tli:nth-child(even) i{order:0}.hz .z-tl::before{display:none}
  .hz .z-three,.hz .z-roasts,.hz .z-proc,.hz .z-opts,.hz .z-mgrid{grid-template-columns:1fr}
  .hz .z-card{aspect-ratio:4/3.6}.hz .z-card p{max-height:90px;opacity:1}
  .hz .z-fg{grid-template-columns:1fr 1fr}
  .hz .z-ev{grid-template-columns:72px 1fr;gap:6px 18px}.hz .z-ev .when,.hz .z-ev .pr{grid-column:2}
  .hz .z-gal{grid-template-columns:1fr 1fr}
  .hz .z-ro{grid-template-columns:1fr}.hz .z-ro i{min-height:180px}
  .hz .z-util .w span:last-child{display:none}
  .hz .z-bag{position:static}
  .hz .z-qf{flex-wrap:wrap}
  .hz .z-cms span{display:none}
  .hz .z-hero .w{padding-top:64px}
}
</style>
<div class="h-ov"><div class="h-lb" data-lbx><i></i><span></span></div>
  <div class="z-mega" role="dialog" aria-label="All pages"><div><div class="z-mtop">${mark}<button class="z-x" data-menu aria-label="Close menu">×</button></div>
    <div class="z-ml">${pages.map((p, i) => `<a data-hp="${p[0]}" style="--i:${i}"><span>${String(i + 1).padStart(2, "0")}</span><div><b>${p[1]}</b><small>${p[2]}</small></div></a>`).join("")}</div></div>
    <div class="z-mph"><p>Open every day · Oudegracht 112, Utrecht<br><span style="color:var(--br2)" data-open>Open today from 7:30</span></p></div></div></div>
<div class="z-util"><div class="w"><span><i></i><span data-open>Open today from 7:30</span> · Oudegracht 112, Utrecht</span><span>NL / EN · Gift cards · Wholesale</span></div></div>
<div class="z-nav"><div class="w"><div class="z-links"><a data-hp="menu">Menu</a><a data-hp="coffee">Coffee</a><a data-hp="events">Events</a><a data-hp="story">Story</a></div>${mark}
  <div class="z-acts"><a class="hbtn ln" data-hp="order">Order ahead</a><a class="hbtn" data-hp="reserve">Reserve</a><button class="z-all" data-menu aria-label="All pages">${grid}<span>All pages</span></button></div></div></div>
<main>
<section class="hp on" data-p="home">
  <div class="z-hero"><div class="w"><div><span class="z-caps" style="color:var(--br2)">Koffiehuis · Utrecht · Since 2016</span>
      <h1 data-ed><span class="ln"><span style="--i:0">Slow coffee,</span></span><span class="ln"><span style="--i:1"><i>beautifully</i> served.</span></span></h1>
      <p data-ed>Speciality coffee roasted in house, a kitchen that bakes from six, and a long room on the Oudegracht that feels like yours.</p>
      <div class="z-hacts"><a class="hbtn" data-hp="reserve">Reserve a table</a><a class="hbtn ln" data-hp="menu">View the menu</a></div></div>
    <div class="z-glass"><i></i><div><span class="z-caps" style="color:var(--br2);font-size:10px">This week’s roast</span><b>Guji, Ethiopia</b><small>Peach, jasmine and honey</small><br><a data-hp="coffee">Meet the coffee →</a></div></div></div></div>
  <div class="z-marq" aria-hidden="true"><div>${Array(2).fill(["Roasted every Tuesday", "Baked at six", "Jazz on Fridays", "Private hire", "Order ahead, skip the queue", "Oat milk, never extra"].map(t => `<span>${t}</span>`).join("")).join("")}</div></div>
  <section class="sec"><div class="w z-intro"><span class="z-caps rv">Welcome</span><div><p class="big rv" style="--i:1" data-ed>A koffiehuis in the old sense: a place to meet, to read, to work a little, and to drink <i>really good coffee</i> made by people who care.</p>
    <div class="z-facts rv" style="--i:2"><div><b>6</b><small>tables and a long bar</small></div><div><b>1</b><small>roaster, fired up every Tuesday</small></div><div><b>7</b><small>days a week, from 7:30</small></div></div></div></div></section>
  <section class="sec" style="padding-top:0"><div class="w"><div class="z-three">
    ${[["The café", "Breakfast, brunch and bakes from our own kitchen, all day.", P.interior, "menu", "See the menu"], ["The roastery", "Four seasonal coffees, roasted a few metres from your table.", P.roast, "coffee", "Our coffee"], ["The evenings", "Tastings, classes and jazz when the canal lights come on.", P.cheers, "events", "What’s on"]].map((c, i) => `<a class="z-card rv" style="--i:${i};--img:${ph(c[2], 900)}" data-hp="${c[3]}"><span class="z-caps" style="color:var(--br2)">0${i + 1}</span><h3>${c[0]}</h3><p>${c[1]}</p><em>${c[4]} →</em></a>`).join("")}</div></div></section>
  <section class="z-dark"><div class="z-split"><div class="z-sp rv" style="--img:${ph(P.pour, 1200)}"></div><div class="z-st"><span class="z-caps rv">Order ahead</span><h2 class="rv" style="--i:1">Skip the queue.<br><i>Pick up at the bar.</i></h2><p class="rv" style="--i:2">Choose your coffee and bakes, pick a time, and we will have it ready. You pay at the counter.</p>
    <div class="z-steps rv" style="--i:3"><span><b>01</b>Choose</span><span><b>02</b>Pick a time</span><span><b>03</b>Collect</span></div><a class="hbtn rv" style="--i:4;align-self:start" data-hp="order">Start an order</a></div></div></section>
  <section class="sec"><div class="w"><div class="z-h2row"><div><span class="z-caps rv">At Halden</span><h2 class="rv" style="--i:1">Evenings <i>&amp;</i> events</h2></div><a class="hbtn ln rv" data-hp="events">All events</a></div>
    ${events.slice(0, 3).map((e, i) => `<a class="z-ev rv" style="--i:${i}" data-hp="reserve"><div class="d">${e[0]}<small>${e[1]}</small></div><div><h3>${e[3]}</h3><p>${e[4]}</p></div><span class="when">${e[2]}</span><span class="pr">${e[5]}</span></a>`).join("")}</div></section>
  <section class="sec" style="padding-top:0"><div class="w"><div class="z-quick rv"><div><span class="z-caps">Reservations</span><h2>Save the window seat.</h2></div>
    <div><div class="z-qf"><span><small>Date</small>${days[1][0]}</span><span><small>Time</small>10:30</span><span><small>Guests</small>2</span></div><a class="hbtn dk" style="margin-top:10px;width:100%;justify-content:center" data-hp="reserve">Find a table</a></div></div></div></section>
</section>

<section class="hp" data-p="menu">${head(2, "Menu", "Made slowly, <i>served simply.</i>", "Everything is made in house, from the bread to the chai. Tap a section to browse.", P.brunch)}
  <div class="w" data-tabs><div class="z-tabs" role="tablist">${Object.keys(menu).map((k, i) => `<button role="tab" aria-selected="${i === 0}" data-tab="${i}">${k}</button>`).join("")}</div>
    ${Object.values(menu).map((list, i) => `<div class="z-mgrid${i === 0 ? " on" : ""}" data-panel="${i}">${list.map(m => `<div class="z-mi"><b data-ed>${m[0]}${tag(m[3])}</b><span>€${m[2]}</span><p data-ed>${m[1]}</p></div>`).join("")}</div>`).join("")}
    <p style="color:var(--mut);font-size:13px;padding-bottom:clamp(56px,8cqi,96px)">V vegetarian · VG vegan · GF gluten free. Ask us about allergens.</p></div>
</section>

<section class="hp" data-p="coffee">${head(3, "Our coffee", "Four coffees, <i>roasted here.</i>", "We roast every Tuesday in small batches and change our line-up with the harvests.")}
  <div class="w"><div class="z-roasts">${roasts.map((r, i) => `<div class="z-ro rv" style="--i:${i % 2}"><i style="--img:${ph(r[5], 700)}"></i><div><span class="z-caps">${r[1]}</span><h3>${r[0]}</h3><span class="o">${r[2]}</span><span class="n">${r[3]}</span>
      ${["Acidity", "Body", "Sweetness"].map((t, j) => `<div class="z-bar">${t}<u style="--v:${r[4][j]}%"></u></div>`).join("")}<div class="ft"><span>${r[6]} · 250 g</span><a class="z-caps" data-hp="order">Order →</a></div></div></div>`).join("")}</div>
    <div class="z-proc">${[["Sourced", "We buy through importers who visit the farms and pay above market price."], ["Roasted", "Light enough to taste the origin, developed enough to be sweet."], ["Rested", "Every batch rests for a few days before it goes into the grinder."]].map((s, i) => `<div class="rv" style="--i:${i}"><b>0${i + 1}</b><h3>${s[0]}</h3><p>${s[1]}</p></div>`).join("")}</div></div>
</section>

<section class="hp" data-p="story">${head(4, "Story", "A koffiehuis, <i>since 2016.</i>", "How one second-hand roaster and a long room on the canal became Halden.", P.interior)}
  <div class="w"><p class="z-quote rv" data-ed>“We wanted a place where the coffee is serious and nothing else is.”<small>Sanne &amp; Joris, owners (made-up names for this demo)</small></p>
    <div class="z-tl">${[["2016", "The doors open", "Six tables, one espresso machine and a second-hand roaster in the back.", P.interior], ["2018", "Baking from six", "Our own kitchen opens, and the cardamom bun becomes a local habit.", P.buns], ["2021", "A real roastery", "A new roaster, four seasonal coffees and beans to take home.", P.roast], ["2024", "Evenings at Halden", "Tastings, classes and jazz in the window once a month.", P.night]].map((t, i) => `<div class="z-tli rv"><i style="--img:${ph(t[3], 800)}"></i><div><b>${t[0]}</b><h3>${t[1]}</h3><p>${t[2]}</p></div></div>`).join("")}</div></div>
</section>

<section class="hp" data-p="gallery">${head(5, "Gallery", "Inside <i>the koffiehuis.</i>")}
  <div class="w" data-filters><div class="z-filt">${[["all", "All"], ["cafe", "The café"], ["coffee", "Coffee"], ["food", "Food"]].map((f, i) => `<button data-filter="${f[0]}" aria-pressed="${i === 0}">${f[1]}</button>`).join("")}</div>
    <div class="z-gal">${gal.map(g => `<a data-cat="${g[1]}" data-lb="${g[0]}" data-cap="${g[2]}"><b style="background:${ph(g[0], 800)}"></b><span>${g[2]}</span></a>`).join("")}</div></div>
</section>

<section class="hp" data-p="events">${head(6, "Events", "Evenings <i>&amp; tastings.</i>", "Small groups, good coffee and the canal outside the window. Seats are limited.", P.night)}
  <div class="w" style="padding:clamp(40px,6cqi,72px) 0 clamp(56px,8cqi,96px)">${events.map((e, i) => `<a class="z-ev rv" style="--i:${i}" data-hp="reserve"><div class="d">${e[0]}<small>${e[1]}</small></div><div><h3>${e[3]}</h3><p>${e[4]}</p></div><span class="when">${e[2]}</span><span class="pr">${e[5]} · Book →</span></a>`).join("")}</div>
</section>

<section class="hp" data-p="reserve">${head(7, "Reserve", "Book <i>a table.</i>", "Three quick steps. You get a confirmation by email straight away.")}
  <div class="w z-form"><div class="z-panel" data-steps>
    <div class="z-prog"><span class="on">1 · When</span><span>2 · Details</span><span>3 · Confirm</span></div>
    <div data-step="0" class="on"><span class="z-lbl">Day</span><div class="z-chips" data-chips="day">${days.map((d, i) => `<button aria-pressed="${i === 1}" data-v="${d[0]}, ${d[1]}">${d[0]}<small>${d[1]}</small></button>`).join("")}</div>
      <span class="z-lbl">Time</span><div class="z-chips" data-chips="time">${["8:30", "9:30", "10:30", "11:30", "12:30", "14:00", "15:30"].map((t, i) => `<button aria-pressed="${i === 2}" data-v="${t}">${t}</button>`).join("")}</div>
      <span class="z-lbl">Guests</span><div class="z-chips" data-chips="guests">${["1", "2", "3", "4", "5", "6+"].map((t, i) => `<button aria-pressed="${i === 1}" data-v="${t}">${t}</button>`).join("")}</div>
      <div class="z-nx"><span class="back"></span><button class="hbtn" data-next>Continue</button></div></div>
    <div data-step="1"><div class="z-inp"><label>Name<input placeholder="Your name"></label><label>Phone<input placeholder="06 1234 5678"></label><label class="zfull">Email<input placeholder="you@example.com"></label><label class="zfull">Anything we should know?<textarea placeholder="Allergies, a birthday, a pram…"></textarea></label></div>
      <label class="z-check"><input type="checkbox" checked> Window seat if possible</label>
      <div class="z-nx"><button class="back" data-prev>← Back</button><button class="hbtn" data-next>Review booking</button></div></div>
    <div data-step="2" class="z-sum"><dl><dt>Day</dt><dd data-show="day"></dd><dt>Time</dt><dd data-show="time"></dd><dt>Guests</dt><dd data-show="guests"></dd><dt>Where</dt><dd>Halden, Oudegracht 112</dd></dl>
      <div class="z-nx"><button class="back" data-prev>← Back</button><button class="hbtn" data-next>Confirm booking</button></div></div>
    <div data-step="3" class="z-done"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="32" cy="32" r="29" opacity=".3"/><path d="M19 33l9 9 17-19"/></svg><h3>See you soon.</h3><p>This is a demo, so nothing was booked. On the real site the guest gets a confirmation email and the café gets the booking.</p><button class="hbtn ln" style="margin-top:20px" data-restart>Make another booking</button></div>
  </div>
  <div class="z-aside"><div class="ph rv" style="--img:${ph(P.cheers, 800)}"></div><div class="rv" style="--i:1"><h3>Groups of 7 or more?</h3><p>We can close part of the room for you. Have a look at private hire.</p><a class="z-caps" style="margin-top:10px" data-hp="private">Private hire →</a></div></div></div>
</section>

<section class="hp" data-p="order">${head(8, "Order ahead", "Ready <i>when you are.</i>", "Pick your order and a time. We will have it at the bar, you pay when you collect.")}
  <div class="w z-form" data-order><div><span class="z-lbl" style="margin-top:0">Coffee and bakes</span>${orderItems.map((o, i) => `<div class="z-oi" data-item="${o[0]}" data-price="${o[1]}"><div><b>${o[0]}</b><small>€${o[1].toFixed(2)}</small></div><div class="z-qty"><button data-qty="-1" aria-label="One less">−</button><output>0</output><button data-qty="1" aria-label="One more">+</button></div></div>`).join("")}</div>
    <div class="z-bag"><h3>Your order</h3><ul data-bag><li style="opacity:.6">Nothing yet. Add something on the left.</li></ul><div class="tot"><span>Total</span><span data-total>€0.00</span></div>
      <select aria-label="Pickup time">${["As soon as possible", "In 15 minutes", "In 30 minutes", "At 12:00"].map(t => `<option>${t}</option>`).join("")}</select><a class="hbtn" data-demo>Send order · pay at the counter</a><p>Orders arrive at the bar by email. Online payment can be added as an extra.</p></div></div>
</section>

<section class="hp" data-p="private">${head(9, "Private hire", "Your morning, <i>your room.</i>", "Team breakfasts, evening hire and coffee catering for offices in Utrecht.", P.brunch)}
  <div class="w"><div class="z-opts">${[["Morning meeting", "Up to 14 guests, coffee and bakes, 8:00 to 10:30.", "From €18 per guest", P.croissant], ["Evening hire", "The whole room after closing, with a barista or a tasting.", "From €650", P.night], ["Coffee catering", "We bring a bar, beans and a barista to your office.", "From €390", P.pour]].map((o, i) => `<div class="z-opt rv" style="--i:${i}"><i style="--img:${ph(o[3], 800)}"></i><div><h3>${o[0]}</h3><p>${o[1]}</p><small>${o[2]}</small></div></div>`).join("")}</div>
    <div class="z-form"><div class="z-panel rv"><span class="z-lbl">Tell us about your event</span><div class="z-inp"><label>Name<input></label><label>Company<input placeholder="Optional"></label><label>Email<input></label><label>Guests<select><option>Up to 10</option><option>10 to 20</option><option>20 to 40</option><option>More than 40</option></select></label><label class="zfull">What do you have in mind?<textarea></textarea></label></div>
      <span class="z-lbl">Attach a brief or floor plan</span><div class="z-file"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 16V4M7 9l5-5 5 5M4 20h16"/></svg><span><b>Choose a file</b> or drop it here · PDF, JPG, up to 10 MB</span></div>
      <div class="z-nx"><span class="back">We reply within one working day.</span><a class="hbtn" data-demo>Send enquiry</a></div></div>
      <div class="z-aside"><div class="rv"><h3>Good to know</h3><p>We can do vegan and gluten-free menus. Evening hire includes the music system and the window bar.</p></div></div></div></div>
</section>

<section class="hp" data-p="visit">${head(10, "Visit & contact", "Find us <i>on the canal.</i>")}
  <div class="w"><div class="z-visit rv"><div class="z-vmap">${map}<a class="hbtn" data-demo>Get directions</a></div>
    <div class="z-hours"><span class="z-status" data-status>Open now</span><h3>Opening hours</h3><ul data-hours>${[["Monday", "7:30 – 18:00"], ["Tuesday", "7:30 – 18:00"], ["Wednesday", "7:30 – 18:00"], ["Thursday", "7:30 – 18:00"], ["Friday", "7:30 – 22:00"], ["Saturday", "9:00 – 17:00"], ["Sunday", "9:00 – 17:00"]].map(h => `<li><span>${h[0]}</span>${h[1]}</li>`).join("")}</ul>
      <p style="margin-top:18px;font-size:14px;color:rgba(239,231,216,.7)">Oudegracht 112, 3511 AW Utrecht<br>hello@halden-coffee.com</p></div></div>
    <div class="z-faq"><div><span class="z-caps rv">Questions</span><h2 class="rv" style="--i:1;font-size:clamp(32px,4cqi,48px);margin-top:10px">Before you visit</h2>
      <div class="z-panel rv" style="--i:2;margin-top:28px"><div class="z-inp"><label class="zfull">Your email<input></label><label class="zfull">Subject<select><option>A question</option><option>Wholesale beans</option><option>Working at Halden</option><option>Press</option></select></label><label class="zfull">Message<textarea></textarea></label></div><div class="z-nx"><span></span><a class="hbtn" data-demo>Send</a></div></div></div>
      <div class="rv" style="--i:1">${[["Do you take reservations?", "Yes, for breakfast and lunch. Walk-ins are always welcome at the bar."], ["Can I work on my laptop?", "Of course, on weekdays. On weekends we keep the big table laptop-free."], ["Is Halden accessible?", "There is a step-free entrance on the side and an accessible toilet."], ["Are dogs welcome?", "Very. We keep water bowls by the door."]].map(q => `<details><summary>${q[0]}</summary><p>${q[1]}</p></details>`).join("")}</div></div></div>
</section>
</main>
<footer><div class="w"><div class="z-fg"><div>${mark}<p style="margin-top:18px;max-width:32ch">Speciality coffee, roasted and served on the Oudegracht in Utrecht.</p></div>
  <div><h4>Visit</h4><ul>${pages.slice(0, 5).map(p => `<li><a data-hp="${p[0]}">${p[1]}</a></li>`).join("")}</ul></div>
  <div><h4>Book</h4><ul>${pages.slice(5).map(p => `<li><a data-hp="${p[0]}">${p[1]}</a></li>`).join("")}</ul></div>
  <div><h4>Hours</h4><ul><li>Mon–Thu 7:30–18:00</li><li>Fri 7:30–22:00</li><li>Sat–Sun 9:00–17:00</li></ul></div></div>
  <div class="z-fb"><span>© 2026 Halden Koffiehuis · a made-up café for this demo</span><span>Instagram · Privacy · Cookies</span></div></div></footer>
<div class="z-cms"><div><span>Editor on: click any heading or text to change it. Demo only, nothing is saved.</span><button data-cms>✎ Try the editor</button></div></div>
</div>`;
  };

  /* =====================================================================
     SIGNATURE: its own identity. 20 pages.
     Imbue (high-contrast condensed didone) + Anybody (variable width grotesque).
     Night roast, crema, coffee-cherry red, jade and gold. Beans that float, follow the pointer,
     rain down and roast as you scroll. A coffee finder and a brew calculator (custom functionality), a journal (blog).
     ===================================================================== */
  const signature = () => {
    const bean = (cls = "", st = "") => `<span class="s-b ${cls}" style="${st}"><svg viewBox="0 0 100 130"><use href="#hbean"/></svg></span>`;
    const groups = [
      ["Taste", [["menu", "Menu"], ["signatures", "Signatures"], ["origins", "Origins"], ["roastery", "Roastery"], ["finder", "Coffee finder"], ["brew", "Brew guide"]]],
      ["The house", [["story", "Story"], ["house", "The house"], ["events", "Events"], ["school", "Barista school"], ["reserve", "Reserve"], ["private", "Private hire"]]],
      ["Journal", [["journal", "Journal"], ["post-tuesday", "Roast day, hour by hour"], ["post-guji", "A letter from Guji"], ["post-water", "Why water matters"]]],
      ["More", [["home", "Home"], ["wholesale", "Wholesale"], ["careers", "Careers"], ["visit", "Visit & contact"]]],
    ];
    const ORDER = ["home", "menu", "signatures", "origins", "roastery", "story", "house", "finder", "brew", "journal", "post-tuesday", "post-guji", "post-water", "events", "school", "reserve", "private", "wholesale", "careers", "visit"];
    const NAME = Object.fromEntries(groups.flatMap(g => g[1]));
    const num = id => String(ORDER.indexOf(id) + 1).padStart(2, "0");
    const drinks = [["N°1", "Canal Fog", "Cold brew, oat milk, smoked maple, sea salt", "5.40", P.latteMarble], ["N°2", "Tuesday Red", "Espresso, cascara syrup, sparkling water, orange", "5.20", P.cheers], ["N°3", "Halden Flat", "Double ristretto of this week’s Guji, whole milk", "4.20", P.pour]];
    const posts = [["post-tuesday", "Roast day, hour by hour", "From the first warm-up at 6:00 to the last cooling tray. What actually happens on a Tuesday.", "Roastery", "6 min", P.roast], ["post-guji", "A letter from Guji", "Why this Ethiopian coffee tastes of peach and jasmine, and the people who grow it.", "Origins", "8 min", P.latteBeans], ["post-water", "Why water matters", "Coffee is 98% water. A short, useful guide to brewing better at home.", "Brewing", "4 min", P.pourover]];
    const map = mapSvg({ land: "#17100C", road: "#2A1F18", block: "#21170F", water: "#1F5C4F", pin: "#D9412A", label: "#8C7A66", font: "Anybody, sans-serif", tag: "#F1E3CA", tagInk: "#0D0A08" });
    const sp = (id, kick, title, intro, body, th = "cr") => `<section class="hp s-th-${th}" data-p="${id}"><header class="s-ph"><div class="w"><div class="s-pn" aria-hidden="true">${num(id)}</div><span class="s-cap rv">${kick} · N°${num(id)} / 20</span><h1 class="s-disp rv" style="--i:1">${title}</h1>${intro ? `<p class="s-intro rv" style="--i:2">${intro}</p>` : ""}</div></header>${body}${next(id)}</section>`;
    const next = id => { const n = ORDER[(ORDER.indexOf(id) + 1) % ORDER.length]; return `<a class="s-next" data-hp="${n}"><div class="w"><span class="s-cap">Next page · N°${num(n)}</span><b class="s-disp">${NAME[n]} <em>→</em></b></div></a>`; };
    const words = (txt, imgs = {}) => txt.split(" ").map((w, i, a) => `<span style="--w:${i};--n:${a.length}">${w}</span>${imgs[i] ? `<i style="background:${ph(imgs[i], 400)}"></i>` : ""}`).join(" ");
    const rain = Array.from({ length: 16 }, (_, i) => bean("rain", `left:${(i * 6.3 + (i % 3) * 2) % 98}%;width:${22 + (i * 7) % 26}px;animation-duration:${5 + (i * 1.3) % 5}s;animation-delay:-${(i * 0.83) % 6}s;--r:${(i * 47) % 360}deg`)).join("");
    const steps = [["01", "Cherry", "Coffee starts as a red fruit on a shrub, picked by hand when ripe.", "cherry"], ["02", "Washed & dried", "The seeds are washed out of the fruit and dried slowly in the sun.", "dry"], ["03", "Green", "Hard, pale and grassy. This is how the beans arrive in Utrecht.", "green"], ["04", "Roasted", "Every Tuesday, eleven minutes at a time. The sugars caramelise.", "roast"], ["05", "In your cup", "Rested for a few days, ground to order and poured by hand.", "cup"]];
    const field = (l, ph_ = "", t = "input") => `<label>${l}${t === "textarea" ? `<textarea placeholder="${ph_}"></textarea>` : `<input placeholder="${ph_}">`}</label>`;
    return `<div class="hd hs" data-curtain>
<style>${BASE}
.hs{--ink:#0D0A08;--ro:#1B120D;--cr:#F1E3CA;--pa:#F7EEDF;--ch:#D9412A;--ja:#1F5C4F;--go:#E3A64A;--mut:#8C7A66;--bg:var(--pa);--fg:var(--ink);--line:rgba(13,10,8,.14);background:var(--ink);color:var(--fg);font:400 15.5px/1.65 "Anybody",system-ui,sans-serif;font-stretch:96%}
.hs .w{width:min(100% - 2*clamp(20px,5cqi,72px),1240px);margin-inline:auto}
.hs .s-disp{font-family:"Imbue",Didot,serif;font-optical-sizing:auto;font-weight:500;letter-spacing:-.02em;line-height:.9}
.hs .s-disp em,.hs h2 em{font-style:normal;font-weight:300;color:var(--acc,var(--ch))}
.hs .s-cap{display:inline-block;font-size:10.5px;font-weight:600;font-stretch:135%;letter-spacing:.18em;text-transform:uppercase;color:var(--acc,var(--ch))}
.hs .hp{background:var(--bg);color:var(--fg)}
.hs .s-th-cr{--bg:var(--pa);--fg:var(--ink);--acc:var(--ch);--line:rgba(13,10,8,.14);--mut:#7D6B58}
.hs .s-th-ni{--bg:var(--ink);--fg:var(--cr);--acc:var(--go);--line:rgba(241,227,202,.14);--mut:#A08C75}
.hs .s-th-ch{--bg:var(--ch);--fg:var(--cr);--acc:var(--ink);--line:rgba(241,227,202,.28);--mut:rgba(241,227,202,.78)}
.hs .s-th-ja{--bg:var(--ja);--fg:var(--cr);--acc:var(--go);--line:rgba(241,227,202,.18);--mut:rgba(241,227,202,.7)}
.hs .s-pill{display:inline-flex;align-items:center;gap:10px;padding:13px 22px;border-radius:99px;background:var(--acc,var(--ch));color:var(--bg,var(--cr));font-size:12px;font-weight:600;font-stretch:125%;letter-spacing:.1em;text-transform:uppercase;transition:transform .5s cubic-bezier(.2,.7,.1,1),box-shadow .5s}
.hs .s-pill:hover{transform:translateY(-3px);box-shadow:0 18px 30px -16px rgba(0,0,0,.5)}
.hs .s-pill i{width:7px;height:7px;border-radius:50%;background:currentColor}
.hs .s-pill.ol{background:transparent;color:inherit;box-shadow:inset 0 0 0 1px currentColor}
/* header */
.hs .s-nav{position:sticky;top:0;z-index:55;color:var(--cr);transition:background .5s,backdrop-filter .5s}
.hs.scrolled .s-nav,.hs:not([data-page="home"]) .s-nav{background:rgba(13,10,8,.78);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
.hs .s-nav .w{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:16px 0}
.hs .s-mono{display:flex;align-items:center;gap:12px;font-size:10px;font-weight:600;font-stretch:140%;letter-spacing:.2em;line-height:1.3}
.hs .s-mono svg{width:40px;height:40px;transition:transform 1.2s cubic-bezier(.2,.7,.1,1)}.hs .s-mono:hover svg{transform:rotate(360deg)}
.hs .s-where{font-size:10.5px;font-stretch:135%;letter-spacing:.16em;text-transform:uppercase;opacity:.75;text-align:center}
.hs .s-where b{color:var(--go);font-weight:600}
.hs .s-right{display:flex;justify-content:end;gap:8px;align-items:center}
.hs .s-right .s-pill{padding:10px 16px;background:var(--ch);color:var(--cr)}
.hs .s-idx{display:inline-flex;align-items:center;gap:12px;padding:10px 6px 10px 16px;font-size:11px;font-weight:600;font-stretch:135%;letter-spacing:.16em;text-transform:uppercase;border-radius:99px;box-shadow:inset 0 0 0 1px rgba(241,227,202,.3)}
.hs .s-idx u{width:30px;height:30px;border-radius:50%;background:var(--cr);display:grid;place-items:center;text-decoration:none}
.hs .s-idx u::before{content:"";width:12px;height:6px;border-top:1.5px solid var(--ink);border-bottom:1.5px solid var(--ink);transition:transform .5s}
.hs .s-idx:hover u::before{transform:scaleX(.6)}
/* index overlay */
.hs .s-index{position:absolute;left:0;right:0;top:0;height:var(--vh,640px);background:var(--ch);color:var(--cr);clip-path:circle(0% at calc(100% - 60px) 36px);transition:clip-path .9s cubic-bezier(.7,0,.2,1);overflow:auto;z-index:66}
.hs.menu-open .s-index{clip-path:circle(150% at calc(100% - 60px) 36px)}
.hs .s-index .w{padding:22px 0 40px;position:relative;z-index:2}
.hs .s-itop{display:flex;justify-content:space-between;align-items:center;margin-bottom:clamp(24px,4cqi,48px)}
.hs .s-x{width:48px;height:48px;border-radius:50%;background:var(--ink);display:grid;place-items:center;transition:transform .5s}.hs .s-x:hover{transform:rotate(90deg)}
.hs .s-ig{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(20px,3cqi,40px)}
.hs h4,.hs h3{font-family:"Imbue",serif}.hs .s-ig h4,.hs .s-fl h4{font-family:"Anybody",sans-serif}
.hs .s-ig h4{font-size:10.5px;font-weight:600;font-stretch:140%;letter-spacing:.2em;text-transform:uppercase;padding-bottom:12px;border-bottom:1px solid rgba(241,227,202,.35);margin-bottom:8px;color:var(--ink)}
.hs .s-ig a{display:flex;gap:10px;align-items:baseline;padding:5px 0;font:500 clamp(20px,2.3cqi,30px)/1.05 "Imbue",serif;opacity:0;transform:translateY(20px);transition:opacity .6s,transform .7s cubic-bezier(.2,.7,.1,1),color .3s,padding .4s}
.hs.menu-open .s-ig a{opacity:1;transform:none;transition-delay:calc(var(--i)*30ms + .35s)}
.hs .s-ig a small{font:600 10px "Anybody";font-stretch:120%;letter-spacing:.1em;opacity:.6}
.hs .s-ig a:hover{padding-left:8px;color:var(--ink)}.hs .s-ig a.cur{color:var(--ink);font-style:italic}
.hs .s-index .s-b{position:absolute;opacity:.25;z-index:1;animation:sDrift 14s ease-in-out infinite alternate}
@keyframes sDrift{to{transform:translate(30px,-40px) rotate(60deg)}}
.hs .s-curtain{position:absolute;left:0;right:0;top:0;height:var(--vh,640px);background:var(--ch);transform:translateY(100%);z-index:68;pointer-events:none;display:none;place-items:center}
.hs.swap .s-curtain{display:grid}
.hs .s-curtain .s-b{width:70px;animation:sSpin 1s linear infinite}
.hs.swap .s-curtain{animation:sCurt .95s cubic-bezier(.7,0,.2,1) both}
@keyframes sCurt{0%{transform:translateY(100%)}42%,58%{transform:none}100%{transform:translateY(-100%)}}
@keyframes sSpin{to{transform:rotate(360deg)}}
.hs .s-b{display:block;aspect-ratio:100/130}.hs .s-b svg{width:100%;height:100%;display:block;overflow:visible}
/* hero */
.hs .sig-hero{position:relative;--mx:0;--my:0;--sy:0;min-height:max(var(--vh,640px),600px);margin-top:-72px;padding-top:72px;display:flex;flex-direction:column;background:radial-gradient(120% 80% at 70% 30%,#2A1A12 0%,var(--ink) 60%);color:var(--cr);overflow:hidden;isolation:isolate}
.hs .sig-hero::before{content:"";position:absolute;inset:0;background:radial-gradient(40% 40% at calc(50% + var(--mx)*30%) calc(46% + var(--my)*30%),rgba(217,65,42,.28),transparent 70%);transition:background .6s;z-index:-1}
.hs .sig-beans{position:absolute;inset:0;z-index:3;pointer-events:none}
.hs .sig-bean{position:absolute;aspect-ratio:100/130;transform:translate3d(calc(var(--mx)*var(--d)*-120px),calc(var(--my)*var(--d)*-120px + var(--sy)*var(--d)*-.6px),0);transition:transform 1.1s cubic-bezier(.16,1,.3,1);filter:drop-shadow(0 calc(var(--d)*26px) calc(var(--d)*20px) rgba(0,0,0,.55))}
.hs .sig-bean svg{width:100%;height:100%;display:block;overflow:visible;transform:rotate(var(--r));animation:sFloat var(--f) ease-in-out infinite alternate}
@keyframes sFloat{to{transform:rotate(calc(var(--r) + 28deg)) translateY(-22px)}}
.hs .sig-bean.far{filter:blur(1.6px);opacity:.7}.hs .sig-bean.near{filter:blur(2.4px) drop-shadow(0 30px 30px rgba(0,0,0,.6))}
.hs .sig-bean{animation:sBeanIn 1.6s cubic-bezier(.16,1,.3,1) both;animation-delay:calc(var(--d)*.5s)}
@keyframes sBeanIn{from{opacity:0;scale:.4}}
.hs .s-hmeta{display:flex;justify-content:space-between;gap:20px;position:relative;z-index:4;padding-top:18px;font-size:10.5px;font-stretch:135%;letter-spacing:.16em;text-transform:uppercase;color:rgba(241,227,202,.7)}
.hs .s-hmeta b{display:block;color:var(--cr);font-weight:600}
.hs .s-cupw{position:absolute;left:50%;top:44%;width:clamp(200px,30cqi,340px);aspect-ratio:1;translate:-50% -50%;z-index:2;transform:translate3d(calc(var(--mx)*18px),calc(var(--my)*14px + var(--sy)*.15px),0);transition:transform 1.1s cubic-bezier(.16,1,.3,1)}
.hs .s-cup{position:absolute;inset:12%;border-radius:50%;background:radial-gradient(circle at 50% 50%,#E9C79A 0 16%,#B87B47 30%,#6E3B1C 52%,#3A1C0C 64%,#F1E3CA 65% 71%,#D9CBB0 72% 74%,transparent 75%);box-shadow:0 60px 80px -30px rgba(0,0,0,.8)}
.hs .s-cup::after{content:"";position:absolute;inset:16%;border-radius:50%;background:conic-gradient(from 0deg,transparent 0 10%,rgba(255,236,205,.55) 14%,transparent 22% 48%,rgba(255,236,205,.4) 54%,transparent 62%);animation:sSpin 9s linear infinite;mask:radial-gradient(circle,transparent 0 22%,#000 23% 48%,transparent 50%);-webkit-mask:radial-gradient(circle,transparent 0 22%,#000 23% 48%,transparent 50%)}
.hs .s-ring{position:absolute;inset:0;animation:sSpin 30s linear infinite}
.hs .s-ring text{font:600 7.4px "Anybody";font-stretch:140%;letter-spacing:.34em;fill:var(--go)}
.hs .s-steam{position:absolute;left:30%;right:30%;bottom:62%;height:60%;opacity:.55}
.hs .s-steam path{fill:none;stroke:var(--cr);stroke-width:2;stroke-linecap:round;stroke-dasharray:40 140;animation:sSteam 4s linear infinite}
.hs .s-steam path:nth-child(2){animation-delay:-1.3s}.hs .s-steam path:nth-child(3){animation-delay:-2.6s}
@keyframes sSteam{from{stroke-dashoffset:180;opacity:0}30%{opacity:1}to{stroke-dashoffset:0;opacity:0}}
.hs .s-word{position:relative;z-index:4;margin-top:auto;display:flex;justify-content:space-between;font-family:"Imbue",serif;font-weight:600;font-size:clamp(90px,24.5cqi,330px);line-height:.78;letter-spacing:-.02em;color:var(--cr);padding:0 clamp(12px,2cqi,28px)}
.hs .s-word span{display:inline-block;animation:sLet 1.5s cubic-bezier(.16,1,.3,1) both;animation-delay:calc(var(--i)*.07s + .2s)}
.hs .s-word span:nth-child(5){font-style:italic;font-weight:300;color:var(--ch)}
@keyframes sLet{from{transform:translateY(60%);opacity:0;filter:blur(8px)}}
.hs .s-tick{position:relative;z-index:4;display:flex;justify-content:space-between;gap:12px;padding:16px 0 20px;border-top:1px solid rgba(241,227,202,.18);margin-top:14px;font-size:10.5px;font-stretch:130%;letter-spacing:.16em;text-transform:uppercase;color:rgba(241,227,202,.7)}
.hs .s-tick span:first-child::after{content:"";display:inline-block;width:1px;height:14px;background:var(--go);margin-left:10px;vertical-align:-3px;animation:sScroll 1.6s ease-in-out infinite}
@keyframes sScroll{0%{transform:scaleY(0);transform-origin:top}50%{transform:scaleY(1);transform-origin:top}51%{transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
/* manifesto */
.hs .s-man{padding:clamp(80px,12cqi,160px) 0}
.hs .s-man p{font:400 clamp(32px,5.4cqi,76px)/1.04 "Imbue",serif;letter-spacing:-.015em;max-width:18ch}
.hs .s-man p span{opacity:clamp(.13,calc((var(--p,0) - .18) * var(--n) * 2.6 - var(--w)),1);transition:opacity .25s}
.hs .s-man p i{display:inline-block;width:1.5em;height:.82em;border-radius:99px;vertical-align:-.06em;margin:0 .06em;background-size:cover!important;opacity:clamp(.13,calc((var(--p,0) - .18) * 60),1)}
.hs .s-man .s-cap{margin-bottom:28px}
/* pinned process */
.hs .s-pin{height:calc(var(--vh,640px) * 4);position:relative}
.hs .s-pin>div{position:sticky;top:0;height:var(--vh,640px);overflow:hidden;display:flex;flex-direction:column;justify-content:center}
.hs .s-ptop{position:absolute;top:84px;left:0;right:0}
.hs .s-ptop .w{display:flex;justify-content:space-between;align-items:center}
.hs .s-pbar{width:min(260px,40cqi);height:2px;background:rgba(241,227,202,.25);position:relative}
.hs .s-pbar::after{content:"";position:absolute;inset:0;background:var(--cr);transform:scaleX(var(--p,0));transform-origin:left}
.hs .s-track{display:flex;gap:6cqi;padding-left:max(6cqi,24px);transform:translateX(calc(var(--p,0) * -1 * (100% - 70cqi)));will-change:transform;width:max-content}
.hs .s-step{width:min(62cqi,560px);flex:none;display:grid;grid-template-columns:auto 1fr;gap:6px 24px;align-items:end}
.hs .s-step b{font:300 clamp(90px,15cqi,200px)/.8 "Imbue",serif;color:transparent;-webkit-text-stroke:1.2px var(--cr);grid-row:span 2}
.hs .s-step h3{font:500 clamp(34px,4.6cqi,64px)/.95 "Imbue",serif}
.hs .s-step p{color:rgba(241,227,202,.82);max-width:30ch}
.hs .s-pbean{position:absolute;right:max(6cqi,24px);bottom:clamp(40px,8cqi,80px);width:clamp(70px,11cqi,130px);transform:rotate(calc(var(--p,0) * 540deg)) scale(calc(.8 + var(--p,0) * .5));filter:hue-rotate(calc((1 - var(--p,0)) * 70deg)) saturate(calc(.5 + var(--p,0) * .8)) brightness(calc(1.6 - var(--p,0) * .6)) drop-shadow(0 20px 20px rgba(0,0,0,.35))}
/* signatures */
.hs .s-sig{padding:clamp(72px,10cqi,140px) 0}
.hs .s-h2row{display:flex;justify-content:space-between;align-items:end;gap:20px;flex-wrap:wrap;margin-bottom:clamp(32px,5cqi,64px)}
.hs h2{font:500 clamp(44px,7cqi,104px)/.9 "Imbue",serif;letter-spacing:-.02em;margin-top:14px}
.hs .s-drinks{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(12px,2cqi,24px)}
.hs .s-dr{position:relative;aspect-ratio:3/4.3;overflow:hidden;border-radius:999px 999px 18px 18px;display:flex;flex-direction:column;justify-content:space-between;padding:clamp(26px,3cqi,40px) 22px 22px;color:var(--cr);isolation:isolate;transition:border-radius .9s cubic-bezier(.2,.7,.1,1),transform .9s cubic-bezier(.2,.7,.1,1)}
.hs .s-dr::before{content:"";position:absolute;inset:0;z-index:-2;background:var(--img);transition:transform 1.6s cubic-bezier(.2,.7,.1,1),filter 1s;filter:saturate(.8) contrast(1.05)}
.hs .s-dr::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(rgba(13,10,8,.1),rgba(13,10,8,.25) 45%,rgba(13,10,8,.92))}
.hs .s-dr:hover{border-radius:18px;transform:translateY(-8px)}.hs .s-dr:hover::before{transform:scale(1.1);filter:saturate(1.1)}
.hs .s-dr .t{display:flex;justify-content:center;gap:12px;font-size:10.5px;font-weight:600;font-stretch:135%;letter-spacing:.2em;color:var(--cr);text-shadow:0 1px 12px rgba(0,0,0,.6)}
.hs .s-dr h3{font:500 clamp(32px,3.6cqi,48px)/.95 "Imbue",serif}
.hs .s-dr p{font-size:13.5px;opacity:.8;margin-top:8px;max-width:28ch}
/* rain band */
.hs .s-rain{position:relative;overflow:hidden;padding:clamp(90px,14cqi,180px) 0;text-align:center}
.hs .s-rain .s-b.rain{position:absolute;top:-80px;animation:sRain linear infinite;filter:drop-shadow(0 10px 12px rgba(0,0,0,.35))}
.hs .s-rain .s-b.rain svg{transform:rotate(var(--r))}
@keyframes sRain{to{transform:translateY(calc(100cqi * .8 + 600px)) rotate(400deg)}}
.hs .s-rain h2{position:relative;z-index:2;font-size:clamp(54px,10cqi,150px);margin:18px auto 0;max-width:12ch}
.hs .s-rain p{position:relative;z-index:2;max-width:46ch;margin:22px auto 0;color:var(--mut)}
/* tools teaser */
.hs .s-tools{display:grid;grid-template-columns:1fr 1fr;gap:clamp(12px,2cqi,20px);padding:clamp(64px,9cqi,120px) 0}
.hs .s-tool{position:relative;padding:clamp(28px,4cqi,48px);border-radius:26px;min-height:340px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden;isolation:isolate;transition:transform .8s cubic-bezier(.2,.7,.1,1)}
.hs .s-tool:hover{transform:translateY(-6px)}
.hs .s-tool h3{font:500 clamp(38px,4.8cqi,66px)/.92 "Imbue",serif;max-width:10ch}
.hs .s-tool p{max-width:34ch;opacity:.85}
.hs .s-tool .s-b{position:absolute;right:-20px;bottom:-30px;width:180px;z-index:-1;opacity:.95;animation:sFloat2 7s ease-in-out infinite alternate}
@keyframes sFloat2{to{transform:rotate(40deg) translateY(-24px)}}
/* journal cards */
.hs .s-posts{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2.4cqi,28px)}
.hs .s-post{display:flex;flex-direction:column;gap:12px}
.hs .s-post i{aspect-ratio:4/5;border-radius:18px;background:var(--img);transition:border-radius .8s cubic-bezier(.2,.7,.1,1),transform 1s cubic-bezier(.2,.7,.1,1)}
.hs .s-post:hover i{border-radius:120px 120px 18px 18px}
.hs .s-post h3{font:500 clamp(26px,2.6cqi,34px)/1 "Imbue",serif}
.hs .s-post p{color:var(--mut);font-size:14px}
/* footer */
.hs footer{background:var(--ink);color:var(--cr);padding:clamp(64px,9cqi,120px) 0 26px;overflow:hidden}
.hs .s-fcta{display:flex;justify-content:space-between;align-items:end;gap:24px;flex-wrap:wrap}
.hs .s-fcta h2{max-width:11ch}
.hs .s-fbig{font:600 clamp(90px,26cqi,360px)/.75 "Imbue",serif;letter-spacing:-.03em;margin:clamp(40px,6cqi,80px) 0 0;display:flex;justify-content:space-between;color:var(--cr)}
.hs .s-fbig em{font-style:italic;font-weight:300;color:var(--ch)}
.hs .s-fl{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:40px;padding-top:24px;border-top:1px solid rgba(241,227,202,.16);font-size:13px;color:rgba(241,227,202,.65)}
.hs .s-fl h4{font-size:10px;font-weight:600;font-stretch:140%;letter-spacing:.2em;text-transform:uppercase;color:var(--go);margin-bottom:10px}
.hs .s-fl a{display:block;padding:2px 0}.hs .s-fl a:hover{color:var(--cr)}
.hs .s-fb{display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-top:40px;font-size:11px;font-stretch:120%;letter-spacing:.08em;color:rgba(241,227,202,.5)}
/* inner page header */
.hs .s-ph{position:relative;padding:clamp(110px,15cqi,190px) 0 clamp(48px,7cqi,88px);margin-top:-72px;overflow:hidden;border-bottom:1px solid var(--line)}
.hs .s-pn{position:absolute;right:-.04em;top:.08em;font:300 clamp(160px,34cqi,460px)/.8 "Imbue",serif;color:transparent;-webkit-text-stroke:1px var(--line);pointer-events:none;animation:sPn 1.6s cubic-bezier(.16,1,.3,1) both}
@keyframes sPn{from{transform:translateY(16%);opacity:0}}
.hs .s-ph h1{font-size:clamp(56px,10cqi,150px);margin:18px 0 0;max-width:12ch;position:relative}
.hs .s-intro{max-width:50ch;margin-top:26px;color:var(--mut);font-size:clamp(15px,1.6cqi,18px);position:relative}
.hs .s-body{padding:clamp(48px,7cqi,96px) 0}
.hs .s-next{display:block;border-top:1px solid var(--line);padding:clamp(40px,6cqi,72px) 0;transition:background .6s}
.hs .s-next b{display:block;font-size:clamp(40px,6.4cqi,92px);margin-top:12px;transition:transform .8s cubic-bezier(.2,.7,.1,1)}
.hs .s-next b em{display:inline-block;transition:transform .8s cubic-bezier(.2,.7,.1,1)}
.hs .s-next:hover b{transform:translateX(14px)}.hs .s-next:hover b em{transform:translateX(18px)}
/* lists */
.hs .s-mg{display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,6cqi,96px)}
.hs .s-mg h3{font:italic 300 clamp(34px,4cqi,52px)/1 "Imbue",serif;color:var(--acc);margin-bottom:16px}
.hs .s-li{display:grid;grid-template-columns:1fr auto;gap:2px 16px;padding:16px 0;border-bottom:1px solid var(--line)}
.hs .s-li b{font:500 clamp(22px,2.2cqi,28px)/1.05 "Imbue",serif}.hs .s-li span{font-weight:600;font-stretch:120%;font-variant-numeric:tabular-nums}
.hs .s-li p{grid-column:1/-1;color:var(--mut);font-size:14px}
.hs .s-row{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,6cqi,96px);align-items:center;padding:clamp(28px,4cqi,48px) 0}
.hs .s-row+.s-row{border-top:1px solid var(--line)}
.hs .s-row:nth-child(even)>i{order:2}
.hs .s-row>i{aspect-ratio:4/4.6;border-radius:999px 999px 20px 20px;background:var(--img)}
.hs .s-row h3{font:500 clamp(44px,6cqi,88px)/.9 "Imbue",serif;margin:10px 0 14px}
.hs .s-row p{color:var(--mut);max-width:40ch}
.hs .s-row .pr{display:block;margin-top:18px;font:300 36px "Imbue",serif;color:var(--acc)}
.hs .s-or{display:grid;grid-template-columns:70px 1.2fr 1fr 1fr auto;gap:20px;align-items:center;padding:24px 0;border-bottom:1px solid var(--line);position:relative}
.hs .s-or:first-child{border-top:1px solid var(--line)}
.hs .s-or .n{font:300 44px/1 "Imbue",serif;color:var(--acc)}
.hs .s-or h3{font:500 clamp(30px,3.6cqi,48px)/1 "Imbue",serif}
.hs .s-or small{display:block;font-size:10.5px;font-stretch:130%;letter-spacing:.14em;text-transform:uppercase;color:var(--mut)}
.hs .s-or .ph{position:absolute;right:10%;top:50%;width:160px;aspect-ratio:3/4;border-radius:14px;background:var(--img);translate:0 -50%;opacity:0;scale:.85;transition:opacity .5s,scale .6s cubic-bezier(.2,.7,.1,1);pointer-events:none;z-index:2}
.hs .s-or:hover .ph{opacity:1;scale:1}
.hs .s-curve{background:rgba(241,227,202,.04);border-radius:24px;padding:clamp(20px,3cqi,36px);box-shadow:inset 0 0 0 1px var(--line)}
.hs .s-curve svg{width:100%;height:auto;display:block;overflow:visible}
.hs .s-curve .ln{stroke-dasharray:1200;stroke-dashoffset:1200;transition:stroke-dashoffset 3s cubic-bezier(.6,0,.2,1) .3s}
.hs .rv.in .s-curve .ln,.hs .s-curve.rv.in .ln{stroke-dashoffset:0}
.hs .s-curve text{font:600 10px "Anybody";font-stretch:130%;letter-spacing:.12em;fill:var(--mut)}
.hs .s-facts{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:clamp(32px,5cqi,56px)}
.hs .s-facts div{border-top:1px solid var(--line);padding-top:16px}.hs .s-facts b{display:block;font:300 clamp(48px,6cqi,80px)/1 "Imbue",serif;color:var(--acc)}
.hs .s-facts p{color:var(--mut);font-size:14px}
.hs .s-art{max-width:680px;margin-inline:auto;padding:clamp(48px,7cqi,96px) 0}
.hs .s-art p{font-size:17px;line-height:1.75;margin-bottom:22px;color:var(--fg)}
.hs .s-art p.drop::first-letter{float:left;font:500 92px/.8 "Imbue",serif;margin:8px 12px 0 0;color:var(--acc)}
.hs .s-art blockquote{font:italic 300 clamp(30px,4cqi,46px)/1.1 "Imbue",serif;color:var(--acc);margin:40px 0;padding-left:24px;border-left:2px solid var(--acc)}
.hs .s-art .meta{display:flex;gap:18px;flex-wrap:wrap;font-size:11px;font-stretch:130%;letter-spacing:.14em;text-transform:uppercase;color:var(--mut);padding-bottom:28px;margin-bottom:32px;border-bottom:1px solid var(--line)}
.hs .s-hero-img{aspect-ratio:21/9;border-radius:20px;background:var(--img)}
.hs .s-mosaic{display:grid;grid-template-columns:2fr 1fr 1fr;grid-template-rows:repeat(2,clamp(150px,20cqi,260px));gap:12px}
.hs .s-mosaic i{border-radius:18px;background:var(--img)}.hs .s-mosaic i:first-child{grid-row:span 2}
.hs .s-quiz{display:grid;grid-template-columns:1.4fr 1fr;gap:clamp(20px,4cqi,48px);align-items:start}
.hs .s-q{margin-bottom:28px}
.hs .s-q h3{font:500 clamp(28px,3.2cqi,40px)/1 "Imbue",serif;margin-bottom:14px}
.hs .s-opts{display:flex;flex-wrap:wrap;gap:8px}
.hs .s-opts button{padding:12px 18px;border-radius:99px;box-shadow:inset 0 0 0 1px var(--line);font-size:14px;transition:.3s}
.hs .s-opts button:hover{box-shadow:inset 0 0 0 1px var(--fg)}
.hs .s-opts button[aria-pressed="true"]{background:var(--cr);color:var(--ch);box-shadow:none;font-weight:600}
.hs .s-res{background:var(--ink);color:var(--cr);border-radius:26px;padding:clamp(26px,4cqi,44px);position:sticky;top:96px;overflow:hidden}
.hs .s-res h3{font:500 clamp(40px,5cqi,64px)/.92 "Imbue",serif;margin:12px 0}
.hs .s-res p{color:rgba(241,227,202,.75);font-size:14.5px}
.hs .s-res .s-b{position:absolute;right:-24px;top:-24px;width:110px;opacity:.9;animation:sFloat2 6s ease-in-out infinite alternate}
.hs .s-res .bar{height:3px;background:rgba(241,227,202,.15);margin:20px 0 6px;border-radius:3px;overflow:hidden}.hs .s-res .bar i{display:block;height:100%;background:var(--go);width:var(--v,0%);transition:width .8s cubic-bezier(.2,.7,.1,1)}
.hs .s-calc{display:grid;grid-template-columns:1fr 1fr;gap:clamp(20px,4cqi,48px);align-items:start}
.hs .s-calc input[type=range]{width:100%;accent-color:var(--go);margin:12px 0 4px}
.hs .s-out{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border-radius:22px;overflow:hidden}
.hs .s-out div{background:var(--bg);padding:22px}
.hs .s-out b{display:block;font:300 clamp(44px,5.6cqi,72px)/1 "Imbue",serif;color:var(--acc)}
.hs .s-out small{font-size:10.5px;font-stretch:130%;letter-spacing:.14em;text-transform:uppercase;color:var(--mut)}
.hs .s-timer{display:flex;align-items:center;gap:16px;margin-top:20px}
.hs .s-timer output{font:300 56px/1 "Imbue",serif;font-variant-numeric:tabular-nums;min-width:3.2ch}
.hs .s-form{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.hs .s-form label{display:grid;gap:4px;font-size:10.5px;font-weight:600;font-stretch:130%;letter-spacing:.14em;text-transform:uppercase;color:var(--mut)}
.hs .s-form label:has(textarea){grid-column:1/-1}
.hs .s-form input,.hs .s-form textarea{padding:12px 0;border:0;border-bottom:1px solid var(--line);background:none;outline:none;font:400 17px "Anybody";letter-spacing:0;text-transform:none;color:var(--fg);transition:border-color .3s}
.hs .s-form input:focus,.hs .s-form textarea:focus{border-color:var(--acc)}
.hs .s-form textarea{height:90px;resize:none}
.hs .s-form .s-pill{justify-self:start;margin-top:8px}
.hs .s-two{display:grid;grid-template-columns:1fr 1.2fr;gap:clamp(28px,6cqi,96px);align-items:start}
.hs .s-two p{color:var(--mut)}
.hs .s-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.hs .s-card{border-radius:22px;padding:26px;box-shadow:inset 0 0 0 1px var(--line);display:flex;flex-direction:column;gap:10px;transition:background .5s,transform .6s cubic-bezier(.2,.7,.1,1)}
.hs .s-card:hover{transform:translateY(-4px);background:rgba(127,100,70,.08)}
.hs .s-card h3{font:500 clamp(28px,3cqi,38px)/1 "Imbue",serif}.hs .s-card p{color:var(--mut);font-size:14px}
.hs .s-card .s-cap{margin-top:auto}
.hs .s-ev{display:grid;grid-template-columns:120px 1fr auto;gap:24px;align-items:center;padding:24px 0;border-bottom:1px solid var(--line)}
.hs .s-ev:first-child{border-top:1px solid var(--line)}
.hs .s-ev .d{font:300 64px/.85 "Imbue",serif;color:var(--acc)}.hs .s-ev .d small{display:block;font:600 10px "Anybody";font-stretch:130%;letter-spacing:.18em;margin-top:8px;color:var(--fg)}
.hs .s-ev h3{font:500 clamp(28px,3.4cqi,44px)/1 "Imbue",serif}.hs .s-ev p{color:var(--mut);font-size:14px}
.hs .s-chips{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 22px}
.hs .s-chips button{padding:11px 16px;border-radius:99px;box-shadow:inset 0 0 0 1px var(--line);font-size:14px;transition:.3s}
.hs .s-chips button[aria-pressed="true"]{background:var(--ink);color:var(--cr);box-shadow:none}
.hs [data-step]{display:none}.hs [data-step].on{display:block;animation:hdpg .5s both}
.hs .s-done{text-align:center;padding:40px 0}.hs .s-done h3{font:500 56px/1 "Imbue",serif;margin:14px 0}.hs .s-done p{color:var(--mut);max-width:42ch;margin:0 auto 20px}
.hs .s-done .s-b{width:70px;margin:0 auto;animation:sSpin 6s linear infinite}
.hs .s-visit{display:grid;grid-template-columns:1.3fr 1fr;gap:16px}
.hs .s-vmap{border-radius:26px;overflow:hidden;min-height:420px;position:relative;box-shadow:inset 0 0 0 1px var(--line)}
.hs .s-vmap .s-pill{position:absolute;left:18px;bottom:18px}
.hs .s-hours li{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--line);font-size:14.5px;color:var(--mut)}
.hs .s-hours li.today{color:var(--fg);font-weight:600}
.hs .s-hours li.today span::after{content:" · today";color:var(--acc);font-weight:400}
@container (max-width:860px){
  .hs .s-where{display:none}.hs .s-nav .w{grid-template-columns:1fr auto}.hs .s-mono span{display:none}
  .hs .s-right .s-pill{display:none}.hs .s-idx{padding-left:14px}
  .hs .s-ig{grid-template-columns:1fr 1fr}
  .hs .s-drinks,.hs .s-posts,.hs .s-cards,.hs .s-facts{grid-template-columns:1fr}
  .hs .s-dr{aspect-ratio:4/4.4}
  .hs .s-tools,.hs .s-mg,.hs .s-row,.hs .s-quiz,.hs .s-calc,.hs .s-two,.hs .s-visit,.hs .s-form{grid-template-columns:1fr}
  .hs .s-row:nth-child(even)>i{order:0}.hs .s-row>i{aspect-ratio:4/3.4}
  .hs .s-or{grid-template-columns:50px 1fr;gap:4px 16px}.hs .s-or>*:nth-child(n+3){grid-column:2}.hs .s-or .ph{display:none}
  .hs .s-ev{grid-template-columns:80px 1fr}.hs .s-ev>*:last-child{grid-column:2}
  .hs .s-fl{grid-template-columns:1fr 1fr}
  .hs .s-mosaic{grid-template-columns:1fr 1fr}.hs .s-mosaic i:first-child{grid-column:span 2;grid-row:auto}
  .hs .s-step{width:76cqi}
  .hs .s-res{position:static}
  .hs .s-hmeta div:last-child{display:none}
  .hs .sig-bean.near{display:none}
  .hs .s-word{font-size:21cqi;padding:0 8px}
  .hs .s-tick span:nth-child(2){display:none}
}
</style>
${BEAN_DEFS}
<div class="h-ov"><div class="h-lb" data-lbx><i></i><span></span></div>
  <div class="s-curtain" aria-hidden="true">${bean()}</div>
  <div class="s-index" role="dialog" aria-label="All pages">${bean("", "width:220px;left:-40px;bottom:-30px")}${bean("", "width:120px;right:8%;top:30%;animation-delay:-5s")}
    <div class="w"><div class="s-itop"><span class="s-cap" style="color:var(--ink)">Index · 20 pages</span><button class="s-x" data-menu aria-label="Close"><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16" stroke="#F1E3CA" stroke-width="2" stroke-linecap="round"/></svg></button></div>
    <div class="s-ig">${groups.map(g => `<div><h4>${g[0]}</h4>${g[1].map(p => `<a data-hp="${p[0]}" style="--i:${ORDER.indexOf(p[0])}"><small>${num(p[0])}</small>${p[1]}</a>`).join("")}</div>`).join("")}</div></div></div></div>
<div class="s-nav"><div class="w"><a class="s-mono" data-hp="home"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="none" stroke="#F1E3CA" stroke-width="1.2"/><path d="M14 11v18M26 11v18M14 20h12" stroke="#F1E3CA" stroke-width="2.2" stroke-linecap="round"/><circle cx="20" cy="20" r="2.4" fill="#D9412A"/></svg><span>HALDEN<br>KOFFIEHUIS</span></a>
  <span class="s-where">N°<b data-pgnum>01</b> / 20 — <span data-pgname>Home</span></span>
  <div class="s-right"><a class="s-pill" data-hp="reserve"><i></i>Reserve</a><button class="s-idx" data-menu>Index<u></u></button></div></div></div>
<main>
<section class="hp on s-th-ni" data-p="home">
  <div class="sig-hero"><div class="w"><div class="s-hmeta"><div><b>Koffiehuis &amp; roastery</b>Utrecht · since 2016</div><div style="text-align:right"><b data-open>Open today</b>Oudegracht 112</div></div></div>
    <div class="s-cupw" aria-hidden="true"><svg class="s-steam" viewBox="0 0 100 120"><path d="M30 120c-10-20 14-30 4-50s10-30 2-50"/><path d="M50 120c-10-20 14-30 4-50s10-30 2-50"/><path d="M70 120c-10-20 14-30 4-50s10-30 2-50"/></svg><div class="s-cup"></div>
      <svg class="s-ring" viewBox="0 0 200 200"><defs><path id="hsr" d="M100,100 m-94,0 a94,94 0 1,1 188,0 a94,94 0 1,1 -188,0"/></defs><text><textPath href="#hsr">SLOW COFFEE ✦ OUDEGRACHT 112 ✦ UTRECHT ✦ EST. 2016 ✦ </textPath></text></svg></div>
    ${beanLayer()}
    <div class="s-word" aria-label="Halden">${"Halden".split("").map((c, i) => `<span style="--i:${i}" aria-hidden="true">${c}</span>`).join("")}</div>
    <div class="w"><div class="s-tick"><span>Scroll to taste</span><span>Single origins · roasted on the canal</span><span>Est. 2016</span></div></div></div>
  <section class="s-man s-th-cr" data-sc style="background:var(--pa);color:var(--ink)"><div class="w"><span class="s-cap">Our philosophy</span>
    <p>${words("We roast on Tuesday, bake before sunrise, and pour every single cup like it is the very first one of the day.", { 3: P.roast, 7: P.buns, 12: P.pour })}</p></div></section>
  <section class="s-pin" data-pin style="background:var(--ch);color:var(--cr)"><div>
    <div class="s-ptop"><div class="w"><span class="s-cap" style="color:var(--ink)">From cherry to cup</span><span class="s-pbar"></span></div></div>
    <div class="s-track">${steps.map(s => `<div class="s-step"><b>${s[0]}</b><h3>${s[1]}</h3><p>${s[2]}</p></div>`).join("")}</div>
    ${bean("s-pbean")}</div></section>
  <section class="s-sig"><div class="w"><div class="s-h2row"><div><span class="s-cap rv">Signatures</span><h2 class="rv" style="--i:1">Three drinks you<br><em>only</em> find here.</h2></div><a class="s-pill rv" style="background:var(--cr);color:var(--ink)" data-hp="signatures"><i></i>All signatures</a></div>
    <div class="s-drinks">${drinks.map((d, i) => `<a class="s-dr rv" style="--i:${i};--img:${ph(d[4], 900)}" data-hp="signatures"><div class="t"><span>${d[0]}</span><span>€${d[3]}</span></div><div><h3>${d[1]}</h3><p>${d[2]}</p></div></a>`).join("")}</div></div></section>
  <section class="s-rain s-th-ja" style="background:var(--ja);color:var(--cr)">${rain}<div class="w"><span class="s-cap" style="position:relative;z-index:2">Every Tuesday</span><h2>Eleven minutes, <em>a thousand</em> beans.</h2><p>Our roaster fires up at six. By noon the whole canal smells of caramel. Come by and watch through the window.</p><a class="s-pill" style="margin-top:28px;position:relative;z-index:2;background:var(--go);color:var(--ink)" data-hp="roastery"><i></i>Inside the roastery</a></div></section>
  <section class="s-th-cr" style="background:var(--pa);color:var(--ink)"><div class="w s-tools">
    <a class="s-tool rv" style="background:var(--ch);color:var(--cr)" data-hp="finder"><span class="s-cap" style="color:var(--ink)">Coffee finder · 30 seconds</span><h3>Find your <em style="color:var(--ink)">perfect</em> coffee.</h3><p>Three quick questions and we suggest the bean that suits your taste.</p>${bean()}</a>
    <a class="s-tool rv" style="--i:1;background:var(--ink);color:var(--cr)" data-hp="brew"><span class="s-cap" style="color:var(--go)">Brew guide · calculator</span><h3>Brew it <em style="color:var(--go)">like we do.</em></h3><p>Grams, water, grind and a timer for your V60, AeroPress or French press.</p>${bean("", "filter:hue-rotate(30deg)")}</a></div>
    <div class="w" style="padding-bottom:clamp(64px,9cqi,120px)"><div class="s-h2row"><div><span class="s-cap rv">The journal</span><h2 class="rv" style="--i:1">Notes from <em>the bar.</em></h2></div><a class="s-pill ol rv" data-hp="journal"><i></i>All stories</a></div>
      <div class="s-posts">${posts.map((p, i) => `<a class="s-post rv" style="--i:${i}" data-hp="${p[0]}"><i style="--img:${ph(p[5], 700)}"></i><span class="s-cap">${p[3]} · ${p[4]}</span><h3>${p[1]}</h3><p>${p[2]}</p></a>`).join("")}</div></div></section>
</section>

${sp("menu", "Menu", "Everything, <em>made here.</em>", "From the bread to the cascara syrup. Oat milk never costs extra.", `<div class="w s-body"><div class="s-mg">
  <div class="rv"><h3>Coffee</h3>${[["Espresso", "This week’s house roast", "3.00"], ["Cortado", "Equal parts, served in glass", "3.40"], ["Halden flat", "Double ristretto of Guji", "4.20"], ["Pour over", "Choose from four origins", "5.00"], ["Canal Fog", "Our cold brew signature", "5.40"]].map(m => `<div class="s-li"><b>${m[0]}</b><span>€${m[2]}</span><p>${m[1]}</p></div>`).join("")}</div>
  <div class="rv" style="--i:1"><h3>Kitchen</h3>${[["Halden breakfast", "Sourdough, soft eggs, greens, aged Gouda", "14.50"], ["Cardamom bun", "Baked at six, gone by eleven", "3.80"], ["Pistachio cruffin", "Weekends only", "4.60"], ["Olive oil cake", "Orange, almond, crème fraîche", "4.40"], ["Shakshuka", "Labneh, herbs, flatbread", "13.00"]].map(m => `<div class="s-li"><b>${m[0]}</b><span>€${m[2]}</span><p>${m[1]}</p></div>`).join("")}</div></div></div>`)}

${sp("signatures", "Signatures", "Drinks with <em>a story.</em>", "Three recipes we spent a long time on. You will not find them anywhere else.", `<div class="w s-body">${drinks.map((d, i) => `<div class="s-row rv"><i style="--img:${ph(d[4], 900)}"></i><div><span class="s-cap">${d[0]} · Signature</span><h3>${d[1]}</h3><p>${d[2]}. Created at the bar and tested on our regulars for months.</p><span class="pr">€${d[3]}</span></div></div>`).join("")}</div>`, "ni")}

${sp("origins", "Origins", "Four farms, <em>one cup.</em>", "We buy through importers who visit every farm and pay well above the market price. Hover a coffee to see it.", `<div class="w s-body">${[["Guji", "Ethiopia", "Washed · 2,100 m", "Peach, jasmine, honey", P.latteBeans], ["Huila", "Colombia", "Washed · 1,750 m", "Red apple, caramel", P.roast], ["Cerrado", "Brazil", "Natural · 1,100 m", "Cocoa, hazelnut", P.pour], ["Cajamarca", "Peru", "Sugarcane decaf", "Plum, milk chocolate", P.pourover]].map((o, i) => `<div class="s-or rv" style="--i:${i}"><span class="n">0${i + 1}</span><div><small>${o[1]}</small><h3>${o[0]}</h3></div><div><small>Process</small>${o[2]}</div><div><small>Tastes of</small>${o[3]}</div><a class="s-pill ol" data-hp="finder"><i></i>Find yours</a><span class="ph" style="--img:${ph(o[4], 400)}"></span></div>`).join("")}</div>`, "ja")}

${sp("roastery", "Roastery", "Eleven <em>minutes.</em>", "Every Tuesday, in the back of the café. This is what a Halden roast looks like.", `<div class="w s-body"><div class="s-curve rv"><svg viewBox="0 0 800 300"><g stroke="currentColor" opacity=".15">${[60, 120, 180, 240].map(y => `<path d="M40 ${y}H780"/>`).join("")}</g>
  <path class="ln" d="M40 60 C 90 260, 140 250, 200 230 S 340 170, 420 140 S 560 90, 620 78 S 720 66, 780 62" fill="none" stroke="#E3A64A" stroke-width="3"/>
  <g fill="#E3A64A">${[[200, 230, "DRYING"], [420, 140, "BROWNING"], [620, 78, "FIRST CRACK"], [780, 62, "DROP · 11:00"]].map(p => `<circle cx="${p[0]}" cy="${p[1]}" r="6"/><text x="${p[0] - (p[0] > 700 ? 90 : 0)}" y="${p[1] - 18}">${p[2]}</text>`).join("")}</g>
  <text x="40" y="290">0:00</text><text x="740" y="290">11:00</text></svg></div>
  <div class="s-facts">${[["11", "minutes for a typical roast"], ["15", "kilos in our roaster per batch"], ["4", "coffees on the menu this season"]].map((f, i) => `<div class="rv" style="--i:${i}"><b>${f[0]}</b><p>${f[1]}</p></div>`).join("")}</div></div>`, "ni")}

${sp("story", "Story", "Small, <em>on purpose.</em>", "", `<div class="s-art"><p class="drop rv">Halden started in 2016 with one long room on the Oudegracht, six tables, and a second-hand roaster we were slightly afraid of. The idea was simple: do a few things, and do them better than anyone expects.</p>
  <p class="rv">We still roast every Tuesday. The first buns still go into the oven at six. And we still know most of our guests by name, and their order before they reach the bar.</p>
  <blockquote class="rv">“We wanted a place where the coffee is serious and nothing else is.”</blockquote>
  <p class="rv">Sanne and Joris (made-up founders of this made-up café) run Halden with a small team of baristas, bakers and one very patient roaster.</p></div>`)}

${sp("house", "The house", "One room, <em>by the water.</em>", "Six tables, a long bar and a window seat over the canal. Bring a book, stay a while.", `<div class="w s-body"><div class="s-mosaic rv">${[P.interior, P.cheers, P.croissant, P.latteMarble, P.brunch].map(p => `<i style="--img:${ph(p, 900)}"></i>`).join("")}</div>
  <div class="s-facts">${[["6", "tables and a long oak bar"], ["1", "window seat, the best in Utrecht"], ["∞", "water bowls for dogs"]].map((f, i) => `<div class="rv" style="--i:${i}"><b>${f[0]}</b><p>${f[1]}</p></div>`).join("")}</div></div>`)}

${sp("finder", "Coffee finder", "Find your <em>coffee.</em>", "Three questions, thirty seconds. Built into the site as a custom feature.", `<div class="w s-body"><div class="s-quiz" data-quiz>
  <div>${[["How do you take it?", ["Black", "With milk", "Iced"]], ["What do you like?", ["Fruity and bright", "Sweet and nutty", "Rich and chocolatey"]], ["When do you drink it?", ["Morning", "Afternoon", "Evening"]]].map((q, i) => `<div class="s-q rv" style="--i:${i}"><span class="s-cap">Question ${i + 1} of 3</span><h3>${q[0]}</h3><div class="s-opts" data-qq="${i}">${q[1].map((o, j) => `<button data-qa="${j}" aria-pressed="false">${o}</button>`).join("")}</div></div>`).join("")}</div>
  <div class="s-res rv" data-result>${bean()}<span class="s-cap" style="color:var(--go)">Your coffee</span><h3 data-rname>Answer the questions</h3><p data-rtext>Pick an answer for each question and we will match you with one of our four coffees.</p><div class="bar"><i data-rbar></i></div><small style="color:rgba(241,227,202,.6)" data-rcount>0 of 3 answered</small></div></div></div>`, "ch")}

${sp("brew", "Brew guide", "Brew it <em>like we do.</em>", "Choose your method and how many cups. We do the maths, you do the pouring.", `<div class="w s-body"><div class="s-calc" data-brew>
  <div class="rv"><span class="s-cap">Method</span><div class="s-chips" data-bm>${[["V60", 16, "Medium-fine", 180], ["AeroPress", 14, "Fine", 120], ["French press", 15, "Coarse", 240]].map((m, i) => `<button aria-pressed="${i === 0}" data-ratio="${m[1]}" data-grind="${m[2]}" data-time="${m[3]}">${m[0]}</button>`).join("")}</div>
    <span class="s-cap">Cups · <b data-cups>2</b></span><input type="range" min="1" max="6" value="2" aria-label="Number of cups">
    <div class="s-timer"><output data-timer>3:00</output><button class="s-pill" style="background:var(--go);color:var(--ink)" data-tstart><i></i>Start timer</button></div></div>
  <div class="s-out rv" style="--i:1"><div><small>Coffee</small><b data-g>30 g</b></div><div><small>Water</small><b data-ml>480 ml</b></div><div><small>Grind</small><b data-grd style="font-size:clamp(28px,3cqi,40px)">Medium-fine</b></div><div><small>Water temp</small><b>94°</b></div></div></div></div>`, "ja")}

${sp("journal", "Journal", "Notes from <em>the bar.</em>", "Stories about coffee, the people who grow it and the small things that make a better cup. The blog is part of the site.", `<div class="w s-body"><div class="s-posts">${posts.map((p, i) => `<a class="s-post rv" style="--i:${i}" data-hp="${p[0]}"><i style="--img:${ph(p[5], 700)}"></i><span class="s-cap">${p[3]} · ${p[4]} read</span><h3>${p[1]}</h3><p>${p[2]}</p></a>`).join("")}</div></div>`)}

${posts.map((p, k) => sp(p[0], "Journal · " + p[3], p[1], p[2], `<div class="w" style="padding-top:clamp(40px,6cqi,72px)"><div class="s-hero-img rv" style="--img:${ph(p[5], 1600)}"></div></div><div class="s-art"><div class="meta"><span>${p[3]}</span><span>${p[4]} read</span><span>By the Halden team</span></div>
  ${[["The roaster gets warm long before we do. By six it hums at two hundred degrees, and the first batch goes in as the sky over the canal turns grey.", "Roasting is a lot of listening. At around nine minutes the beans crack, a sound like popcorn, and from there every second changes the taste.", "Good roasting is mostly patience. The rest is a notebook full of numbers."],
     ["Guji is a region in the south of Ethiopia, high up, cool at night and green all year. The coffee grows in the shade of taller trees.", "The cherries are picked by hand and washed in clean river water, which gives this coffee its bright, tea-like taste of peach and jasmine.", "We buy it every year through the same importer, who visits the washing station and pays a price the growers agree with."],
     ["A cup of filter coffee is about ninety-eight percent water, so the water you use matters more than almost anything else.", "Utrecht tap water is fairly hard. That is fine for espresso machines with a filter, but it can make filter coffee taste flat.", "Our tip: try bottled water with low minerals once, brew the same coffee side by side, and taste the difference."]][k].map((t, i) => (i === 1 ? `<blockquote class="rv">${["Every second after the crack changes the taste.", "Bright, tea-like, peach and jasmine.", "Coffee is mostly water. Start there."][k]}</blockquote>` : "") + `<p class="${i === 0 ? "drop " : ""}rv">${t}</p>`).join("")}</div>`, k === 1 ? "cr" : k === 0 ? "ni" : "cr")).join("")}

${sp("events", "Events", "Evenings <em>at Halden.</em>", "Small groups, good coffee and the canal outside the window.", `<div class="w s-body">${[["04", "DEC · THU", "Cupping night", "Taste four origins side by side with our roaster.", "€18"], ["12", "DEC · FRI", "Jazz by the canal", "A trio in the window and espresso martinis.", "Free"], ["20", "DEC · SAT", "Latte art morning", "Hearts, tulips and a lot of milk.", "€35"], ["09", "JAN · FRI", "Natural wine & bakes", "With friends from down the street.", "€22"]].map((e, i) => `<a class="s-ev rv" style="--i:${i}" data-hp="reserve"><div class="d">${e[0]}<small>${e[1]}</small></div><div><h3>${e[2]}</h3><p>${e[3]}</p></div><span class="s-cap">${e[4]} · Book →</span></a>`).join("")}</div>`, "ni")}

${sp("school", "Barista school", "Learn <em>the craft.</em>", "Hands-on classes at our bar, for complete beginners and home baristas.", `<div class="w s-body"><div class="s-cards">${[["Espresso basics", "Grind, dose, time and taste. For your first machine.", "2 hours · €45"], ["Milk & latte art", "Steaming, texture and your first tulip.", "2 hours · €45"], ["Brewing at home", "V60, AeroPress and French press, side by side.", "90 min · €35"]].map((c, i) => `<a class="s-card rv" style="--i:${i}" data-hp="reserve"><span class="s-cap">Class 0${i + 1}</span><h3>${c[0]}</h3><p>${c[1]}</p><span class="s-cap">${c[2]} →</span></a>`).join("")}</div></div>`)}

${sp("reserve", "Reserve", "Save <em>a seat.</em>", "Pick a day and a time. You will get a confirmation by email.", `<div class="w s-body"><div class="s-two"><div data-steps><div data-step="0" class="on">
  <span class="s-cap">Day</span><div class="s-chips" data-chips="day">${["Today", "Tomorrow", "Saturday", "Sunday"].map((d, i) => `<button aria-pressed="${i === 1}" data-v="${d}">${d}</button>`).join("")}</div>
  <span class="s-cap">Time</span><div class="s-chips" data-chips="time">${["9:00", "10:30", "12:00", "14:00", "15:30"].map((t, i) => `<button aria-pressed="${i === 1}" data-v="${t}">${t}</button>`).join("")}</div>
  <span class="s-cap">Guests</span><div class="s-chips" data-chips="guests">${["1", "2", "3", "4", "5+"].map((t, i) => `<button aria-pressed="${i === 1}" data-v="${t}">${t}</button>`).join("")}</div>
  <div class="s-form">${field("Name")}${field("Email")}</div><button class="s-pill" style="margin-top:24px" data-next><i></i>Confirm reservation</button></div>
  <div data-step="1" class="s-done">${bean()}<h3>See you <em>soon.</em></h3><p>This is a demo, so nothing was booked: <b data-show="day"></b>, <b data-show="time"></b> for <b data-show="guests"></b>. On the real site the guest gets an email straight away.</p><button class="s-pill ol" data-restart><i></i>Book another</button></div></div>
  <div class="rv"><i style="display:block;aspect-ratio:4/5;border-radius:999px 999px 20px 20px;background:${ph(P.interior, 800)}"></i></div></div></div>`)}

${sp("private", "Private hire", "The whole room, <em>yours.</em>", "Team breakfasts, launches and evenings after closing, for up to forty guests.", `<div class="w s-body"><div class="s-two"><div class="rv"><i style="display:block;aspect-ratio:4/4.4;border-radius:20px;background:${ph(P.night, 900)}"></i></div>
  <div><div class="s-cards" style="grid-template-columns:1fr">${[["Morning", "Up to 14 guests, coffee and bakes, 8:00 to 10:30."], ["Evening", "After closing, with a barista, a tasting or a DJ."]].map((c, i) => `<div class="s-card rv" style="--i:${i}"><h3>${c[0]}</h3><p>${c[1]}</p></div>`).join("")}</div>
  <div class="s-form rv" style="margin-top:24px">${field("Name")}${field("Email")}${field("Date")}${field("Guests")}${field("Tell us about it", "", "textarea")}<a class="s-pill" data-demo><i></i>Send enquiry</a></div></div></div></div>`, "ni")}

${sp("wholesale", "Wholesale", "Halden, <em>at your place.</em>", "Fresh beans every week for cafés, restaurants and offices, with training for your team.", `<div class="w s-body"><div class="s-cards">${[["Roasted to order", "Your beans are roasted the week they are delivered."], ["Barista training", "We train your team on your own machine."], ["Machine advice", "Help choosing, installing and servicing equipment."]].map((c, i) => `<div class="s-card rv" style="--i:${i}"><span class="s-cap">0${i + 1}</span><h3>${c[0]}</h3><p>${c[1]}</p></div>`).join("")}</div>
  <div class="s-form rv" style="margin-top:48px;max-width:720px">${field("Business name")}${field("Email")}${field("How much coffee a week?", "For example 5 kg")}${field("City")}${field("Anything else?", "", "textarea")}<a class="s-pill" style="background:var(--go);color:var(--ink)" data-demo><i></i>Request a tasting</a></div></div>`, "ja")}

${sp("careers", "Careers", "Work <em>with us.</em>", "A small team that takes coffee seriously and each other kindly.", `<div class="w s-body">${[["Barista", "32–38 hours · Utrecht", "Some experience with espresso, lots of warmth."], ["Weekend baker", "16 hours · early mornings", "Laminated dough is your love language."]].map((j, i) => `<a class="s-ev rv" style="--i:${i}" data-demo><div class="d" style="font-size:44px">0${i + 1}</div><div><h3>${j[0]}</h3><p>${j[2]}</p></div><span class="s-cap">${j[1]} · Apply →</span></a>`).join("")}
  <p class="rv" style="color:var(--mut);margin-top:28px;font-size:14px">Example vacancies for this demo.</p></div>`)}

${sp("visit", "Visit & contact", "Find us <em>on the canal.</em>", "", `<div class="w s-body"><div class="s-visit"><div class="s-vmap rv">${map}<a class="s-pill" data-demo><i></i>Get directions</a></div>
  <div class="rv" style="--i:1"><span class="s-cap" data-status>Open now</span><ul class="s-hours" data-hours style="margin:14px 0 26px">${[["Monday", "7:30 – 18:00"], ["Tuesday", "7:30 – 18:00"], ["Wednesday", "7:30 – 18:00"], ["Thursday", "7:30 – 18:00"], ["Friday", "7:30 – 22:00"], ["Saturday", "9:00 – 17:00"], ["Sunday", "9:00 – 17:00"]].map(h => `<li><span>${h[0]}</span>${h[1]}</li>`).join("")}</ul>
  <div class="s-form">${field("Name")}${field("Email")}${field("Message", "", "textarea")}<a class="s-pill" data-demo><i></i>Send</a></div></div></div></div>`, "ni")}
</main>
<footer><div class="w"><div class="s-fcta"><h2>Come for a coffee, <em>stay for the morning.</em></h2><a class="s-pill" data-hp="reserve"><i></i>Reserve a table</a></div>
  <div class="s-fl">${groups.map(g => `<div><h4>${g[0]}</h4>${g[1].map(p => `<a data-hp="${p[0]}">${p[1]}</a>`).join("")}</div>`).join("")}</div>
  <div class="s-fbig" aria-hidden="true"><span>Halden</span><em>.</em></div>
  <div class="s-fb"><span>© 2026 Halden Koffiehuis · a made-up café for this demo</span><span>Oudegracht 112, Utrecht</span><span>Instagram · Privacy</span></div></div></footer>
</div>`;
  };

  /* =====================================================================
     Shared behaviour: page switching, menus, lightbox, tabs, filters, forms, tools.
     ===================================================================== */
  const viewOf = root => root.closest(".browser__view, .modal__body") || root.parentElement;
  const setPage = (root, id) => {
    root.querySelectorAll(".hp").forEach(p => p.classList.toggle("on", p.dataset.p === id));
    root.querySelectorAll("[data-hp]").forEach(a => a.classList.toggle("cur", a.dataset.hp === id));
    root.classList.remove("menu-open", "cms-on");
    root.querySelectorAll("[contenteditable]").forEach(el => el.removeAttribute("contenteditable"));
    const cms = root.querySelector("[data-cms]"); if (cms) cms.textContent = "✎ Try the editor";
    const pg = root.querySelector(".hp.on"), name = root.querySelector("[data-pgname]"), n = root.querySelector("[data-pgnum]");
    const idx = [...root.querySelectorAll(".hp")].indexOf(pg);
    if (n) n.textContent = String(idx + 1).padStart(2, "0");
    if (name) { const a = root.querySelector(`.s-ig [data-hp="${id}"]`); name.textContent = a ? a.lastChild.textContent : id; }
    const v = viewOf(root); if (v) v.scrollTop = 0;
    const url = document.getElementById("pkUrl");
    if (url && root.closest("#pkView")) url.textContent = "halden-coffee.com" + (id === "home" ? "" : "/" + id);
    onScroll(root);
  };
  const go = (root, id) => {
    if (root.dataset.page === id && !root.classList.contains("menu-open")) { const v = viewOf(root); if (v) v.scrollTo({ top: 0, behavior: RM ? "auto" : "smooth" }); return; }
    root.dataset.page = id;
    if ("curtain" in root.dataset && !RM) { root.classList.remove("swap"); void root.offsetWidth; root.classList.add("swap"); setTimeout(() => setPage(root, id), 420); setTimeout(() => root.classList.remove("swap"), 1000); }
    else setPage(root, id);
  };
  const clamp = x => Math.max(0, Math.min(1, x));
  function onScroll(root) {
    const v = viewOf(root); if (!v) return;
    const vr = v.getBoundingClientRect();
    root.classList.toggle("scrolled", v.scrollTop > 30);
    root.querySelectorAll(".hp.on [data-sc]").forEach(el => { const r = el.getBoundingClientRect(); el.style.setProperty("--p", clamp((vr.bottom - r.top) / (vr.height + r.height)).toFixed(3)); });
    root.querySelectorAll(".hp.on [data-pin]").forEach(el => { const r = el.getBoundingClientRect(); el.style.setProperty("--p", clamp((vr.top - r.top) / (r.height - vr.height)).toFixed(3)); });
  }
  const openState = root => {
    const d = new Date(), day = d.getDay(), m = d.getHours() * 60 + d.getMinutes();
    const late = root.classList.contains("hz") || root.classList.contains("hs");
    const wk = day >= 1 && day <= 5, open = wk ? 450 : 540;
    const close = !wk ? 1020 : !late ? 1020 : day === 5 ? 1320 : 1080;
    const t = x => `${Math.floor(x / 60)}:${String(x % 60).padStart(2, "0")}`;
    const isOpen = m >= open && m < close;
    root.querySelectorAll("[data-open]").forEach(el => el.textContent = isOpen ? `Open now · until ${t(close)}` : m < open ? `Opens today at ${t(open)}` : "Closed · opens tomorrow");
    root.querySelectorAll("[data-status]").forEach(el => { el.textContent = isOpen ? `● Open now, until ${t(close)}` : "● Closed right now"; el.classList.toggle("shut", !isOpen); });
    root.querySelectorAll("[data-hours] li").forEach((li, i) => li.classList.toggle("today", (i + 1) % 7 === day));
  };
  const COFFEES = [["Guji, Ethiopia", "Peach, jasmine and honey. Bright and floral, best black or as a pour over."], ["Huila, Colombia", "Red apple and caramel. Sweet and round, lovely with or without milk."], ["Cerrado, Brazil", "Cocoa and hazelnut. Rich and smooth, made for flat whites."], ["Cajamarca decaf, Peru", "Plum and milk chocolate, without the caffeine. Perfect for evenings."]];
  const quiz = root => {
    const q = root.querySelector("[data-quiz]"); if (!q) return;
    const a = [...q.querySelectorAll("[data-qq]")].map(g => { const b = g.querySelector('[aria-pressed="true"]'); return b ? +b.dataset.qa : -1; });
    const n = a.filter(x => x >= 0).length;
    q.querySelector("[data-rbar]").style.setProperty("--v", n / 3 * 100 + "%");
    q.querySelector("[data-rcount]").textContent = `${n} of 3 answered`;
    if (n < 3) return;
    const pick = a[2] === 2 ? 3 : a[1] === 0 ? 0 : a[1] === 1 ? 1 : 2;
    q.querySelector("[data-rname]").textContent = COFFEES[pick][0];
    q.querySelector("[data-rtext]").textContent = COFFEES[pick][1] + " €13 for 250 g.";
  };
  const brew = root => {
    const b = root.querySelector("[data-brew]"); if (!b) return;
    const m = b.querySelector("[data-bm] [aria-pressed='true']"), cups = +b.querySelector("input[type=range]").value;
    const water = cups * 240, g = Math.round(water / +m.dataset.ratio);
    b.querySelector("[data-cups]").textContent = cups; b.querySelector("[data-g]").textContent = g + " g"; b.querySelector("[data-ml]").textContent = water + " ml";
    b.querySelector("[data-grd]").textContent = m.dataset.grind;
    if (!b._t) { const s = +m.dataset.time; b.querySelector("[data-timer]").textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; }
  };
  const order = root => {
    const o = root.querySelector("[data-order]"); if (!o) return;
    let tot = 0; const li = [];
    o.querySelectorAll("[data-item]").forEach(r => { const q = +r.querySelector("output").value || +r.querySelector("output").textContent; if (q) { tot += q * +r.dataset.price; li.push(`<li><span>${q} × ${r.dataset.item}</span><span>€${(q * +r.dataset.price).toFixed(2)}</span></li>`); } });
    o.querySelector("[data-bag]").innerHTML = li.join("") || `<li style="opacity:.6">Nothing yet. Add something on the left.</li>`;
    o.querySelector("[data-total]").textContent = "€" + tot.toFixed(2);
  };
  const stepTo = (s, i) => {
    s.dataset.at = i;
    s.querySelectorAll("[data-step]").forEach(x => x.classList.toggle("on", +x.dataset.step === i));
    s.querySelectorAll(".z-prog span").forEach((x, j) => x.classList.toggle("on", j <= i));
    s.querySelectorAll("[data-show]").forEach(x => { const c = s.querySelector(`[data-chips="${x.dataset.show}"] [aria-pressed="true"]`); x.textContent = c ? c.dataset.v + (x.dataset.show === "guests" ? (c.dataset.v === "1" ? " guest" : " guests") : "") : ""; });
  };

  document.addEventListener("click", e => {
    const root = e.target.closest(".hd"); if (!root) return;
    const t = e.target;
    const hp = t.closest("[data-hp]"); if (hp) { e.preventDefault(); go(root, hp.dataset.hp); return; }
    if (t.closest("[data-menu]")) { root.classList.toggle("menu-open"); return; }
    const lb = t.closest("[data-lb]"); if (lb) { const box = root.querySelector(".h-lb"); box.querySelector("i").style.backgroundImage = `url(${photoUrl(lb.dataset.lb, 1600)})`; box.querySelector("span").textContent = lb.dataset.cap || ""; box.classList.add("on"); return; }
    if (t.closest("[data-lbx]")) { root.querySelector(".h-lb").classList.remove("on"); return; }
    const tab = t.closest("[data-tab]"); if (tab) { const w = tab.closest("[data-tabs]"); w.querySelectorAll("[data-tab]").forEach(b => b.setAttribute("aria-selected", b === tab)); w.querySelectorAll("[data-panel]").forEach(p => p.classList.toggle("on", p.dataset.panel === tab.dataset.tab)); return; }
    const f = t.closest("[data-filter]"); if (f) { const w = f.closest("[data-filters]"); w.querySelectorAll("[data-filter]").forEach(b => b.setAttribute("aria-pressed", b === f)); w.querySelectorAll("[data-cat]").forEach(a => a.classList.toggle("off", f.dataset.filter !== "all" && a.dataset.cat !== f.dataset.filter)); return; }
    const chip = t.closest("[data-chips] button, [data-bm] button, [data-qq] button"); if (chip) { chip.parentElement.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", b === chip)); quiz(root); brew(root); return; }
    const s = t.closest("[data-steps]");
    if (s && t.closest("[data-next]")) { stepTo(s, (+s.dataset.at || 0) + 1); return; }
    if (s && t.closest("[data-prev]")) { stepTo(s, Math.max(0, (+s.dataset.at || 0) - 1)); return; }
    if (s && t.closest("[data-restart]")) { stepTo(s, 0); return; }
    const qty = t.closest("[data-qty]"); if (qty) { const out = qty.parentElement.querySelector("output"); out.textContent = Math.max(0, Math.min(20, (+out.textContent || 0) + +qty.dataset.qty)); out.value = out.textContent; order(root); return; }
    if (t.closest("[data-cms]")) { const on = root.classList.toggle("cms-on"); root.querySelectorAll(".hp.on [data-ed]").forEach(el => on ? el.setAttribute("contenteditable", "true") : el.removeAttribute("contenteditable")); t.closest("[data-cms]").textContent = on ? "Done editing" : "✎ Try the editor"; return; }
    const ts = t.closest("[data-tstart]"); if (ts) {
      const b = root.querySelector("[data-brew]"), out = b.querySelector("[data-timer]");
      if (b._t) { clearInterval(b._t); b._t = 0; ts.lastChild.textContent = "Start timer"; brew(root); return; }
      let left = +b.querySelector("[data-bm] [aria-pressed='true']").dataset.time; ts.lastChild.textContent = "Stop";
      b._t = setInterval(() => { left--; out.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}`; if (left <= 0 || !document.contains(b)) { clearInterval(b._t); b._t = 0; out.textContent = "Enjoy"; ts.lastChild.textContent = "Start timer"; } }, 1000);
    }
  });
  document.addEventListener("input", e => { const root = e.target.closest && e.target.closest(".hd"); if (root && e.target.matches("[data-brew] input[type=range]")) brew(root); });

  let io, ro;
  const mount = view => {
    const root = view && view.querySelector(".hd"); if (!root) return;
    root.dataset.page = "home";
    const setVh = () => root.style.setProperty("--vh", view.clientHeight + "px");
    setVh(); if (ro) ro.disconnect(); if (window.ResizeObserver) { ro = new ResizeObserver(() => { setVh(); onScroll(root); }); ro.observe(view); }
    if (io) io.disconnect();
    const els = root.querySelectorAll(".rv");
    if (RM || !("IntersectionObserver" in window)) els.forEach(el => el.classList.add("in"));
    else { io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { root: view, threshold: .08 }); els.forEach(el => io.observe(el)); }
    if (view._hdScroll) view.removeEventListener("scroll", view._hdScroll);
    let raf = 0; view._hdScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; onScroll(root); }); };
    view.addEventListener("scroll", view._hdScroll, { passive: true });
    root.querySelectorAll('[data-hp="home"]').forEach(a => a.classList.add("cur"));
    openState(root); brew(root); onScroll(root);
    const note = document.querySelector(".pk__compare");
    if (note && root.closest("#pkView")) { const pk = Object.keys(PAGES).find(k => root.classList.contains({ basic: "hb", essential: "he", business: "hz", signature: "hs" }[k])); note.innerHTML = `This demo has <b>${PAGES[pk]} pages</b>, like the package. Click around inside it. Halden is a made-up coffee shop, built to show the packages. It is not client work.`; }
  };

  Object.assign(HALDEN, { basic, essential, business, signature, mount });
})();
