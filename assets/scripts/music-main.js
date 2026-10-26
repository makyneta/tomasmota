(async function () {
  const T = window.THS;

  // ===== TOUR: edita aqui as datas =====
  // date: AAAA-MM-DD · venue/city: texto · url: link dos bilhetes · soldout: true/false · support: opcional
  // Datas passadas desaparecem sozinhas. Sem nenhuma data futura, aparece "Sem concertos agendados".
  const SHOWS = [
    { date: "2026-12-06", venue: "Casa da Música", city: "Marinha Grande, PT", url: "#", soldout: true, support: "" }
  ];
  // injeta um partial HTML numa div
  const inject = async (id, url) => {
    const el = document.getElementById(id); if (!el) return;
    try { const r = await fetch(url); if (!r.ok) throw 0; el.innerHTML = await r.text() } catch { console.error("Erro a carregar " + url) }
  };
  await Promise.all([inject("site-header", "/assets/ui/header/music.html"), inject("site-footer", "/assets/ui/footer/music.html")]);

  // redes sociais — UMA só lista, usada no header (desktop) e no footer. Edita os links aqui.
  const SOCIALS = [
    ["instagram", "Instagram", "/instagram"],
    ["facebook-f", "Facebook", "/facebook"],
    ["youtube", "YouTube", "/youtube"],
    ["spotify", "Spotify", "/spotify"],
  ];
  const socialHTML = SOCIALS.map(([i, n, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${n}"><i class="fa-brands fa-${i}"></i></a>`).join("");
  const hb = document.getElementById("burger");
  if (hb && !document.querySelector(".header-social")) { const s = document.createElement("div"); s.className = "header-social"; s.innerHTML = socialHTML; hb.before(s); }
  document.querySelectorAll(".footer .social, .f-social").forEach(el => el.innerHTML = socialHTML);
  const nv = document.getElementById("nav");
  if (nv && !nv.querySelector(".nav-social")) { const s = document.createElement("div"); s.className = "nav-social"; s.innerHTML = socialHTML; nv.append(s); }
  // link ativo no header
  const normalizePath = p => p.replace(/\/index\.html$/, "/").replace(/\.html$/, "").replace(/\/$/, "") || "/";
  const path = normalizePath(location.pathname);
  document.querySelectorAll("#nav a").forEach(a => { const u = new URL(a.href); if (!u.hash && normalizePath(u.pathname) === path) a.classList.add("active") });
  // header sólido depois de sair do hero
  const hd = document.querySelector(".header");
  if (hd) { const s = () => hd.classList.toggle("scrolled", window.scrollY > 40); s(); window.addEventListener("scroll", s, { passive: true }); }
  // ano no footer
  document.querySelectorAll("[data-year]").forEach(s => s.textContent = new Date().getFullYear());
  // menu hambúrguer
  const b = document.getElementById("burger"), n = document.getElementById("nav");
  if (b && n) {
    const t = o => { b.classList.toggle("open", o); n.classList.toggle("open", o); b.setAttribute("aria-expanded", o); document.body.classList.toggle("menu-open", o); document.body.style.overflow = o ? "hidden" : "" };
    document.addEventListener("keydown", e => { if (e.key === "Escape" && n.classList.contains("open")) t(false) });
    b.onclick = () => t(!n.classList.contains("open")); n.querySelectorAll("a").forEach(a => a.onclick = () => t(false));
  }
  // slideshow
  const sl = [...document.querySelectorAll(".slide")];
  if (sl.length > 1) { let i = Math.max(0, sl.findIndex(s => s.classList.contains("active"))); setInterval(() => { sl[i].classList.remove("active"); i = (i + 1) % sl.length; sl[i].classList.add("active") }, 5500); }
  // tour
  const tl = document.getElementById("tour-list");
  if (tl) {
    const M = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
    const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
    const prox = SHOWS.filter(s => new Date(s.date + "T00:00:00") >= hoje).sort((a, b) => a.date.localeCompare(b.date));
    tl.innerHTML = prox.map(s => {
      const d = new Date(s.date + "T00:00:00");
      const bil = s.soldout ? '<span class="gig-tickets is-off">Esgotado</span>' : '<a class="gig-tickets" href="' + esc(s.url) + '" target="_blank" rel="noopener">Bilhetes</a>';
      return '<article class="gig"><div class="gig-info"><h3 class="gig-venue">' + esc(s.venue) + '</h3><div class="gig-meta"><span>' + esc(s.city) + '</span>' + bil + '</div>' +
        (s.support ? '<small class="gig-support">Primeira parte: ' + esc(s.support) + '</small>' : '') + '</div>' +
        '<div class="gig-date"><b>' + String(d.getDate()).padStart(2, "0") + '</b><span>' + M[d.getMonth()] + ' ’' + String(d.getFullYear()).slice(-2) + '</span></div></article>';
    }).join("");
    tl.hidden = !prox.length;
    document.getElementById("tour-sub").hidden = !prox.length;
    document.getElementById("tour-empty").hidden = !!prox.length;
  }
  // email de contacto (vem do config.js)
  document.querySelectorAll("[data-email]").forEach(a => { if (T && T.email) { a.textContent = T.email; a.href = "mailto:" + T.email } else if (a.parentElement) a.parentElement.hidden = true });
  // reveal
  const io = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target) } }), { threshold: .12 });
  document.querySelectorAll(".rv").forEach(el => io.observe(el));
  // formulário
  const f = document.getElementById("contact-form");
  if (f) f.addEventListener("submit", async e => {
    e.preventDefault(); if (f.website.value) return;
    const m = document.getElementById("form-msg"), btn = f.querySelector("button"); btn.disabled = true;
    try {
      const r = await fetch(f.action, { method: f.method, headers: { "Accept": "application/json" }, body: new FormData(f) });
      if (!r.ok) throw 0; m.textContent = "Mensagem enviada! Responderemos em breve."; f.reset()
    }
    catch { m.innerHTML = "Erro ao enviar. Escreva-nos diretamente para <a href='mailto:" + T.email + "'>" + T.email + "</a>." }
    m.style.display = "block"; btn.disabled = false
  });
})();