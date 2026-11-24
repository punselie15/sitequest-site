/* =========================================================
   Halden Coffee: the three package demos (a fictional coffee shop in Utrecht).
   Essential = simple and minimal, Business = premium and complete,
   Signature = its own identity, all in, still calm.
   Each demo is a container-query layout, so it adapts to the
   desktop and mobile preview sizes.
   Loads after sites.js (uses photoUrl, BEAN_DEFS, beanLayer).
   ========================================================= */
(() => {
  const ph = (id, w = 1200) => `url(${photoUrl(id, w)}) center/cover no-repeat`;
  const P = {
    interior: "1554118811-1e0d58224f24", night: "1501339847302-ac426a4a7cbb", pour: "1514066558159-fc8c737ef259",
    latteBeans: "1512568400610-62da28bc8a13", latteMarble: "1627469431699-a418fd7065db", cheers: "1495474472287-4d71bcdd2085",
    plants: "1509042239860-f550ce710b93", croissant: "1555507036-ab1f4038808a", buns: "1683806627608-208157b34241",
    brunch: "1424847651672-bf20a4b0982b", pourover: "1442512595331-e89e73853f31", roast: "1511537190424-bbbab87ac5eb",
  };

  /* ---------- Essential: simple and minimal ---------- */
  const essential = () => {
    const menu = [["Espresso", "2.60"], ["Cortado", "3.10"], ["Flat white", "3.80"], ["Cappuccino", "3.60"], ["Filter coffee", "3.20"], ["Chai latte", "4.00"], ["Croissant", "2.80"], ["Cardamom bun", "3.40"]];
    return `<div class="hd hd-e">
<style>
.hd{container-type:inline-size;min-height:100%;-webkit-font-smoothing:antialiased}
.hd *{box-sizing:border-box;margin:0}
.hd a{color:inherit;text-decoration:none;cursor:pointer}
.hd-e{--bg:#F7F5F1;--ink:#1C1B19;--mut:#77726B;--line:rgba(28,27,25,.12);background:var(--bg);color:var(--ink);font:400 16px/1.6 "Geist",system-ui,sans-serif}
.hd-e .h-in{width:min(100% - 2*clamp(20px,6cqi,72px),1040px);margin-inline:auto}
.hd-e nav{display:flex;align-items:center;justify-content:space-between;padding:26px 0}
.hd-e .h-logo{font-weight:600;letter-spacing:-.01em}
.hd-e .h-links{display:flex;gap:28px;font-size:14px;color:var(--mut)}
.hd-e .h-links a:hover{color:var(--ink)}
.hd-e .h-hero{padding:clamp(48px,9cqi,120px) 0 clamp(32px,5cqi,56px)}
.hd-e .h-kick{font-size:13px;color:var(--mut)}
.hd-e h1{font:500 clamp(40px,7.4cqi,92px)/1 "Bricolage Grotesque",sans-serif;letter-spacing:-.045em;margin:16px 0 22px;max-width:11ch}
.hd-e .h-lead{color:var(--mut);max-width:40ch;font-size:clamp(15px,1.6cqi,18px)}
.hd-e .h-cta{display:inline-flex;margin-top:28px;padding:12px 20px;border-radius:99px;background:var(--ink);color:var(--bg);font-size:14px;font-weight:500}
.hd-e .h-photo{aspect-ratio:21/9;border-radius:6px;background:${ph(P.plants, 1600)}}
.hd-e section{padding:clamp(48px,8cqi,104px) 0;border-bottom:1px solid var(--line)}
.hd-e .h-two{display:grid;grid-template-columns:1fr 1.6fr;gap:clamp(24px,6cqi,80px)}
.hd-e h2{font:500 clamp(24px,3cqi,34px)/1.1 "Bricolage Grotesque",sans-serif;letter-spacing:-.03em}
.hd-e .h-menu{display:grid;grid-template-columns:1fr 1fr;gap:0 40px}
.hd-e .h-menu div{display:flex;justify-content:space-between;padding:14px 0;border-bottom:1px solid var(--line);font-size:15px}
.hd-e .h-menu span{color:var(--mut);font-variant-numeric:tabular-nums}
.hd-e .h-about{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,6cqi,80px);align-items:center}
.hd-e .h-about i{display:block;aspect-ratio:4/5;border-radius:6px;background:${ph(P.croissant, 900)}}
.hd-e .h-about p{color:var(--mut);margin-top:16px;max-width:42ch}
.hd-e dl{display:grid;grid-template-columns:auto 1fr;gap:8px 24px;font-size:15px;margin-top:4px}
.hd-e dt{color:var(--mut)}
.hd-e form{display:grid;gap:10px;margin-top:4px}
.hd-e input,.hd-e textarea{width:100%;font:inherit;font-size:15px;padding:12px 0;border:0;border-bottom:1px solid var(--line);background:none;color:inherit;outline:none}
.hd-e textarea{height:70px;resize:none}
.hd-e form a{justify-self:start;margin-top:8px}
.hd-e footer{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:28px 0 36px;font-size:13px;color:var(--mut)}
@container (max-width:640px){
  .hd-e .h-links{gap:16px}.hd-e .h-links a:nth-child(3){display:none}
  .hd-e .h-two,.hd-e .h-about,.hd-e .h-menu{grid-template-columns:1fr}
  .hd-e .h-photo{aspect-ratio:4/3}
}
</style>
<div class="h-in" id="top">
  <nav><a class="h-logo" data-goto="top">Halden Coffee</a><div class="h-links"><a data-goto="s1">Menu</a><a data-goto="s2">About</a><a data-goto="s3">Visit</a></div></nav>
  <div class="h-hero"><p class="h-kick">Coffee bar · Utrecht</p><h1>Good coffee, close to home.</h1><p class="h-lead">Freshly roasted beans, a short menu and a quiet corner on the Oudegracht. Open every morning from 7:30.</p><a class="h-cta" data-goto="s1">See the menu</a></div>
  <div class="h-photo" role="img" aria-label="Coffee on a café table"></div>
  <section id="s1"><div class="h-two"><h2>Menu</h2><div class="h-menu">${menu.map(m => `<div>${m[0]}<span>€${m[1]}</span></div>`).join("")}</div></div></section>
  <section id="s2"><div class="h-about"><div><h2>Small, on purpose.</h2><p>Halden is one room, six tables and a bar. We roast in small batches, bake every morning and keep the menu short, so everything on it is good.</p></div><i role="img" aria-label="Croissants"></i></div></section>
  <section id="s3"><div class="h-two"><div><h2>Visit</h2><dl style="margin-top:18px"><dt>Address</dt><dd>Oudegracht 112, Utrecht</dd><dt>Mon–Fri</dt><dd>7:30 – 17:00</dd><dt>Sat–Sun</dt><dd>9:00 – 17:00</dd></dl></div>
    <form onsubmit="return false"><input placeholder="Your name" aria-label="Your name"><input placeholder="Email" aria-label="Email"><textarea placeholder="Your message" aria-label="Message"></textarea><a class="h-cta" data-demo>Send</a></form></div></section>
  <footer><span>© 2026 Halden Coffee</span><span>Instagram · hello@halden-coffee.com</span></footer>
</div></div>`;
  };

  /* ---------- Business: premium, luxurious and complete ---------- */
  const business = () => {
    const tabs = {
      Coffee: [["Espresso", "Single origin, rotating", "2.80"], ["Flat white", "Double ristretto, silky milk", "3.90"], ["Cortado", "Equal parts, served in glass", "3.40"], ["Pour over", "Brewed to order, ask for today’s beans", "4.80"], ["Iced oat latte", "With house vanilla", "4.60"], ["Hojicha latte", "Roasted green tea, honey", "4.40"]],
      Breakfast: [["Sourdough & butter", "Cultured butter, sea salt", "5.50"], ["Soft eggs on toast", "Chives, brown butter", "11.00"], ["Granola bowl", "Yoghurt, poached pear", "9.50"], ["Ricotta pancakes", "Seasonal fruit, maple", "12.50"]],
      Pastry: [["Cardamom bun", "Our bestseller since 2016", "3.60"], ["Butter croissant", "Laminated over three days", "3.20"], ["Pistachio twist", "Brown sugar, orange zest", "3.90"], ["Almond financier", "Gluten free", "3.00"]],
    };
    const events = [["Sat 6 Dec", "Saturday cupping", "Taste four coffees side by side with our roaster.", "Free"], ["Thu 11 Dec", "Latte art evening", "Two hours, one jug, a lot of milk. Beginners welcome.", "€35"], ["Sun 14 Dec", "Jazz & brunch", "A slow Sunday with the Hendrik Trio.", "Reserve"]];
    return `<div class="hd hd-b">
<style>
.hd{container-type:inline-size;min-height:100%;-webkit-font-smoothing:antialiased}
.hd *{box-sizing:border-box;margin:0}
.hd a{color:inherit;text-decoration:none;cursor:pointer}
.hd-b{--bg:#F4EFE6;--paper:#FBF8F2;--ink:#1D2621;--mut:#6B6F66;--green:#1F2D26;--brass:#B08D57;--line:rgba(29,38,33,.14);background:var(--bg);color:var(--ink);font:400 15px/1.65 "Geist",system-ui,sans-serif}
.hd-b .h-in{width:min(100% - 2*clamp(20px,5cqi,64px),1180px);margin-inline:auto}
.hd-b .h-serif{font-family:"Cormorant Garamond",Georgia,serif;font-weight:400;letter-spacing:-.01em}
.hd-b .h-caps{font-size:11px;letter-spacing:.24em;text-transform:uppercase}
.hd-b .h-bar{background:var(--green);color:#E9E2D4;text-align:center;padding:9px 16px;font-size:12.5px;letter-spacing:.04em}
.hd-b .h-bar b{color:var(--brass);font-weight:500}
.hd-b nav{position:relative;z-index:2;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:22px 0;color:#F4EFE6}
.hd-b .h-links{display:flex;gap:26px;font-size:13px;letter-spacing:.06em}
.hd-b .h-links a:hover{color:var(--brass)}
.hd-b .h-mark{text-align:center;line-height:1}
.hd-b .h-mark b{display:block;font:500 30px/1 "Cormorant Garamond",serif;letter-spacing:.32em;padding-left:.32em}
.hd-b .h-mark small{font-size:9px;letter-spacing:.42em;opacity:.75}
.hd-b .h-acts{display:flex;gap:10px;justify-content:end}
.hd-b .h-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 20px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;border:1px solid currentColor;border-radius:0;transition:background .3s,color .3s}
.hd-b .h-btn.h-solid{background:var(--brass);border-color:var(--brass);color:#1D2621}
.hd-b .h-btn.h-solid:hover{background:#C9A56C}
.hd-b .h-hero{position:relative;min-height:clamp(520px,64cqi,760px);display:flex;flex-direction:column;color:#F4EFE6;overflow:hidden}
.hd-b .h-hero::before{content:"";position:absolute;inset:0;background:${ph(P.interior, 1800)};transform:scale(1.04);animation:hdbz 18s ease-out both}
.hd-b .h-hero::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(18,26,22,.75),rgba(18,26,22,.2) 70%),linear-gradient(180deg,rgba(18,26,22,.7),rgba(18,26,22,.3) 40%,rgba(18,26,22,.88))}
@keyframes hdbz{from{transform:scale(1.14)}}
.hd-b .h-hero>*{position:relative;z-index:1}
.hd-b .h-hero .h-copy{margin-top:auto;padding:0 0 clamp(28px,4cqi,48px)}
.hd-b .h-hero h1{font-size:clamp(46px,8.4cqi,116px);line-height:.95;max-width:12ch;margin:26px 0 22px;color:#F4EFE6}
.hd-b .h-hero h1 em{font-style:normal;color:#E2C291}
.hd-b .h-hero p{max-width:44ch;opacity:.85;font-size:clamp(15px,1.5cqi,17px)}
.hd-b .h-copy .h-acts{justify-content:start;margin-top:28px}
.hd-b .h-strip{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid rgba(244,239,230,.2);background:rgba(18,26,22,.45);backdrop-filter:blur(10px)}
.hd-b .h-strip div{padding:18px clamp(16px,2.4cqi,28px);border-left:1px solid rgba(244,239,230,.14);font-size:13px}
.hd-b .h-strip div:first-child{border-left:0}
.hd-b .h-strip b{display:block;font-weight:500;font-size:14px;margin-top:2px}
.hd-b .h-strip i{display:inline-block;width:7px;height:7px;border-radius:50%;background:#7BC48F;margin-right:7px;box-shadow:0 0 0 4px rgba(123,196,143,.2)}
.hd-b section{padding:clamp(64px,9cqi,120px) 0}
.hd-b .h-head{display:flex;justify-content:space-between;align-items:end;gap:20px;flex-wrap:wrap;margin-bottom:clamp(28px,4cqi,48px)}
.hd-b h2{font-size:clamp(36px,5.4cqi,68px);line-height:.98;margin-top:12px}
.hd-b .h-kick{color:var(--brass)}
.hd-b .h-menuwrap{display:grid;grid-template-columns:1.5fr 1fr;gap:clamp(24px,5cqi,64px);align-items:start}
.hd-b .h-tabs input{position:absolute;opacity:0;pointer-events:none}
.hd-b .h-tabs label{display:inline-block;padding:10px 0;margin-right:26px;font-size:12px;letter-spacing:.2em;text-transform:uppercase;color:var(--mut);border-bottom:1px solid transparent;cursor:pointer}
.hd-b .h-panel{display:none;margin-top:18px}
.hd-b #hdt0:checked~.h-tabl label[for=hdt0],.hd-b #hdt1:checked~.h-tabl label[for=hdt1],.hd-b #hdt2:checked~.h-tabl label[for=hdt2]{color:var(--ink);border-color:var(--brass)}
.hd-b #hdt0:checked~.h-p0,.hd-b #hdt1:checked~.h-p1,.hd-b #hdt2:checked~.h-p2{display:block}
.hd-b .h-item{display:grid;grid-template-columns:1fr auto;gap:2px 16px;padding:16px 0;border-bottom:1px solid var(--line)}
.hd-b .h-item b{font:500 22px/1.2 "Cormorant Garamond",serif}
.hd-b .h-item span{color:var(--mut);font-size:13.5px;grid-column:1}
.hd-b .h-item em{font-style:normal;grid-row:1/3;grid-column:2;align-self:center;font-variant-numeric:tabular-nums}
.hd-b .h-feat{position:relative;aspect-ratio:3/4;background:${ph(P.pour, 1000)};color:#F4EFE6;display:flex;align-items:end;padding:22px}
.hd-b .h-feat::after{content:"";position:absolute;inset:0;background:linear-gradient(transparent 45%,rgba(18,26,22,.8))}
.hd-b .h-feat div{position:relative;z-index:1}
.hd-b .h-feat b{display:block;font:400 28px/1.1 "Cormorant Garamond",serif;margin-top:6px}
.hd-b .h-order{background:var(--green);color:#EDE6D8}
.hd-b .h-order .h-wrap{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,6cqi,80px);align-items:center}
.hd-b .h-order p{opacity:.78;max-width:42ch;margin-top:16px}
.hd-b .h-steps{display:grid;gap:14px;margin-top:28px;counter-reset:s}
.hd-b .h-steps div{display:flex;gap:14px;align-items:center;font-size:14px}
.hd-b .h-steps div::before{counter-increment:s;content:counter(s);flex:none;width:30px;height:30px;border:1px solid var(--brass);border-radius:50%;display:grid;place-items:center;color:var(--brass);font-size:12px}
.hd-b .h-ticket{background:var(--paper);color:var(--ink);padding:26px;box-shadow:0 40px 80px -40px rgba(0,0,0,.6);max-width:380px;justify-self:center;width:100%}
.hd-b .h-ticket .h-row{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px dashed var(--line);font-size:14px}
.hd-b .h-ticket .h-tot{border:0;font-weight:500;padding-top:14px}
.hd-b .h-ticket .h-slot{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:16px 0}
.hd-b .h-ticket .h-slot span{text-align:center;padding:8px 0;border:1px solid var(--line);font-size:13px}
.hd-b .h-ticket .h-slot span.h-on{background:var(--green);color:#F4EFE6;border-color:var(--green)}
.hd-b .h-ticket .h-btn{width:100%;justify-content:center}
.hd-b .h-events{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(12px,2cqi,24px)}
.hd-b .h-ev{background:var(--paper);display:grid;grid-template-rows:auto 1fr;transition:transform .4s,box-shadow .4s}
.hd-b .h-ev:hover{transform:translateY(-4px);box-shadow:0 30px 50px -36px rgba(29,38,33,.5)}
.hd-b .h-ev i{display:block;aspect-ratio:16/11}
.hd-b .h-ev div{padding:20px 22px 24px;display:grid;gap:6px}
.hd-b .h-ev b{font:500 26px/1.1 "Cormorant Garamond",serif}
.hd-b .h-ev p{color:var(--mut);font-size:14px}
.hd-b .h-ev .h-foot{display:flex;justify-content:space-between;align-items:center;margin-top:10px;padding-top:12px;border-top:1px solid var(--line);font-size:12px;letter-spacing:.16em;text-transform:uppercase}
.hd-b .h-visit{display:grid;grid-template-columns:1.2fr 1fr;gap:clamp(24px,5cqi,64px)}
.hd-b .h-map{position:relative;min-height:320px;background:#E6DFD2;overflow:hidden}
.hd-b .h-map::before{content:"";position:absolute;inset:-20%;background:repeating-linear-gradient(28deg,transparent 0 46px,rgba(29,38,33,.07) 46px 48px),repeating-linear-gradient(-62deg,transparent 0 70px,rgba(29,38,33,.06) 70px 72px)}
.hd-b .h-map .h-canal{position:absolute;left:-10%;right:-10%;top:52%;height:26px;background:#B9C7C0;transform:rotate(-8deg)}
.hd-b .h-map .h-pin{position:absolute;left:46%;top:38%;display:flex;align-items:center;gap:10px;background:var(--green);color:#F4EFE6;padding:8px 14px 8px 8px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;box-shadow:0 14px 30px -12px rgba(0,0,0,.5)}
.hd-b .h-map .h-pin::before{content:"H";width:24px;height:24px;display:grid;place-items:center;background:var(--brass);color:var(--green);font:600 14px "Cormorant Garamond",serif}
.hd-b .h-hours{display:grid;gap:0;margin:18px 0 26px}
.hd-b .h-hours div{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--line);font-size:14px}
.hd-b .h-hours div.h-today{color:var(--green);font-weight:500}
.hd-b .h-res{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.hd-b .h-res span{border:1px solid var(--line);padding:11px 12px;font-size:13px;background:var(--paper)}
.hd-b .h-res small{display:block;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--mut)}
.hd-b .h-res .h-btn{grid-column:1/-1;justify-content:center;margin-top:4px}
.hd-b .h-news{text-align:center;border-top:1px solid var(--line)}
.hd-b .h-news form{display:flex;max-width:460px;margin:26px auto 0;border-bottom:1px solid var(--ink)}
.hd-b .h-news input{flex:1;min-width:0;border:0;background:none;font:inherit;padding:12px 0;outline:none;color:inherit}
.hd-b .h-news a{font-size:12px;letter-spacing:.18em;text-transform:uppercase;align-self:center}
.hd-b footer{background:var(--green);color:#CFC8B8;padding:clamp(44px,6cqi,72px) 0 28px;font-size:13.5px}
.hd-b footer .h-cols{display:grid;grid-template-columns:1.4fr repeat(3,1fr);gap:28px}
.hd-b footer h4{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--brass);font-weight:500;margin-bottom:12px}
.hd-b footer p{line-height:1.9}
.hd-b footer .h-mark b{font-size:26px;color:#F4EFE6}
.hd-b footer .h-base{display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-top:40px;padding-top:20px;border-top:1px solid rgba(244,239,230,.12);font-size:12px;opacity:.7}
@container (max-width:640px){
  .hd-b nav{grid-template-columns:auto 1fr}.hd-b nav .h-links{display:none}.hd-b .h-mark{text-align:left}.hd-b nav .h-acts .h-btn:not(.h-solid){display:none}
  .hd-b .h-strip{grid-template-columns:1fr}.hd-b .h-strip div{border-left:0;border-top:1px solid rgba(244,239,230,.12);padding-block:12px}
  .hd-b .h-menuwrap,.hd-b .h-order .h-wrap,.hd-b .h-visit{grid-template-columns:1fr}
  .hd-b .h-feat{aspect-ratio:16/10}
  .hd-b .h-events{grid-template-columns:1fr}
  .hd-b footer .h-cols{grid-template-columns:1fr 1fr}
}
</style>
<div class="h-bar">Order ahead and skip the queue · <b>Ready in about 8 minutes</b></div>
<div class="h-hero" id="top">
  <div class="h-in"><nav><div class="h-links"><a data-goto="s1">Menu</a><a data-goto="s2">Order ahead</a><a data-goto="s3">Events</a><a data-goto="s4">Visit</a></div>
    <a class="h-mark" data-goto="top"><b>HALDEN</b><small>KOFFIEHUIS · UTRECHT</small></a>
    <div class="h-acts"><a class="h-btn" data-goto="s4">Reserve</a><a class="h-btn h-solid" data-goto="s2">Order</a></div></nav></div>
  <div class="h-in h-copy"><span class="h-caps h-kick">Est. 2016 · Oudegracht 112</span><h1 class="h-serif">A quiet ritual, <em>poured with care.</em></h1>
    <p>Speciality coffee roasted in-house, pastries baked before sunrise and a long table by the canal. Stay for an hour or order ahead and take it with you.</p>
    <div class="h-acts"><a class="h-btn h-solid" data-goto="s1">View the menu</a><a class="h-btn" data-goto="s4">Reserve a table</a></div></div>
  <div class="h-strip"><div><span class="h-caps" style="opacity:.7">Today</span><b><i></i>Open until 18:00</b></div><div><span class="h-caps" style="opacity:.7">Find us</span><b>Oudegracht 112, Utrecht</b></div><div><span class="h-caps" style="opacity:.7">Order ahead</span><b>Pick up in 8 minutes</b></div></div>
</div>
<section id="s1"><div class="h-in">
  <div class="h-head"><div><span class="h-caps h-kick">The menu</span><h2 class="h-serif">Made slowly, served simply.</h2></div><a class="h-btn" data-demo>Download the full menu</a></div>
  <div class="h-menuwrap"><div class="h-tabs">
    <input type="radio" name="hdtab" id="hdt0" checked><input type="radio" name="hdtab" id="hdt1"><input type="radio" name="hdtab" id="hdt2">
    <div class="h-tabl">${Object.keys(tabs).map((t, i) => `<label for="hdt${i}">${t}</label>`).join("")}</div>
    ${Object.values(tabs).map((list, i) => `<div class="h-panel h-p${i}">${list.map(m => `<div class="h-item"><b>${m[0]}</b><span>${m[1]}</span><em>€${m[2]}</em></div>`).join("")}</div>`).join("")}
  </div>
  <div class="h-feat"><div><span class="h-caps" style="color:var(--brass)">This month</span><b>Gesha, Finca La Esperanza</b><span style="font-size:13px;opacity:.8">Jasmine, bergamot, peach · €6.50</span></div></div></div>
</div></section>
<section class="h-order" id="s2"><div class="h-in h-wrap">
  <div><span class="h-caps h-kick">Order ahead</span><h2 class="h-serif">Your coffee, waiting for you.</h2><p>Order from your phone, choose a pick-up time and walk straight past the queue. Pay online or at the bar.</p>
    <div class="h-steps"><div>Choose your drinks and pastries</div><div>Pick a time that suits you</div><div>Collect at the brass counter</div></div></div>
  <div class="h-ticket"><span class="h-caps" style="color:var(--mut)">Your order</span>
    <div class="h-row" style="margin-top:10px"><span>Flat white, oat</span><span>€4.30</span></div><div class="h-row"><span>Cardamom bun</span><span>€3.60</span></div><div class="h-row h-tot"><span>Total</span><span>€7.90</span></div>
    <span class="h-caps" style="color:var(--mut)">Pick-up time</span><div class="h-slot"><span>08:15</span><span class="h-on">08:30</span><span>08:45</span></div>
    <a class="h-btn h-solid" data-demo>Place order</a></div>
</div></section>
<section id="s3"><div class="h-in">
  <div class="h-head"><div><span class="h-caps h-kick">At Halden</span><h2 class="h-serif">Evenings & events</h2></div><a class="h-btn" data-demo>All events</a></div>
  <div class="h-events">${events.map((e, i) => `<a class="h-ev" data-demo><i style="background:${ph([P.pourover, P.latteMarble, P.brunch][i], 800)}"></i><div><span class="h-caps h-kick">${e[0]}</span><b>${e[1]}</b><p>${e[2]}</p><div class="h-foot"><span>${e[3]}</span><span>Book →</span></div></div></a>`).join("")}</div>
</div></section>
<section id="s4" style="padding-top:0"><div class="h-in h-visit">
  <div class="h-map" role="img" aria-label="Map showing Halden on the Oudegracht"><div class="h-canal"></div><span class="h-pin">Halden</span></div>
  <div><span class="h-caps h-kick">Visit</span><h2 class="h-serif">By the canal.</h2>
    <div class="h-hours">${[["Monday – Friday", "7:30 – 18:00", 1], ["Saturday", "8:30 – 18:00"], ["Sunday", "9:00 – 17:00"]].map(h => `<div class="${h[2] ? "h-today" : ""}"><span>${h[0]}</span><span>${h[1]}</span></div>`).join("")}</div>
    <div class="h-res"><span><small>Date</small>Sat 6 Dec</span><span><small>Time</small>10:30</span><span><small>Guests</small>2</span><a class="h-btn h-solid" data-demo>Reserve a table</a></div></div>
</div></section>
<section class="h-news"><div class="h-in"><span class="h-caps h-kick">The Halden letter</span><h2 class="h-serif" style="font-size:clamp(30px,4cqi,48px)">New beans and events, once a month.</h2>
  <form onsubmit="return false"><input placeholder="Your email address" aria-label="Email"><a data-demo>Subscribe →</a></form></div></section>
<footer><div class="h-in"><div class="h-cols">
  <div><a class="h-mark" data-goto="top" style="text-align:left;display:block"><b style="padding-left:0">HALDEN</b><small>KOFFIEHUIS · UTRECHT</small></a><p style="margin-top:16px;max-width:30ch">Speciality coffee, roasted in Utrecht since 2016.</p></div>
  <div><h4>Visit</h4><p>Oudegracht 112<br>3511 AW Utrecht<br>+31 30 000 0000</p></div>
  <div><h4>Explore</h4><p>Menu<br>Order ahead<br>Events<br>Gift cards</p></div>
  <div><h4>Follow</h4><p>Instagram<br>The Halden letter<br>Careers</p></div></div>
  <div class="h-base"><span>© 2026 Halden Koffiehuis</span><span>Privacy · Terms · Accessibility</span></div></div></footer>
</div>`;
  };

  /* ---------- Signature: its own identity, all in ---------- */
  const signature = () => {
    const drinks = [["01", "The Halden", "Double ristretto, brown-butter milk, a pinch of sea salt.", "5.20", P.pour], ["02", "Canal Tonic", "Cold brew, elderflower tonic, orange peel.", "5.80", P.cheers], ["03", "Morning Gold", "Turmeric, oat milk, honey from the roof.", "4.90", P.latteMarble]];
    return `<div class="hd hd-s">
<style>
.hd{container-type:inline-size;min-height:100%;-webkit-font-smoothing:antialiased}
.hd *{box-sizing:border-box;margin:0}
.hd a{color:inherit;text-decoration:none;cursor:pointer}
.hd-s{--cream:#EFE6D8;--paper:#F7F1E7;--esp:#1E140F;--terra:#C2502A;--mut:#7D6B5E;--line:rgba(30,20,15,.14);background:var(--cream);color:var(--esp);font:400 15px/1.6 "Geist",system-ui,sans-serif;overflow:hidden}
.hd-s .h-in{width:min(100% - 2*clamp(20px,5cqi,64px),1200px);margin-inline:auto}
.hd-s .h-disp{font-family:"Fraunces",Georgia,serif;font-variation-settings:"opsz" 144;letter-spacing:-.04em}
.hd-s .h-caps{font-size:11px;letter-spacing:.26em;text-transform:uppercase}
.hd-s nav{position:relative;z-index:4;display:flex;align-items:center;justify-content:space-between;padding:22px 0}
.hd-s .h-mono{display:flex;align-items:center;gap:10px}
.hd-s .h-mono svg{width:38px;height:38px}
.hd-s .h-mono span{font:600 13px/1.1 "Geist",sans-serif;letter-spacing:.3em}
.hd-s .h-links{display:flex;gap:28px;font-size:13px}
.hd-s .h-links a{position:relative}
.hd-s .h-links a::after{content:"";position:absolute;left:0;right:0;bottom:-3px;height:1px;background:currentColor;transform:scaleX(0);transform-origin:right;transition:transform .5s cubic-bezier(.2,.7,.1,1)}
.hd-s .h-links a:hover::after{transform:scaleX(1);transform-origin:left}
.hd-s .h-pill{display:inline-flex;align-items:center;gap:10px;padding:12px 20px;border-radius:99px;background:var(--esp);color:var(--cream);font-size:13px;font-weight:500;transition:background .3s}
.hd-s .h-pill:hover{background:var(--terra)}
.hd-s .h-pill i{width:6px;height:6px;border-radius:50%;background:var(--terra)}
.hd-s .h-pill:hover i{background:var(--cream)}
.hd-s .sig-hero{position:relative;--mx:0;--my:0;--sy:0;min-height:clamp(560px,72cqi,860px);display:flex;flex-direction:column}
.hd-s .h-meta{position:relative;z-index:3;display:flex;justify-content:space-between;gap:16px;margin-top:clamp(12px,3cqi,32px);font-size:13px;color:var(--mut)}
.hd-s .h-meta b{display:block;color:var(--esp);font-weight:500}
.hd-s .h-orbit{position:absolute;z-index:1;left:50%;top:47%;width:clamp(230px,34cqi,440px);aspect-ratio:1;translate:-50% -50%;transform:translate3d(calc(var(--mx)*-26px),calc(var(--my)*-26px + var(--sy)*-.25px),0);transition:transform 1.1s cubic-bezier(.16,1,.3,1)}
.hd-s .h-cup{position:absolute;inset:13%;border-radius:50%;background:${ph(P.latteBeans, 1000)};background-size:150%;box-shadow:0 50px 90px -30px rgba(30,20,15,.6);animation:hdsspin 90s linear infinite}
.hd-s .h-ring{position:absolute;inset:0;animation:hdsspin 30s linear infinite}
.hd-s .h-ring text{font:500 10.5px "Geist",sans-serif;letter-spacing:.42em;fill:var(--esp)}
@keyframes hdsspin{to{transform:rotate(360deg)}}
.hd-s .sig-beans{position:absolute;inset:0;z-index:2;pointer-events:none}
.hd-s .sig-bean{position:absolute;aspect-ratio:100/130;transform:translate3d(calc(var(--mx)*var(--d)*-110px),calc(var(--my)*var(--d)*-110px + var(--sy)*var(--d)*-.5px),0);transition:transform 1.1s cubic-bezier(.16,1,.3,1);filter:drop-shadow(0 calc(var(--d)*24px) calc(var(--d)*18px) rgba(30,20,15,.35))}
.hd-s .sig-bean svg{width:100%;height:100%;display:block;overflow:visible;transform:rotate(var(--r));animation:hdsfloat var(--f) ease-in-out infinite alternate}
.hd-s .sig-bean.far{filter:blur(1.4px);opacity:.75}
.hd-s .sig-bean.near{filter:blur(2.5px)}
.hd-s .sig-bean:nth-child(-n+5),.hd-s .sig-bean:nth-child(n+11){display:none}
@keyframes hdsfloat{to{transform:rotate(calc(var(--r) + 18deg)) translateY(-14px)}}
.hd-s .h-word{position:relative;z-index:3;margin-top:auto;font-size:clamp(84px,22.5cqi,300px);line-height:.78;font-weight:600;letter-spacing:-.065em;text-align:center;white-space:nowrap;padding-bottom:clamp(14px,2cqi,24px)}
.hd-s .h-word span{display:inline-block;animation:hdsup 1.3s cubic-bezier(.2,.7,.1,1) both}
.hd-s .h-word span:nth-child(2){animation-delay:.05s}.hd-s .h-word span:nth-child(3){animation-delay:.1s}.hd-s .h-word span:nth-child(4){animation-delay:.15s}.hd-s .h-word span:nth-child(5){animation-delay:.2s}.hd-s .h-word span:nth-child(6){animation-delay:.25s}
.hd-s .h-word em{font-style:italic;font-weight:300;color:var(--terra)}
@keyframes hdsup{from{transform:translateY(40%);opacity:0}}
.hd-s .h-tick{display:flex;justify-content:space-between;align-items:center;gap:16px;border-top:1px solid var(--line);padding:16px 0;font-size:13px;color:var(--mut)}
.hd-s .h-man{padding:clamp(72px,11cqi,150px) 0;text-align:center}
.hd-s .h-man p{font-size:clamp(30px,5cqi,64px);line-height:1.08;max-width:18ch;margin:22px auto 0;font-weight:400}
.hd-s .h-man i{display:inline-block;vertical-align:middle;width:1.9em;height:.92em;border-radius:99px;margin:0 .12em;translate:0 -.06em}
.hd-s .h-man em{font-style:italic;color:var(--terra)}
.hd-s .h-dark{background:var(--esp);color:var(--cream);padding:clamp(64px,9cqi,120px) 0}
.hd-s .h-dark .h-head{display:flex;justify-content:space-between;align-items:end;gap:20px;flex-wrap:wrap;margin-bottom:clamp(28px,4cqi,52px)}
.hd-s h2{font-size:clamp(38px,6cqi,80px);line-height:.95;font-weight:500}
.hd-s h2 em{font-style:italic;font-weight:300;color:var(--terra)}
.hd-s .h-drinks{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(12px,2cqi,24px)}
.hd-s .h-dr{position:relative;aspect-ratio:3/4.2;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;padding:20px;color:var(--cream);isolation:isolate}
.hd-s .h-dr::before{content:"";position:absolute;inset:0;z-index:-2;background:var(--img);transition:transform 1.4s cubic-bezier(.2,.7,.1,1);filter:saturate(.85)}
.hd-s .h-dr::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(rgba(30,20,15,.15),rgba(30,20,15,.2) 40%,rgba(30,20,15,.88))}
.hd-s .h-dr:hover::before{transform:scale(1.08)}
.hd-s .h-dr .h-n{display:flex;justify-content:space-between;font-size:12px;letter-spacing:.2em}
.hd-s .h-dr b{display:block;font:500 clamp(26px,3cqi,38px)/1 "Fraunces",serif;letter-spacing:-.03em;margin-bottom:8px}
.hd-s .h-dr p{font-size:13.5px;opacity:.78;max-width:28ch}
.hd-s .h-house{display:grid;grid-template-columns:1.25fr 1fr;min-height:clamp(420px,48cqi,620px)}
.hd-s .h-house .h-img{position:relative;background:${ph(P.interior, 1400)}}
.hd-s .h-stamp{position:absolute;right:-56px;bottom:40px;width:112px;height:112px;border-radius:50%;background:var(--terra);color:var(--cream);display:grid;place-items:center;z-index:2}
.hd-s .h-stamp svg{position:absolute;inset:0;animation:hdsspin 22s linear infinite}
.hd-s .h-stamp text{font:600 8.5px "Geist",sans-serif;letter-spacing:.32em;fill:var(--cream)}
.hd-s .h-stamp b{font:600 34px/1 "Fraunces",serif}
.hd-s .h-house .h-txt{padding:clamp(36px,6cqi,80px);display:flex;flex-direction:column;justify-content:center;gap:18px;background:var(--paper)}
.hd-s .h-house dl{display:grid;grid-template-columns:auto 1fr;gap:10px 28px;font-size:14px;border-top:1px solid var(--line);padding-top:18px}
.hd-s .h-house dt{color:var(--mut)}
.hd-s footer{padding:clamp(56px,8cqi,100px) 0 26px;text-align:center}
.hd-s footer .h-big{font-size:clamp(48px,11cqi,150px);line-height:.85;font-weight:600;letter-spacing:-.06em}
.hd-s footer .h-row{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:36px;padding-top:18px;border-top:1px solid var(--line);font-size:12.5px;color:var(--mut)}
@container (max-width:640px){
  .hd-s .h-links{display:none}
  .hd-s .h-meta{display:none}
  .hd-s .h-orbit{top:42%}
  .hd-s .sig-hero{min-height:520px}
  .hd-s .sig-bean.near{display:none}
  .hd-s .h-tick span:nth-child(2){display:none}
  .hd-s .h-drinks{grid-template-columns:1fr}.hd-s .h-dr{aspect-ratio:4/3.4}
  .hd-s .h-house{grid-template-columns:1fr}.hd-s .h-house .h-img{min-height:260px}.hd-s .h-stamp{right:20px;bottom:-40px;width:96px;height:96px}
  .hd-s .h-house .h-txt{padding-top:56px}
}
@media (prefers-reduced-motion:reduce){.hd-s *{animation:none!important}}
</style>
${BEAN_DEFS}
<section class="sig-hero" id="top"><div class="h-in" style="position:relative;z-index:4">
  <nav><a class="h-mono" data-goto="top"><svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="19" fill="#1E140F"/><path d="M13 11v18M27 11v18M13 20h14" stroke="#EFE6D8" stroke-width="2.6" stroke-linecap="round"/><circle cx="20" cy="20" r="2.6" fill="#C2502A"/></svg><span>HALDEN<br>KOFFIEHUIS</span></a>
    <div class="h-links"><a data-goto="s1">Philosophy</a><a data-goto="s2">Signatures</a><a data-goto="s3">The house</a></div>
    <a class="h-pill" data-demo><i></i>Order ahead</a></nav>
  <div class="h-meta"><div><b>Koffiehuis, Utrecht</b>Roasting since 2016</div><div style="text-align:right"><b>Open today</b>7:30 – 18:00</div></div></div>
  <div class="h-orbit" aria-hidden="true"><div class="h-cup"></div><svg class="h-ring" viewBox="0 0 200 200"><defs><path id="hdsr" d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0"/></defs><text><textPath href="#hdsr">SLOW COFFEE · OUDEGRACHT 112 · UTRECHT · EST. 2016 · </textPath></text></svg></div>
  ${beanLayer()}
  <div class="h-word h-disp" aria-label="Halden"><span>H</span><span>a</span><span>l</span><span>d</span><span><em>e</em></span><span>n</span></div>
  <div class="h-in h-tick" style="position:relative;z-index:3"><span>Scroll to taste ↓</span><span>Single origin · Roasted on the canal</span><span>N° 112</span></div>
</section>
<section class="h-man" id="s1"><div class="h-in"><span class="h-caps" style="color:var(--terra)">Our philosophy</span>
  <p class="h-disp">We roast <i style="background:${ph(P.roast, 500)}"></i> on Tuesday, bake <i style="background:${ph(P.buns, 500)}"></i> before sunrise, and pour <em>every cup</em> like it’s the first of the day.</p></div></section>
<section class="h-dark" id="s2"><div class="h-in">
  <div class="h-head"><div><span class="h-caps" style="color:var(--terra)">Signatures</span><h2 class="h-disp" style="margin-top:14px">Three drinks you <em>only</em> find here.</h2></div><a class="h-pill" style="background:var(--cream);color:var(--esp)" data-demo><i></i>Full menu</a></div>
  <div class="h-drinks">${drinks.map(d => `<a class="h-dr" data-demo style="--img:${ph(d[4], 900)}"><div class="h-n"><span>${d[0]}</span><span>€${d[3]}</span></div><div><b>${d[1]}</b><p>${d[2]}</p></div></a>`).join("")}</div>
</div></section>
<section class="h-house" id="s3"><div class="h-img" role="img" aria-label="Inside Halden"><span class="h-stamp"><svg viewBox="0 0 112 112" aria-hidden="true"><defs><path id="hdst" d="M56,56 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"/></defs><text><textPath href="#hdst">FRESHLY ROASTED · UTRECHT · </textPath></text></svg><b>H</b></span></div>
  <div class="h-txt"><span class="h-caps" style="color:var(--terra)">The house</span><h2 class="h-disp">One room, <em>by the water.</em></h2><p style="color:var(--mut);max-width:38ch">Six tables, a long bar and a window seat over the Oudegracht. Bring a book, stay a while.</p>
    <dl><dt>Address</dt><dd>Oudegracht 112, Utrecht</dd><dt>Weekdays</dt><dd>7:30 – 18:00</dd><dt>Weekends</dt><dd>9:00 – 17:00</dd></dl>
    <a class="h-pill" style="align-self:start" data-demo><i></i>Reserve the window seat</a></div></section>
<footer><div class="h-in"><div class="h-big h-disp">Halden<em style="font-style:italic;font-weight:300;color:var(--terra)">.</em></div>
  <div class="h-row"><span>© 2026 Halden Koffiehuis</span><span>Instagram · Journal · Gift cards</span><span>Made slowly in Utrecht</span></div></div></footer>
</div>`;
  };

  Object.assign(HALDEN, { essential, business, signature });
})();
