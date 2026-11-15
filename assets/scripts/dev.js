    /* ── SVG Icons ── */
    const EXT = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

    const BADGE = { frontend: 'Front-end', fullstack: 'Full-stack', backend: 'Back-end' };
    const TYPE_COLOR = { frontend: '#00ff88', fullstack: '#00d4ff', backend: '#ffd700' };

    /* ── Projects data ── */
    const projects = [
      { id:15, title:"Esdras Lopes", type:"frontend",
        img:"/assets/images/projects/web-development/esdras-lopes.webp",
        demo:"https://makyneta.github.io/esdras",
        desc:""},

      { id:14, title:"Victor Campos", type:"frontend",
        img:"/assets/images/projects/web-development/victor-campos.webp",
        demo:"https://makyneta.github.io/victor",
        desc:""},

      { id:13, title:"Math For Teens", type:"fullstack",
        img:"/assets/images/projects/web-development/math-for-teens.webp",
        demo:"https://www.mathforteens.pt",
        desc:""},

      { id:12, title:"Nicholas Moraes", type:"frontend",
        img:"/assets/images/projects/web-development/nicholas-moraes.webp",
        demo:"https://makyneta.github.io/m0rwes",
        desc:""},

      { id:11, title:"Libélula Teatro", type:"frontend",
        img:"/assets/images/projects/web-development/libelula-teatro.webp",
        demo:"https://libelulateatro.lovable.app",
        desc:""},

      { id:10, title:"Mr. Devix", type:"frontend",
        img:"/assets/images/projects/web-development/mr-devix.webp",
        demo:"https://makyneta.github.io/mrdevix",
        desc:""},

      { id:9, title:"Clube Atletismo de Marinha Grande", type:"fullstack",
        img:"/assets/images/projects/web-development/clube-atletismo-de-marinha-grande.webp",
        demo:"https://www.catletismomg.pt",
        desc:""},

      { id:8, title:"Nicholas Simões", type:"frontend",
        img:"/assets/images/projects/web-development/nicholas-simoes.webp",
        demo:"https://makyneta.github.io/nico",
        desc:""},

      { id:7, title:"Juventude Socialista Marinha Grande", type:"frontend",
        img:"/assets/images/projects/web-development/js-marinhagrande.webp",
        demo:"https://makyneta.github.io/jsmarinhagrande",
        desc:""},

      { id:6, title:"Mayday", type:"frontend",
        img:"/assets/images/projects/web-development/mayday.webp",
        demo:"https://makyneta.github.io/mayday",
        desc:""},

      { id:5, title:"Amalias", type:"frontend",
        img:"/assets/images/projects/web-development/amalias.webp",
        demo:"https://makyneta.github.io/amalias",
        desc:""},

      { id:4, title:"LS Videomaker", type:"frontend",
        img:"/assets/images/projects/web-development/ls-videomaker.webp",
        demo:"https://makyneta.github.io/lsvideomaker",
        desc:""},

      { id:3, title:"Nickz", type:"frontend",
        img:"/assets/images/projects/web-development/nickz.webp",
        demo:"https://makyneta.github.io/nickz",
        desc:""},

      { id:2, title:"Francisco Ferreira", type:"frontend",
        img:"/assets/images/projects/web-development/francisco-ferreira.webp",
        demo:"https://makyneta.github.io/franciscoferreira",
        desc:""},

      { id:1, title:"Tiago Pedro", type:"frontend",
        img:"/assets/images/projects/web-development/tiago-pedro.webp",
        demo:"https://makyneta.github.io/tiagopedro",
        desc:""},
    ];

    /* ── Build cards ── */
    const grid = document.getElementById('projects-grid');

    projects.forEach((p) => {
      const col  = TYPE_COLOR[p.type];

      const imgHtml = p.img
        ? `<div class="card-img-wrap">
             <img src="${p.img}" alt="Projeto web: ${p.title}" loading="lazy"/>
             <span class="card-lang-badge" style="background:${col}">${BADGE[p.type]}</span>
           </div>`
        : `<div class="card-img-wrap no-img">
             <span class="card-lang-badge" style="background:${col};position:relative;top:auto;left:auto">${BADGE[p.type]}</span>
           </div>`;

      grid.insertAdjacentHTML('beforeend', `
        <div class="project-card" data-type="${p.type}">
          ${imgHtml}
          <div class="card-body">
            <div class="card-title-wrap">
              <h3 class="card-title">${p.title}</h3>
            </div>
            ${p.desc ? `<p class="card-desc">${p.desc}</p>` : ''}
            <div class="card-actions">
              <a href="${p.demo}" target="_blank" rel="noopener" class="card-btn">Visitar site ${EXT}</a>
            </div>
          </div>
        </div>
      `);
    });
    /* ── Update count ── */
    document.getElementById('count-num').textContent = projects.length;

    /* ── Filter ── */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const countNum   = document.getElementById('count-num');
    const countLbl   = document.getElementById('count-label');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        filterBtns.forEach(b => {
          if (b !== btn) b.setAttribute('aria-pressed', 'false');
        });
        const f = btn.dataset.filter;
        let n = 0;
        document.querySelectorAll('.project-card').forEach(card => {
          const show = f === 'all' || card.dataset.type === f;
          card.classList.toggle('hidden', !show);
          if (show) { n++; card.classList.add('card-visible'); }
        });
        countNum.textContent = n;
        countLbl.textContent = n === 1 ? 'projeto' : 'projetos';
      });
    });
