const PROJECTS = [
  { id:21, title:"Volta aos 7 - Vidrala",
    category:"sport", year:"2026", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photography/camg-voltaaos7.webp",
    slug:"https://banlek.com/album/28868e", photoCount:143 },

  { id:20, title:"Campeonato Nacional de Clubes ao Ar Livre",
    category:"sport", year:"2026", location:"Coimbra", desc:"",
    cover:"/assets/images/projects/photography/fpa-nacionalclubes.webp",
    slug:"https://banlek.com/album/235f08", photoCount:670 },

  { id:19, title:"Sala de Espera",
    category:"theater", year:"2026", location:"Leiria", desc:"",
    cover:"/assets/images/projects/photography/tjls-salaespera.webp",
    slug:"https://banlek.com/album/258ffd", photoCount:132 },

  { id:18, title:"50º Aniversário da Constituição Portuguesa",
    category:"event", year:"2026", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photography/cmmg-aniversarioconstituicao.webp",
    slug:"https://banlek.com/album/258e41", photoCount:127 },

  { id:17, title:"XI Café com Livros",
    category:"event", year:"2026", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photography/aemgp-cafecomlivros.webp",
    slug:"https://banlek.com/album/258e57", photoCount:145 },

  { id:16, title:"30º Fair Play Calazans",
    category:"sport", year:"2026", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photography/eseacd-fairplay.webp",
    slug:"https://banlek.com/album/258e71", photoCount:1129 },

  { id:15, title:"ESEACD @ Futurália",
    category:"event", year:"2026", location:"Lisboa", desc:"",
    cover:"/assets/images/projects/photography/eseacd-futuralia.webp",
    slug:"https://banlek.com/album/258881", photoCount:97 },

  { id:14, title:"ESEACD @ Centimfe",
    category:"event", year:"2026", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photography/eseacd-centimfe.webp",
    slug:"https://banlek.com/album/2588b6", photoCount:187 },

  { id:13, title:"ESEACD @ Rádio e Televisão Portuguesa",
    category:"event", year:"2026", location:"Lisboa", desc:"",
    cover:"/assets/images/projects/photography/eseacd-rtp.webp",
    slug:"https://banlek.com/album/2588df", photoCount:42 },

  { id:12, title:"18 de Janeiro de 1934",
    category:"theater", year:"2026", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photography/aemgp-18jan1934.webp",
    slug:"https://banlek.com/album/258e65", photoCount:247 },

  { id:11, title:"Festa Final de Época ACM",
    category:"sport", year:"2025", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photography/acmarinhense-festa.webp",
    slug:"https://banlek.com/album/258ed6", photoCount:434 },

  { id:10, title:"Treinos u-13 ACMarinhense",
    category:"sport", year:"2025", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photography/acmarinhense-u13.webp",
    slug:"https://banlek.com/album/258f6a", photoCount:280 },

  { id:9, title:"ACMarinhense @ PombalCup",
    category:"sport", year:"2025", location:"Pombal", desc:"",
    cover:"/assets/images/projects/photography/acmarinhense-pombalcup.webp",
    slug:"https://banlek.com/album/258f1d", photoCount:288 },

  { id:8, title:"XIV Mediateca com Vida",
    category:"event", year:"2025", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photography/aemgp-mediatecacomvida.webp",
    slug:"https://banlek.com/album/258fdb", photoCount:89 },

  { id:7, title:"SLMarinha VS UDBatalha",
    category:"sport", year:"2025", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photography/slmarinha-vs-udbatalha.webp",
    slug:"https://www.behance.net/gallery/216616067/SLMarinha-VS-UDBatalha", photoCount:99 },

  { id:6, title:"Os Penetras @ RTP",
    category:"event", year:"2024", location:"Lisboa", desc:"",
    cover:"/assets/images/projects/photography/penetras-rtp.webp",
    slug:"https://www.behance.net/gallery/232190989/Music-OP-Live-Performance-at-Estrelas-ao-Sabado", photoCount:83 },

  { id:5, title:"Os Penetras",
    category:"session", year:"2024", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photography/penetras.webp",
    slug:"https://www.behance.net/gallery/232210639/Music-OP-Photoshoot", photoCount:43 },

  { id:4, title:"Grupo Desportivo de Pescadores da Costa da Caparica @ SLMarinha",
    category:"sport", year:"2024", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photography/gdpcc-slmarinha.webp",
    slug:"https://www.behance.net/gallery/232285927/Sport-GDPCC-Impor4mill-Sumer-Cup", photoCount:67 },

  { id:3, title:"IberoAlpla @ Torneio Inter-Empresas",
    category:"sport", year:"2024", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photography/iberoalpla.webp",
    slug:"https://www.behance.net/gallery/231766181/Sport-IA-Inter-Company-Tournament", photoCount:50 },

  { id:2, title:"Song Raiders",
    category:"event", year:"2024", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photography/cmmg-songraiders.webp",
    slug:"https://www.behance.net/gallery/231746927/Music-SR-LIve-Performance-at-MG2024CF", photoCount:74 },
];

