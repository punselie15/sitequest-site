/* =========================================================
   Project brief generator
   Turns everything a client chose on the site (business, goals,
   pages, design studio, style, build menu, saved concepts) into
   one document: a readable brief plus a numbered task list we
   go through together before building. Output: Markdown (for
   Claude and for email), HTML (print / save as PDF) and JSON.
   ========================================================= */

const PAGE_SECTIONS = {
  Home: ["Hero with the main promise and one clear button", "What you offer, in three or four blocks", "Why people choose you", "Reviews or proof", "Final call to action"],
  "About us": ["Your story in a few short paragraphs", "Photo of you or the team", "What you stand for"],
  Services: ["Each service with a short description", "How it works, step by step", "Common questions"],
  Prices: ["Price list", "What is included", "Common questions about price"],
  Products: ["Product grid with photos and prices", "Filters or categories", "Product detail page"],
  "Our work": ["Photo gallery", "A few highlighted projects"],
  Reviews: ["Real reviews, for example from Google", "Button to leave a review"],
  Team: ["Photo and short intro per person"],
  "Book online": ["Booking widget", "Cancellation and payment policy"],
  "Blog / news": ["Post overview", "Post template", "Categories"],
  Questions: ["Questions grouped by topic", "Contact link for anything else"],
  Vacancies: ["Open jobs", "How to apply"],
  Contact: ["Contact form", "Map and address", "Opening hours", "Phone and WhatsApp"],
};

const FEATURE_TASKS = {
  booking: { decide: ["Which booking tool: Calendly, Cal.com, Salonized or something you already use?", "Which services, how long, and with whom?", "Should people pay or leave a deposit when booking?"], done: "A test booking arrives in the client’s calendar and both sides get a confirmation." },
  form: { decide: ["Which fields does the form need?", "Who receives the messages, and should people get an automatic reply?", "Do people need to upload files?"], done: "A test message arrives in the right inbox with every field filled in." },
  maps: { decide: ["Which address, and is there parking or a side entrance worth mentioning?"], done: "The map shows the right location on phone and desktop." },
  whatsapp: { decide: ["Which number, and what should the first message say?"], done: "Tapping the button opens WhatsApp with the prefilled message." },
  newsletter: { decide: ["Which tool: Mailchimp, Brevo or another?", "What do subscribers get, and how often?"], done: "A test signup lands in the list with the right consent." },
  blog: { decide: ["Who writes the posts, and how often?", "Which categories?"], done: "The client can publish a post without help." },
  login: { decide: ["What is behind the login, and who gets an account?", "Sign up yourself, or invited by the client?"], done: "A test account can sign in, reset its password and see only its own data." },
  store: { decide: ["How many products, and are there variants such as size or colour?", "Payment provider: Mollie or Stripe?", "Shipping zones, costs and a free-shipping threshold?", "Returns policy and terms?"], done: "A test order goes through checkout, payment and the order emails." },
  catalog: { decide: ["Who supplies product photos, names, prices and descriptions, and in what format?"], done: "Up to 30 products are live with photos, prices and stock." },
  filter: { decide: ["Which filters matter most to customers?"], done: "Filters work on phone and desktop and never show an empty result without help." },
  coupons: { decide: ["Which discounts at launch, and with what rules?"], done: "A test code applies the right discount at checkout." },
  analytics: { decide: ["Privacy-friendly analytics such as Plausible, or Google Analytics with a cookie banner?"], done: "Visits show up in the dashboard and the client has access." },
  seo: { decide: ["Which searches should the site be found for?"], done: "Titles, descriptions, structured data and redirects are set and checked." },
  local: { decide: ["Which towns or neighbourhoods matter most?"], done: "Local pages and details are consistent everywhere." },
  gbp: { decide: ["Does a Google Business Profile exist already, and who owns it?"], done: "The profile is verified, complete and links to the new site." },
  copy: { decide: ["Tone of voice: formal, friendly or playful?", "Which questions go in the online story questionnaire?"], done: "The client approves the text for every page." },
  ai: { decide: ["Tone of voice, and three facts every page must get right"], done: "The client approves the edited text for every page." },
  translate: { decide: ["Which languages, and how many words roughly?"], done: "Every page reads naturally in each language." },
  logo: { decide: ["Three words that describe the brand", "Logos you like and dislike, and why"], done: "Final logo delivered in SVG, PNG and PDF, light and dark versions." },
  mini: { decide: ["Three words that describe the brand", "Brands they admire"], done: "Logo, colours, fonts and a one-page guide are delivered." },
  brand: { decide: ["Brand personality, audience and competitors", "Where will the brand be used most?"], done: "Full identity and guidelines are delivered and approved." },
  cards: { decide: ["Names, titles and contact details for each card"], done: "Print-ready files are delivered." },
  social: { decide: ["Which platforms?"], done: "Profile images, covers and six templates are delivered." },
};

