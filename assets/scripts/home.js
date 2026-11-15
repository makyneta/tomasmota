/* ── Progress ── */
(function () {
  const progressBar = document.getElementById('bar');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    progressBar.style.width = Math.min(progress, 100) + '%';
  }, { passive: true });
})();

/* ── Popup ── */
/* ── Popup ── */
(function(){
  const popup = document.getElementById('cesario-popup');
  if (!popup) return;

  const closeButton = popup.querySelector('.cesario-popup-close');
  const cta = popup.querySelector('.cesario-popup-cta');
  let lastFocusedElement;

  function closePopup(){
    popup.classList.remove('open');
    popup.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  function openPopup(){
    lastFocusedElement = document.activeElement;
    popup.classList.add('open');
    popup.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeButton) closeButton.focus();
  }

  if (closeButton) {
    closeButton.addEventListener('click', closePopup);
  }

  popup.addEventListener('click', event => {
    if (event.target === popup) closePopup();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && popup.classList.contains('open')) closePopup();
  });

  if (cta) {
    cta.addEventListener('click', () => { 
      document.body.style.overflow = ''; 
    });
  }

  function schedulePopup(){
    window.setTimeout(openPopup, 2800);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedulePopup, { once: true });
  } else {
    schedulePopup();
  }
})();

/* ── Reveal ── */
const ro = new IntersectionObserver(
  entries => entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: .06 }
);
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* ── Portfolio Showcase ── */
(function(){
  const isPortuguese = document.documentElement.lang.toLowerCase().startsWith('pt');
  const EXT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
  const INFO_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
  const VIEW_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`;

  const devData = [
    { title:"Math For Teens", tags:[],
      img:"/assets/images/projects/web-development/math-for-teens.webp",
      demo:"https://www.mathforteens.pt/", info:"" },

    { title:"Libélula Teatro", tags:[],
      img:"/assets/images/projects/web-development/libelula-teatro.webp",
      demo:"https://libelulateatro.lovable.app/", info:"" },

    { title:"Clube Atletismo de Marinha Grande", tags:[],
      img:"/assets/images/projects/web-development/clube-atletismo-de-marinha-grande.webp",
      demo:"https://www.catletismomg.pt", info:"" },
  ];

  const photoData = [

    { title: isPortuguese ? "Campeonato Nacional de Clubes ao Ar Livre" : "National Club Championship in Open Air", cat: isPortuguese ? "Desporto" : "Sport",
      img:"/assets/images/projects/photography/fpa-nacionalclubes.webp",
      view:"https://banlek.com/album/235f08" },

    { title: isPortuguese ? "50.º Aniversário da Constituição da República Portuguesa" : "50th Anniversary of the Constitution of the Portuguese Republic", cat: isPortuguese ? "Evento" : "Event",
      img:"/assets/images/projects/photography/cmmg-aniversarioconstituicao.webp",
      view:"https://banlek.com/album/258e41" },

    { title:"30º Fair Play Calazans", cat: isPortuguese ? "Desporto" : "Sport",
      img:"/assets/images/projects/photography/eseacd-fairplay.webp",
      view:"https://banlek.com/album/258e71" },
  ];

  const devGrid = document.getElementById('pf-grid-dev');
  if (devGrid) {
    devData.forEach((p) => {
      devGrid.insertAdjacentHTML('beforeend', `
        <div class="pf-card-dev">
          <div class="pf-dev-img">
            <img src="${p.img}" alt="${p.title}" loading="lazy"/>
          </div>
          <div class="pf-dev-body">
            <h3 class="pf-dev-title">${p.title}</h3>
            <div class="pf-dev-tags">${p.tags.map(t => `<span class="pf-dev-tag">${t}</span>`).join('')}</div>
            <div class="pf-dev-actions">
              ${p.info ? `<a href="${p.info}">${INFO_ICON} ${isPortuguese ? 'Informação' : 'Info'}</a>` : ''}
              <a href="${p.demo}" target="_blank" rel="noopener">${EXT} ${isPortuguese ? 'Visitar' : 'Visit'}</a>
            </div>
          </div>
        </div>
      `);
    });
  }

  function buildLabelCards(gridId, data) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    data.forEach((p) => {
      grid.insertAdjacentHTML('beforeend', `
        <div class="pf-card-media">
          <div class="pf-media-img">
            <img src="${p.img}" alt="${p.title}" loading="lazy"/>
          </div>
          <div class="pf-media-label">
            <span class="pf-media-cat">${p.cat}</span>
            <h3 class="pf-media-title">${p.title}</h3>
            <div class="pf-media-actions">
              ${p.info ? `<a href="${p.info}" class="pfm-btn">${INFO_ICON} ${isPortuguese ? 'Informação' : 'Info'}</a>` : ''}
              <a href="${p.view}" class="pfm-btn" target="_blank" rel="noopener">${VIEW_ICON} ${isPortuguese ? 'Ver' : 'View'}</a>
            </div>
          </div>
        </div>
      `);
    });
  }
  buildLabelCards('pf-grid-photo', photoData);
})();

/* ── Hero terminal typing ── */
(function(){
  const win = document.querySelector('.term-window');
  if (!win) return;
  const lines = Array.prototype.slice.call(win.querySelectorAll('.term-line'));
  if (!lines.length) return;

  win.classList.add('term-anim');

  const TYPING_MS = 45;

  function typeCommand(line){
    const cmd = line.querySelector('.term-cmd');
    if (!cmd) return Promise.resolve();
    const full = cmd.textContent;
    cmd.textContent = '';
    return new Promise(resolve => {
      let n = 0;
      const iv = setInterval(() => {
        n++;
        cmd.textContent = full.slice(0, n);
        if (n >= full.length) {
          clearInterval(iv);
          setTimeout(resolve, 260);
        }
      }, TYPING_MS);
    });
  }

  async function run(){
    for (let i = 0; i < lines.length; i++){
      const line = lines[i];
      line.classList.add('in');
      if (line.querySelector('.term-cmd')) {
        await typeCommand(line);
      } else {
        await new Promise(r => setTimeout(r, 360));
      }
    }
  }

  setTimeout(run, 2100);
})();