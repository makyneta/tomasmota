/* PÁGINA LANÇAMENTOS — /assets/scripts/lancamentos.js
   Mostra todos os lançamentos (do mais recente para o mais antigo).
   Ao clicar num lançamento, abre a página externa que indicares em "url" (num novo separador). */
(() => {
  /* ===== LISTA DE LANÇAMENTOS =====
     title  → nome
     type   → "Single", "EP" ou "Álbum"
     date   → "AAAA-MM-DD" (ou só "AAAA"). Datas no futuro mostram a etiqueta "Em breve".
     cover  → caminho da capa (quadrada). Sem capa, aparece "THS".
     url    → link externo para onde o clique leva (Spotify, smart link, YouTube, etc.).
              Sem url, o cartão aparece mas não é clicável. */
  const RELEASES = [
    { title: "Golden", type: "Single", date: "2026-10-02",
    cover: "/assets/images/music/releases/golden.webp",
    url: "/music/golden" },

    // { title: "Nome do EP", type: "EP", date: "2026-12-20", cover: "/assets/images/releases/nome-do-ep.webp", url: "https://..." },
  ];

  const grid = document.getElementById("releases-grid");
  const empty = document.getElementById("releases-empty");
  if (!grid) return;

  const today = new Date().toISOString().slice(0, 10);

  const items = RELEASES.filter(r => r && r.title)
    .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));

  empty.hidden = items.length > 0;

  items.forEach(r => {
    const date = String(r.date || "");
    const soon = date.length >= 10 && date > today;

    // cartão inteiro clicável → página externa, num novo separador
    const card = document.createElement(r.url ? "a" : "div");
    card.className = "release";
    if (r.url) {
      card.href = r.url; card.target = "_blank"; card.rel = "noopener noreferrer";
      card.setAttribute("aria-label", r.title + (r.type ? " (" + r.type + ")" : "") + " — abre noutro site");
    }

    const cover = document.createElement("span"); cover.className = "release-cover";
    cover.append("THS");
    if (r.cover) {
      const img = document.createElement("img");
      img.src = r.cover; img.alt = ""; img.loading = "lazy"; img.decoding = "async";
      img.onerror = () => img.remove();            // sem imagem → fica o "THS"
      cover.append(img);
    }
    if (soon) { const s = document.createElement("span"); s.className = "release-soon"; s.textContent = "Em breve"; cover.append(s) }

    const title = document.createElement("span"); title.className = "release-title"; title.textContent = r.title;
    const meta = document.createElement("small"); meta.className = "release-meta";
    meta.textContent = [r.type, date.slice(0, 4)].filter(Boolean).join(" · ");

    card.append(cover, title, meta);
    grid.append(card);
  });
})();