function projectBrief() {
  const p = briefPayload(), t = calcTotals(), f = brief.f;
  const name = f.bName || me.name || "New client";
  const today = new Date();
  const ref = `SQ-${today.toISOString().slice(0, 10).replace(/-/g, "")}-${slug(name).slice(0, 18)}`;
  const kind = KINDS.find(k => k.id === calc.kind);
  const st = DESIGN_STYLES.find(s => s.id === calc.style);
  const pk = isBrand() ? null : PACKAGES[calc.pk];
  const pages = isBrand() ? [] : calc.pagesSel;
  const extras = calc.addons.map(id => ALL_ADDONS.find(a => a.id === id)).filter(Boolean).filter(a => !isBrand() || BRAND_IDS.includes(a.id));
  const inspo = [...favs].map(siteById).filter(Boolean);
  const studioSite = siteById(design.industry);
  const pal = design.pal >= 0 ? PALETTES[design.pal].name : "Custom palette";
  // Only treat studio colours and fonts as the client's choice if they actually used the studio
  const studioUsed = !!store.get("designSaved", false) || JSON.stringify(design) !== JSON.stringify(DEFAULT_DESIGN);

  /* ---- tasks ---- */
  const tasks = [];
  const add = (title, why, decide, done) => tasks.push({ id: `T${String(tasks.length + 1).padStart(2, "0")}`, title, why, decide, done });
  const what = { website: "a website", store: "an online store", app: "a web app", brand: "branding" }[calc.kind];
  add("Kick-off and assets", `${p.contact.name || "The client"} wants ${what} for ${name}. Main goal: ${p.goals.goal.toLowerCase()}.${menuFiles.length ? ` Sent ${menuFiles.length} file${menuFiles.length > 1 ? "s" : ""}: ${menuFiles.map(x => x.name).join(", ")}.` : ""}`,
    ["Confirm the goal and what success looks like in three months (online questionnaire)", menuFiles.length ? "Which of the sent files can we use, and is anything missing (logo in high quality, photos)?" : "Collect logo, photos and any existing text through an upload link", f.bSite ? `What should we keep from ${f.bSite}?` : "Is there an old site or social profile to learn from?"],
    "Everything needed for the preview is in one folder.");
  if (f.call) add("Call with the client", `Asked for a short call${f.callTime ? `, preferably in the ${f.callTime.toLowerCase()}` : ""}${f.bPhone ? ` on ${f.bPhone}` : ""}.`, ["Which team member calls, and when?", "What do we need to learn on the call that the menu doesn’t tell us?"], "Call done within two working days, notes added to the project folder.");
  if ((f.wants || []).length) add("Client’s must-haves", `They really want: ${f.wants.join("; ")}.`, f.wants.map(w => `How do we include “${w}”, and on which page?`), "Every must-have is visible in the preview or explained if it can’t be done.");
  if (calc.addons.includes("logo")) add("Logo design", "Client needs a logo.", FEATURE_TASKS.logo.decide, FEATURE_TASKS.logo.done);
  ["mini", "brand"].forEach(id => calc.addons.includes(id) && add(ALL_ADDONS.find(a => a.id === id).name, "Chosen in the build menu.", FEATURE_TASKS[id].decide, FEATURE_TASKS[id].done));
  if (!isBrand()) {
    add("Design direction", `Style: ${st ? `${st.id} (${st.d.replace(/\.$/, "").toLowerCase()})` : "not chosen, we suggest one"}. ${studioUsed ? `Palette: ${pal}. Fonts: ${FONTS[design.font].name}. ${CORNERS[design.corner][0]} corners, ${["compact", "balanced", "airy"][design.spacing]} spacing, ${MOTION[design.motion][0].toLowerCase()} motion.` : "Design studio not used, so colours and fonts are open."}${inspo.length ? ` Inspired by: ${inspo.map(s => s.name).join(", ")}.` : ""}`,
      ["Which inspiration concept is the closest starting point, and what should change?", "Do the studio colours pass contrast on every background?", "Which photos: client photos, a shoot, or licensed images?"],
      "A one-page design direction the client recognises as theirs.");
    add("Free homepage preview", "The first thing the client sees. They pay nothing until they approve it.",
      ["Which message goes in the hero?", "Which one action should every visitor take?"],
      "A private link to a designed homepage on desktop and phone.");
    pages.forEach(pg => add(`Page: ${pg}`, `Requested in the brief, for a site whose main goal is to ${p.goals.goal.toLowerCase()}.`, [`Which of these sections does ${pg} need: ${(PAGE_SECTIONS[pg] || ["Content blocks"]).join("; ")}?`, "What should a visitor do next from this page?"], `${pg} is filled with real content and works on phone and desktop.`));
  }
  extras.filter(a => !["logo", "mini", "brand"].includes(a.id)).forEach(a => {
    const ft = FEATURE_TASKS[a.id] || { decide: ["What exactly is needed?"], done: "Working and tested." };
    const inc = !isBrand() && a.inc && a.inc.includes(calc.pk);
    add(a.name, `${a.desc}${inc ? " Included in the package." : ""}`, ft.decide, ft.done);
  });
  if (!isBrand() && calc.langs) add(`${calc.langs} extra language${calc.langs > 1 ? "s" : ""}`, "Added in the build menu.", ["Which languages, and who supplies the text?"], "A language switcher works on every page.");
  if (!isBrand()) {
    if (!calc.addons.includes("copy") && !calc.addons.includes("ai")) add("Text and content", `${p.brand.content}.`, ["Who writes what, and by when?", "Tone of voice in three words"], "Every page has approved text and images.");
    add("Quality check", "Every SiteQuest site is checked before launch.", ["Any must-test devices or browsers for this client?"], "Fast on 4G, readable contrast, works with keyboard and screen readers, no broken links.");
    add("Launch", `Target: ${p.timing.launch.toLowerCase()}. Live about ${t.days} days after approval.`, ["Domain: does the client own one, and where is it registered?", f.bSite ? `Redirect old pages from ${f.bSite} so search rankings carry over?` : "Email addresses on the domain?"], "The site is live on the client’s domain with SSL.");
    add("Care after launch", t.care.price ? `${t.care.name} care plan, ${eur(t.care.price)}/mo.` : "No care plan: the client hosts it themselves.", ["Who makes small changes after launch?"], "The client knows how to get help and edit content.");
  } else {
    add("Handover", "Branding only.", ["Which file formats and where will they be used first?"], "All files delivered in one shared folder.");
  }

  /* ---- open questions ---- */
  const open = [];
  if (!f.bName) open.push("Business name is missing.");
  if (!f.bDesc) open.push("We don’t yet know what the business does or who for.");
  if (!calc.style) open.push("No design style chosen: suggest two in the preview.");
  if (!inspo.length && !isBrand()) open.push("No saved inspiration: ask which showroom concepts they like.");
  if (!studioUsed && !isBrand()) open.push("Design studio not used: colours and fonts still to choose.");
  if (f.call) open.push(`Client asked for a call${f.callTime ? ` (${f.callTime.toLowerCase()})` : ""}: plan it within two working days.`);
  if (calc.addons.includes("store") && (calc.pk === "basic" || calc.pk === "essential")) open.push("Online store on Essential: check whether Business suits the product count better.");
  if (!menuFiles.length && !calc.addons.some(id => ["logo", "mini", "brand"].includes(id))) open.push("No logo sent and none ordered: ask for their logo in SVG or a large PNG.");

  return {
    ref, created: today.toISOString(), name,
    client: { business: name, website: f.bSite || "", about: f.bDesc || "", contact: p.contact.name || "", email: p.contact.email || "" },
    glance: { kind: kind.name, package: pk ? `${pk.name} (${SIZES[calc.pk]}, up to ${pk.pages} pages)` : "Branding only", style: st ? st.id : "Not chosen", pages: pages.length, launch: p.timing.launch, call: f.call ? `Yes, ${(f.callTime || "").toLowerCase()}${f.bPhone ? `, ${f.bPhone}` : ""}` : "No, online is fine", live: `about ${t.days} days after approval` },
    goals: { goal: p.goals.goal, type: p.goals.type },
    wishes: { wants: f.wants || [], comments: f.bNotes || "", oldSite: f.bSite || "", files: menuFiles.map(x => ({ name: x.name, type: x.type, image: !!x.data })) },
    design: { studioUsed, style: st ? `${st.id}: ${st.d}` : "Not chosen", palette: studioUsed ? pal : `${pal} (default, not chosen yet)`, colors: design.colors, fonts: FONTS[design.font].name, corners: CORNERS[design.corner][0], spacing: ["Compact", "Balanced", "Airy"][design.spacing], motion: MOTION[design.motion][0], studioPreview: studioSite ? STUDIO_LABEL[design.industry] : "", inspiration: inspo.map(s => ({ name: s.name, industry: s.industry, style: s.style, layout: LAYOUT_LABEL[s.layout], id: s.id })) },
    pages: pages.map(pg => ({ name: pg, sections: PAGE_SECTIONS[pg] || [] })),
    extras: extras.map(a => ({ id: a.id, name: a.name, included: !isBrand() && !!(a.inc && a.inc.includes(calc.pk)) })),
    content: { logo: p.brand.logo, text: p.brand.content },
    estimate: { lines: t.lines.map(x => ({ item: x.l, price: x.inc ? "Included" : x.q ? "Quote" : eur(x.v) })), oneTime: eur(t.one), inclVat: eur(t.one * 1.21), afterApproval: eur(Math.ceil(t.one / 2)), atLaunch: eur(t.one - Math.ceil(t.one / 2)), care: t.care.price ? `${t.care.name}, ${eur(t.care.price)}/mo (first month free)` : "None" },
    tasks, open, notes: f.bNotes || "",
  };
}