const CATS = [
  { id: 'all', label: 'All' },
  { id: 'event', label: 'Events' },
  { id: 'sport', label: 'Sport' },
  { id: 'theater', label: 'Theatre' },
  { id: 'session', label: 'Sessions' },
];

const availableCategories = new Set(PROJECTS.map(project => project.category));
const filterContainer = document.getElementById('ftabs');
const projectGrid = document.getElementById('grid');
const projectCount = document.getElementById('vc');
const projectStat = document.querySelector('[data-stat="projects"]');
const photographStat = document.querySelector('[data-stat="photographs"]');

const totalPhotographs = PROJECTS.reduce(
  (total, project) => total + (project.photoCount || 0),
  0
);

if (projectStat) {
  projectStat.textContent = PROJECTS.length;
}

if (photographStat) {
  photographStat.textContent = totalPhotographs.toLocaleString('en');
}

if (filterContainer) {
  CATS.forEach(category => {
    if (category.id !== 'all' && !availableCategories.has(category.id)) return;

    const button = document.createElement('button');
    button.className = 'ftab';
    button.type = 'button';
    button.dataset.cat = category.id;
    button.textContent = category.label;
    button.setAttribute('aria-pressed', String(category.id === 'all'));
    button.addEventListener('click', () => {
      filterContainer.querySelectorAll('.ftab').forEach(filter => {
        filter.setAttribute('aria-pressed', String(filter === button));
      });
      renderProjects(category.id);
    });
    filterContainer.appendChild(button);
  });
}

function renderProject(project) {
  const meta = [project.year, project.location].filter(Boolean).join(' · ');
  const category = CATS.find(item => item.id === project.category);
  const count = project.photoCount
    ? `${project.photoCount.toLocaleString()} photographs`
    : '';

  return `
    <article class="card">
      <a class="card-image-link" href="${project.slug}" aria-label="View photos from ${project.title}">
        <div class="c-img">
          <img src="${project.cover}" alt="${project.title}" loading="lazy" decoding="async">
          <span class="c-badge">${category ? category.label : project.category}</span>
          ${count ? `<span class="c-frames">${count}</span>` : ''}
        </div>
      </a>
      <div class="c-body">
        <p class="c-meta">${meta}</p>
        <h3 class="c-title">${project.title}</h3>
        <a class="c-link" href="${project.slug}">
          View project <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>`;
}

function renderProjects(categoryId) {
  const projects = PROJECTS
    .filter(project => categoryId === 'all' || project.category === categoryId)
    .sort((first, second) => second.id - first.id);

  if (projectCount) {
    projectCount.textContent = projects.length;
  }

  if (!projectGrid) return;

  projectGrid.innerHTML = projects.length
    ? projects.map(renderProject).join('')
    : '<p class="empty-state">No projects in this category yet.</p>';
}

renderProjects('all');