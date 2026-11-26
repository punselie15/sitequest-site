/* SiteQuest Studio: light/dark switch + language picker (shared by every page).
 *
 * Theme: <html data-theme="light|dark">. A tiny inline script in each page's <head> sets it before the
 * first paint (saved choice, else the device setting); the button here flips and saves it.
 *
 * Languages: the page is written in English. Translations live in /i18n/<code>.json as
 * { "English text or HTML": "translation", ... } plus "__slogan": [4 hero lines] and "__title"/"__desc".
 * Elements with only text + inline tags are translated as a whole (so a sentence with a link stays one
 * sentence); everything else per text node. Numbers in a text are matched as {0}, {1}… so
 * "Show all 214 concepts" uses the entry "Show all {0} concepts". Text that app.js changes later is
 * caught with a MutationObserver. Example websites (fictional businesses) are never translated.
 * ?i18n=collect lists every English text seen in window.__i18nKeys (for making the dictionaries).
 */
(function () {
  "use strict";
  var root = document.documentElement;
  var BASE = (document.currentScript && document.currentScript.src || "").replace(/site-ui\.js.*$/, "");
  var LANGS = [
    ["en", "English"], ["nl", "Nederlands"], ["de", "Deutsch"], ["fr", "Français"], ["es", "Español"],
    ["it", "Italiano"], ["pt", "Português"], ["pl", "Polski"], ["tr", "Türkçe"]
  ];
  var store = {
    get: function (k) { try { return localStorage.getItem("sq:" + k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem("sq:" + k, v); } catch (e) {} }
  };

  /* ------------------------------------------------------------------ theme */
  function setTheme(t) {
    root.setAttribute("data-theme", t);
    store.set("theme", t);
    var b = document.getElementById("themeBtn");
    if (b) b.setAttribute("aria-label", tr(t === "dark" ? "Switch to light mode" : "Switch to dark mode"));
    var row = document.getElementById("themeRow");
    if (row) row.innerHTML = (t === "dark" ? ICON_SUN.replace(' class="i-sun"', "") : ICON_MOON.replace(' class="i-moon"', "")) + "<span>" + tr(t === "dark" ? "Light mode" : "Dark mode") + "</span>";
    var mc = document.querySelector('meta[name="theme-color"]');
    if (mc) mc.setAttribute("content", t === "dark" ? "#0B1325" : "#F5F5F0");
  }
  // the site opens in indigo (dark) for everyone; the light version is one tap away

  /* ------------------------------------------------------------------ header tools */
  var ICON_MOON = '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
  var ICON_SUN = '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/></svg>';
  var ICON_GLOBE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18"/></svg>';

  function mountTools() {
    var anchor = document.querySelector("[data-site-tools]");
    if (!anchor || document.getElementById("themeBtn")) return;
    var wrap = document.createElement("div");
    wrap.className = "nav__tools";
    wrap.setAttribute("data-i18n-skip", "");
    wrap.innerHTML =
      '<div class="lang" id="langBox"><button class="tool-btn" id="langBtn" type="button" aria-haspopup="true" aria-expanded="false" aria-label="Language">' +
      ICON_GLOBE + '<span id="langCode">EN</span></button><ul class="lang__menu" id="langMenu">' +
      LANGS.map(function (l) { return '<li><button type="button" lang="' + l[0] + '" data-lang="' + l[0] + '">' + l[1] + "<small>" + l[0].toUpperCase() + "</small></button></li>"; }).join("") +
      '<li class="lang__theme"><button type="button" id="themeRow"></button></li></ul></div><button class="tool-btn theme-btn" id="themeBtn" type="button">' + ICON_MOON + ICON_SUN + "</button>";
    anchor.insertBefore(wrap, anchor.firstChild);
    document.getElementById("themeBtn").addEventListener("click", function () {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
    var box = document.getElementById("langBox"), btn = document.getElementById("langBtn");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !box.classList.contains("is-open");
      box.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", function () { box.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") box.classList.remove("is-open"); });
    document.getElementById("themeRow").addEventListener("click", function (e) {
      e.stopPropagation();
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
    document.getElementById("langMenu").addEventListener("click", function (e) {
      var b = e.target.closest("[data-lang]");
      if (b) { store.set("lang", b.getAttribute("data-lang")); setLang(b.getAttribute("data-lang")); }
    });
    setTheme(root.getAttribute("data-theme") || "light");
  }

  /* ------------------------------------------------------------------ translation */
  var DICT = null, lang = "en", busy = false, observer = null;
  var COLLECT = /[?&]i18n=collect/.test(location.search);
  var keys = (window.__i18nKeys = window.__i18nKeys || {});
  var SKIP = "script,style,noscript,svg,code,pre,textarea,select,[data-i18n-skip],.browser,.reel,.mini,.hero__view,.full__shot,.card__shot,.modal__view,.folio__shot,.st__view,#pkView,#stView,#mView";
  var INLINE = { A: 1, B: 1, STRONG: 1, EM: 1, I: 1, SPAN: 1, BR: 1, SMALL: 1, ABBR: 1, SUP: 1, SUB: 1, U: 1, MARK: 1, TIME: 1 };
  var ATTRS = ["placeholder", "aria-label", "title", "alt"];

  var norm = function (s) { return s.replace(/\s+/g, " ").trim(); };
  function lookup(src) {
    if (!DICT) return null;
    var k = norm(src);
    if (!k) return null;
    if (Object.prototype.hasOwnProperty.call(DICT, k)) return DICT[k];
    var nums = [];
    var tk = k.replace(/\d+(?:[.,]\d+)*/g, function (m) { nums.push(m); return "{" + (nums.length - 1) + "}"; });
    if (nums.length && Object.prototype.hasOwnProperty.call(DICT, tk)) {
      return DICT[tk].replace(/\{(\d+)\}/g, function (m, i) { return nums[+i] != null ? nums[+i] : m; });
    }
    // sentences with a name in them ("For example, Studio Mila. …"): regex patterns, the parts are looked up too
    var pats = DICT.__patterns || [];
    for (var p = 0; p < pats.length; p++) {
      var mm = k.match(new RegExp(pats[p][0]));
      if (mm) return pats[p][1].replace(/\$(\d)/g, function (m, i) { var v = mm[+i] || ""; return lookup(v) || v; });
    }
    // "Hotels · Cinematic · Rich · Slow zoom": word by word
    if (k.indexOf(" · ") > 0 && k.indexOf("<") < 0) {
      var parts = k.split(" · "), any = false;
      parts = parts.map(function (x) { var t = lookup(x); if (t) any = true; return t || x; });
      if (any) return parts.join(" · ");
    }
    return null;
  }
  function tr(s) { return lang === "en" ? s : lookup(s) || s; }
  function note(k) { if (COLLECT && norm(k) && /[A-Za-z]/.test(k)) keys[norm(k)] = 1; }

  function skipped(el) { return !el || (el.closest && el.closest(SKIP)); }
  // an element whose children are only text and inline tags (and that has some text of its own)
  function isLeafBlock(el) {
    if (!el.firstChild) return false;
    var text = false;
    for (var n = el.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 3) { if (n.nodeValue.trim()) text = true; }
      else if (n.nodeType === 1) {
        if (!INLINE[n.tagName] || n.querySelector("input,button,select,textarea,svg,img")) return false;
      }
    }
    return text && el.children.length > 0;
  }

  function doAttrs(el) {
    ATTRS.forEach(function (a) {
      if (!el.hasAttribute(a)) return;
      var cur = el.getAttribute(a), src = el.getAttribute("data-i18n-" + a);
      // first time, or the page changed it since we last wrote it: that is the new English
      if (src == null || cur !== el.getAttribute("data-i18n-out-" + a)) { src = cur; el.setAttribute("data-i18n-" + a, src); }
      note(src);
      var out = tr(src);
      if (cur !== out) el.setAttribute(a, out);
      el.setAttribute("data-i18n-out-" + a, out);
    });
  }
  function doElement(el) {
    if (el.nodeType !== 1) return;
    if (/^(TEXTAREA|SELECT|INPUT)$/.test(el.tagName)) { if (!el.parentElement || !skipped(el.parentElement)) doAttrs(el); return; }
    if (skipped(el)) return;
    doAttrs(el);
    // the hero slogan: four separate lines, translated as one sentence
    if (el.tagName === "H1" && el.querySelector(".line > span")) {
      var spans = el.querySelectorAll(".line > span");
      if (!el.__src) el.__src = Array.prototype.map.call(spans, function (s) { return s.textContent; });
      var lines = lang !== "en" && DICT && DICT.__slogan ? DICT.__slogan : el.__src;
      Array.prototype.forEach.call(spans, function (s, i) { s.textContent = lines[i] || ""; });
      return;
    }
    if (isLeafBlock(el)) {
      if (el.__srcHTML == null || el.innerHTML !== el.__outHTML) el.__srcHTML = el.innerHTML;
      note(el.__srcHTML);
      var t = lang === "en" ? null : lookup(el.__srcHTML);
      var out = t || el.__srcHTML;
      if (el.innerHTML !== out) el.innerHTML = out;
      el.__outHTML = el.innerHTML;
      return;
    }
    for (var n = el.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 3) doText(n);
      else if (n.nodeType === 1) doElement(n);
    }
  }
  function doText(n) {
    if (!n.nodeValue.trim() || skipped(n.parentElement)) return;
    if (n.__src == null || n.nodeValue !== n.__out) n.__src = n.nodeValue;
    note(n.__src);
    var t = lang === "en" ? null : lookup(n.__src);
    var out = t ? n.__src.replace(norm(n.__src), t) : n.__src;
    if (n.nodeValue !== out) n.nodeValue = out;
    n.__out = n.nodeValue;
  }

  function run(target) {
    busy = true;
    doElement(target || document.body);
    if (observer) observer.takeRecords();
    busy = false;
  }
  function watch() {
    if (observer) return;
    observer = new MutationObserver(function (recs) {
      if (busy) return;
      var todo = new Set();
      recs.forEach(function (r) {
        var el = r.type === "characterData" ? r.target.parentElement : r.target;
        if (el) todo.add(el);
      });
      busy = true;
      todo.forEach(function (el) {
        // re-translate from the nearest whole sentence (leaf block) if there is one
        var p = el;
        while (p && p !== document.body && !isLeafBlock(p)) p = p.parentElement;
        doElement(p && p !== document.body ? p : el);
      });
      observer.takeRecords();
      busy = false;
    });
    observer.observe(document.body, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ATTRS });
  }

  var titleSrc = document.title;
  var descEl = document.querySelector('meta[name="description"]');
  var descSrc = descEl && descEl.getAttribute("content");
  function setLang(code) {
    if (!LANGS.some(function (l) { return l[0] === code; })) code = "en";
    var apply = function () {
      lang = code;
      root.setAttribute("lang", code);
      var c = document.getElementById("langCode");
      if (c) c.textContent = code.toUpperCase();
      document.querySelectorAll("#langMenu [data-lang]").forEach(function (b) { b.setAttribute("aria-current", String(b.getAttribute("data-lang") === code)); });
      document.title = code !== "en" && DICT && DICT.__title && document.body.hasAttribute("data-i18n-home") ? DICT.__title : tr(titleSrc);
      if (descEl && descSrc) descEl.setAttribute("content", code !== "en" && DICT && DICT.__desc && document.body.hasAttribute("data-i18n-home") ? DICT.__desc : tr(descSrc));
      run();
      watch();
      setTheme(root.getAttribute("data-theme") || "light");
      document.dispatchEvent(new CustomEvent("sq:lang", { detail: code }));
    };
    if (code === "en") { DICT = null; apply(); return; }
    fetch(BASE + "i18n/" + code + ".json", { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (d) { DICT = d; apply(); })
      .catch(function () { DICT = null; code = "en"; apply(); });
  }

  function start() {
    mountTools();
    var saved = store.get("lang");
    var first = saved || (navigator.languages || [navigator.language || "en"]).map(function (l) { return String(l).slice(0, 2).toLowerCase(); })
      .filter(function (l) { return LANGS.some(function (x) { return x[0] === l; }); })[0] || "en";
    if (COLLECT) { run(); watch(); return; }
    setLang(first);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
  window.SQ_i18n = { setLang: setLang, t: tr };
})();