/* ---------- Markdown: what gets sent to us and read by Claude ---------- */
function briefMarkdown(b) {
  const L = [];
  const row = (k, v) => v && L.push(`| ${k} | ${String(v).replace(/\|/g, "/").replace(/\n/g, " ")} |`);
  L.push(`# Project brief: ${b.name}`, "", `Reference ${b.ref} · ${new Date(b.created).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`, "");
  L.push("## 1. Client", "", "| | |", "|---|---|");
  row("Business", b.client.business); row("Industry", b.client.industry); row("Current website", b.client.website); row("What they do", b.client.about); row("Contact", [b.client.contact, b.client.email].filter(Boolean).join(", "));
  L.push("", "## 2. At a glance", "", "| | |", "|---|---|");
  row("Making", b.glance.kind); row("Package", b.glance.package); row("Style", b.glance.style); row("Pages", b.glance.pages || "None"); row("Launch wish", b.glance.launch); row("Call wanted", b.glance.call); row("Live", b.glance.live); row("Estimate", `${b.estimate.oneTime} excl. VAT`);
  L.push("", "## 3. Goals and wishes", "", `- Main goal: ${b.goals.goal}`, `- Making: ${b.goals.type}`);
  if (b.wishes.wants.length) L.push("", "**Things they really want:**", "", ...b.wishes.wants.map(w => `- [ ] ${w}`));
  if (b.wishes.comments) L.push("", "**Comments and ideas:**", "", `> ${b.wishes.comments.replace(/\n/g, "\n> ")}`);
  if (b.wishes.oldSite) L.push("", `**Current website:** ${b.wishes.oldSite}`);
  L.push("", `**Files sent:** ${b.wishes.files.length ? b.wishes.files.map(x => x.name).join(", ") + " (attached to the email, or in the printed version)" : "none"}`);
  L.push("", "## 4. Design direction", "", `- Style: ${b.design.style}`, `- Palette: ${b.design.palette}`, `- Fonts: ${b.design.fonts}`, `- Corners: ${b.design.corners} · Spacing: ${b.design.spacing} · Motion: ${b.design.motion}`);
  if (b.design.studioUsed && b.design.studioPreview) L.push(`- Previewed in the studio as: ${b.design.studioPreview}`);
  L.push("", "| Role | Colour |", "|---|---|", ...SWATCHES.map(([k, l]) => `| ${l} | ${b.design.colors[k]} |`));
  L.push("", "Inspiration from the showroom:", "", ...(b.design.inspiration.length ? b.design.inspiration.map(s => `- ${s.name}: ${s.industry}, ${s.style}, ${s.layout} layout (concept id \`${s.id}\`)`) : ["- None saved yet"]));
  if (b.pages.length) { L.push("", "## 5. Pages", ""); b.pages.forEach(pg => L.push(`- **${pg.name}**${pg.sections.length ? `: ${pg.sections.join("; ")}` : ""}`)); }
  L.push("", "## 6. Extras", "", ...(b.extras.length ? b.extras.map(e => `- ${e.name}${e.included ? " (included in package)" : ""}`) : ["- None"]));
  L.push("", "## 7. Content", "", `- Logo: ${b.content.logo}`, `- Text: ${b.content.text}`);
  L.push("", "## 8. Estimate", "", "| Item | Price |", "|---|---|", ...b.estimate.lines.map(x => `| ${x.item} | ${x.price} |`), `| **One-time, excl. VAT** | **${b.estimate.oneTime}** |`, "", `- Including 21% VAT: ${b.estimate.inclVat}`, `- After approving the preview: ${b.estimate.afterApproval}`, `- At launch: ${b.estimate.atLaunch}`, `- Care plan: ${b.estimate.care}`);
  L.push("", "## 9. Build tasks", "", "We go through these one by one and agree the approach before building.", "");
  b.tasks.forEach(t => { L.push(`### ${t.id} · ${t.title}`, "", `- [ ] Approach agreed`, `- Client wants: ${t.why}`, `- To decide:`, ...t.decide.map(d => `  - ${d}`), `- Done when: ${t.done}`, ""); });
  L.push("## 10. Open questions", "", ...(b.open.length ? b.open.map(o => `- ${o}`) : ["- None"]));
  if (b.notes) L.push("", "## 11. Notes from the client", "", b.notes);
  L.push("", "---", "", "<details><summary>Machine-readable brief</summary>", "", "```json", JSON.stringify(b, null, 2), "```", "", "</details>", "");
  return L.join("\n");
}

