/* =========================================================
   Client reviews, drawn from PORTFOLIO and FOUNDER in portfolio.js.
   Used on the homepage (a short teaser) and on /reviews/ (everything).
   Only real reviews: nothing here invents a quote or a rating.
   ========================================================= */
(() => {
  const $ = s => document.querySelector(s);
  const esc = v => String(v).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const slug = v => String(v).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const work = typeof PORTFOLIO !== "undefined" ? PORTFOLIO : [];
  const f = typeof FOUNDER !== "undefined" ? FOUNDER : {};
  const starRow = n => `<span class="case__stars" aria-hidden="true">${"★".repeat(n)}${"☆".repeat(5 - n)}</span>`;
  const rated = work.filter(p => p.stars);
  const avg = rated.length ? rated.reduce((a, p) => a + p.stars, 0) / rated.length : 0;
  const scoreHtml = rated.length ? `${starRow(Math.round(avg))}<b>${avg.toFixed(1)}</b><span>from ${rated.length} client${rated.length > 1 ? "s" : ""}</span>` : "";
  const root = document.body.dataset.root || "";

  /* ---- Full case studies (reviews page) ---- */
  const grid = $("#workGrid");
  if (grid) {
    grid.innerHTML = work.map((p, i) => `
    <article class="case${i % 2 ? " case--flip" : ""}" id="${slug(p.name)}">
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
  }
  const score = $("#reviewScore");
  if (score) { if (scoreHtml) score.innerHTML = scoreHtml; else score.hidden = true; }

  /* ---- Homepage teaser: the score, one real quote and the clients ---- */
  const teaser = $("#reviewTeaser");
  if (teaser) {
    const q = work.find(p => p.quote);
    teaser.innerHTML = `
      ${q ? `<figure class="rteaser__quote">
        ${q.stars ? starRow(q.stars) : ""}
        <blockquote><p>“${esc(q.quote)}”</p></blockquote>
        <figcaption>${esc(q.by || q.name)}${q.kind ? ` · ${esc(q.kind)}` : ""}</figcaption>
      </figure>` : ""}
      <div class="rteaser__side">
        ${scoreHtml ? `<p class="rteaser__score">${scoreHtml}</p>` : ""}
        <ul class="rteaser__list">${work.map(p => `
          <li><a href="${root}reviews/#${slug(p.name)}">
            <span class="rteaser__thumb">${p.image ? `<img src="${esc(p.image)}" alt="" loading="lazy">` : ""}</span>
            <span><b>${esc(p.name)}</b><small>${esc(p.kind || "")}</small></span>
            ${p.stars ? `<span class="rteaser__stars" aria-label="${p.stars} out of 5">${"★".repeat(p.stars)}</span>` : ""}
          </a></li>`).join("")}
        </ul>
        <a class="btn" href="${root}reviews/">Read all reviews <span aria-hidden="true">→</span></a>
      </div>`;
  }

  /* ---- Founder block, only once there is a real story ---- */
  const fo = $("#founder");
  if (fo) {
    if (!f.story) fo.hidden = true;
    else fo.innerHTML = `
      ${f.photo ? `<div class="founder__photo"><img src="${esc(f.photo)}" alt="${esc(f.name)}"></div>` : ""}
      <div>
        <blockquote>${esc(f.story)}</blockquote>
        ${f.name ? `<cite>${esc(f.name)}, ${esc(f.role || "Founder")}</cite>` : ""}
      </div>`;
  }

  /* ---- Reviews page only: nav menu and scroll reveals (the homepage has app.js for these) ---- */
  if (document.body.dataset.page === "reviews") {
    const nav = $("#nav"); let last = 0;
    const onScroll = () => {
      const y = scrollY;
      nav.classList.toggle("is-scrolled", y > 40);
      nav.classList.toggle("is-hidden", y > last && y > 600 && !nav.classList.contains("is-open"));
      last = y;
    };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();
    $("#navMenu").addEventListener("click", () => $("#navMenu").setAttribute("aria-expanded", nav.classList.toggle("is-open")));
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) els.forEach(el => el.classList.add("is-in"));
    else {
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
      els.forEach(el => io.observe(el));
    }
    // Links like /reviews/#shecurity land on that client
    if (location.hash) setTimeout(() => { const el = document.getElementById(location.hash.slice(1)); if (el) el.scrollIntoView(); }, 50);
  }
})();