/* ---------- HTML: print or save as PDF ---------- */
function briefHTML(b) {
  const e = v => esc(v ?? "");
  const kv = rows => `<table>${rows.filter(r => r[1]).map(([k, v]) => `<tr><th>${e(k)}</th><td>${e(v)}</td></tr>`).join("")}</table>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Project brief · ${e(b.name)}</title>
  <style>
    @page{margin:18mm} *{box-sizing:border-box} body{font:14px/1.55 "Geist",system-ui,sans-serif;color:#18201F;max-width:780px;margin:40px auto;padding:0 24px}
    h1{font:600 34px/1.05 "Bricolage Grotesque",system-ui;letter-spacing:-.03em;margin:0 0 6px} h2{font:600 19px "Bricolage Grotesque",system-ui;margin:34px 0 10px;padding-top:14px;border-top:1px solid #E3E8E4}
    h3{font-size:14px;margin:0 0 6px} .ref{color:#5C6866} table{width:100%;border-collapse:collapse;margin:6px 0} th,td{text-align:left;padding:7px 10px;border-bottom:1px solid #EEF0EC;vertical-align:top} th{width:32%;color:#5C6866;font-weight:400}
    .sw{display:inline-block;width:14px;height:14px;border-radius:4px;vertical-align:-2px;margin-right:6px;border:1px solid rgba(0,0,0,.1)} .task{border:1px solid #E3E8E4;border-radius:12px;padding:14px 16px;margin:10px 0;break-inside:avoid} .task small{color:#5C6866} ul{margin:6px 0;padding-left:20px}
    .files{display:flex;flex-wrap:wrap;gap:10px}.files figure{margin:0;width:140px;break-inside:avoid}.files img,.files span{display:grid;place-items:center;width:140px;height:100px;object-fit:contain;border:1px solid #E3E8E4;border-radius:8px;background:#FAFAF8}.files figcaption{font-size:11px;color:#5C6866;word-break:break-all;margin-top:4px} blockquote{margin:6px 0;padding:10px 14px;border-left:3px solid #F4B6C2;background:#FBF6F7}
    .tot td,.tot th{font-weight:600;color:#18201F} .top{display:flex;justify-content:space-between;align-items:end;gap:20px;border-bottom:2px solid #0E3B3A;padding-bottom:14px} .mark{color:#0E3B3A;font-weight:600}
  </style></head><body>
  <div class="top"><div><h1>Project brief: ${e(b.name)}</h1><div class="ref">Reference ${e(b.ref)} · ${new Date(b.created).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</div></div><div class="mark">SiteQuest Studio</div></div>
  <h2>1. Client</h2>${kv([["Business", b.client.business], ["Industry", b.client.industry], ["Current website", b.client.website], ["What they do", b.client.about], ["Contact", [b.client.contact, b.client.email].filter(Boolean).join(", ")]])}
  <h2>2. At a glance</h2>${kv([["Making", b.glance.kind], ["Package", b.glance.package], ["Style", b.glance.style], ["Pages", b.glance.pages || "None"], ["Launch wish", b.glance.launch], ["Call wanted", b.glance.call], ["Live", b.glance.live], ["Estimate", `${b.estimate.oneTime} excl. VAT`]])}
  <h2>3. Goals and wishes</h2>${kv([["Main goal", b.goals.goal], ["Making", b.goals.type], ["Current website", b.wishes.oldSite]])}
  ${b.wishes.wants.length ? `<h3 style="margin-top:14px">Things they really want</h3><ul>${b.wishes.wants.map(w => `<li>${e(w)}</li>`).join("")}</ul>` : ""}
  ${b.wishes.comments ? `<h3 style="margin-top:14px">Comments and ideas</h3><blockquote>${e(b.wishes.comments)}</blockquote>` : ""}
  ${menuFiles.length ? `<h3 style="margin-top:14px">Files they sent</h3><div class="files">${menuFiles.map(x => `<figure>${x.data ? `<img src="${x.data}" alt="">` : `<span>PDF</span>`}<figcaption>${e(x.name)}</figcaption></figure>`).join("")}</div>` : ""}
  <h2>4. Design direction</h2>${kv([["Style", b.design.style], ["Palette", b.design.palette], ["Fonts", b.design.fonts], ["Feel", `${b.design.corners} corners, ${b.design.spacing.toLowerCase()} spacing, ${b.design.motion.toLowerCase()} motion`]])}
  <table>${SWATCHES.map(([k, l]) => `<tr><th>${l}</th><td><span class="sw" style="background:${b.design.colors[k]}"></span>${b.design.colors[k]}</td></tr>`).join("")}</table>
  <h3 style="margin-top:14px">Inspiration</h3><ul>${b.design.inspiration.length ? b.design.inspiration.map(s => `<li>${e(s.name)}: ${e(s.industry)}, ${e(s.style)}, ${e(s.layout)} layout</li>`).join("") : "<li>None saved yet</li>"}</ul>
  ${b.pages.length ? `<h2>5. Pages</h2><ul>${b.pages.map(pg => `<li><b>${e(pg.name)}</b>${pg.sections.length ? `: ${e(pg.sections.join("; "))}` : ""}</li>`).join("")}</ul>` : ""}
  <h2>6. Extras</h2><ul>${b.extras.length ? b.extras.map(x => `<li>${e(x.name)}${x.included ? " (included)" : ""}</li>`).join("") : "<li>None</li>"}</ul>
  <h2>7. Content</h2>${kv([["Logo", b.content.logo], ["Text", b.content.text]])}
  <h2>8. Estimate</h2><table>${b.estimate.lines.map(x => `<tr><th>${e(x.item)}</th><td>${e(x.price)}</td></tr>`).join("")}<tr class="tot"><th>One-time, excl. VAT</th><td>${e(b.estimate.oneTime)}</td></tr></table>
  ${kv([["Including 21% VAT", b.estimate.inclVat], ["After approving the preview", b.estimate.afterApproval], ["At launch", b.estimate.atLaunch], ["Care plan", b.estimate.care]])}
  <h2>9. Build tasks</h2><p class="ref">We go through these one by one and agree the approach before building.</p>
  ${b.tasks.map(t => `<div class="task"><h3>${e(t.id)} · ${e(t.title)}</h3><small>${e(t.why)}</small><ul>${t.decide.map(d => `<li>${e(d)}</li>`).join("")}</ul><small><b>Done when:</b> ${e(t.done)}</small></div>`).join("")}
  <h2>10. Open questions</h2><ul>${b.open.length ? b.open.map(o => `<li>${e(o)}</li>`).join("") : "<li>None</li>"}</ul>
  ${b.notes ? `<h2>11. Notes from the client</h2><p>${e(b.notes)}</p>` : ""}
  </body></html>`;
}

/* ---------- Actions on the "Brief saved" screen ---------- */
(() => {
  const file = (name, text, type) => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); };
  const base = () => `sitequest-site-menu-${slug(brief.f.bName || "client")}`;
  const mail = typeof WEBLOOM_EMAIL !== "undefined" && WEBLOOM_EMAIL;
  // The menu card is re-rendered often, so listen on the document
  document.addEventListener("click", async e => {
    const b = e.target.closest("[data-brief-action]"); if (!b) return;
    const act = b.dataset.briefAction;
    if (act === "send") {
      const doc = projectBrief();
      // The HTML version carries their logo and photos; the Markdown version is for our designers and Claude
      file(`${base()}.html`, briefHTML(doc), "text/html");
      file(`${base()}.md`, briefMarkdown(doc), "text/markdown");
      brief.sent = new Date().toISOString(); saveBrief();
      if (mail) {
        location.href = `mailto:${mail}?subject=${encodeURIComponent(`Site menu ${doc.ref}: ${doc.name}`)}&body=${encodeURIComponent(`Hi SiteQuest,\n\nMy site menu is attached (${doc.ref}).\n\n${doc.glance.kind}, ${doc.glance.style} style, ${doc.glance.pages} pages. Estimate ${doc.estimate.oneTime} excl. VAT.${doc.glance.call.startsWith("Yes") ? `\nI'd like a short call: ${doc.glance.call}.` : ""}\n\n${doc.client.contact}`)}`;
        toast("Your menu is downloaded. Attach both files to the email that just opened.");
      } else toast("Your menu is downloaded. Send both files to SiteQuest Studio.");
      return;
    }
    if (act === "print") {
      const w = open("", "_blank"); if (!w) { toast("Allow pop-ups to print your menu."); return; }
      w.document.write(briefHTML(projectBrief())); w.document.close(); w.focus(); setTimeout(() => w.print(), 400);
      return;
    }
    if (act === "copy") {
      try { await navigator.clipboard.writeText(briefMarkdown(projectBrief())); toast("Menu copied."); } catch { toast("Copy didn’t work here. Use Download instead."); }
    }
  });
})();
