const PROJECTS = [
  { id:21, title:"Volta aos 7 - Vidrala",
    category:"sport", year:"2026", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photo/camg-voltaaos7.webp",
    slug:"/camg-voltaaos7", photoCount:143 },

  { id:20, title:"National Club Championship in Open Air",
    category:"sport", year:"2026", location:"Coimbra", desc:"",
    cover:"/assets/images/projects/photo/fpa-nacionalclubes.webp",
    slug:"/fpa-nacionalclubes", photoCount:670 },

  { id:19, title:"Waiting Room by Libélula Teatro",
    category:"event", year:"2026", location:"Leiria", desc:"",
    cover:"/assets/images/projects/photo/tjls-salaespera.webp",
    slug:"/tjls-salaespera", photoCount:132 },

  { id:18, title:"50th Anniversary of the Constitution of the Portuguese Republic",
    category:"event", year:"2026", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photo/cmmg-aniversarioconstituicao.webp",
    slug:"/cmmg-aniversarioconstituicao", photoCount:127 },

  { id:17, title:"XI Coffee with Books",
    category:"event", year:"2026", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photo/aemgp-cafecomlivros.webp",
    slug:"/aemgp-cafecomlivros", photoCount:145 },

  { id:16, title:"30th Fair Play Calazans",
    category:"sport", year:"2026", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photo/eseacd-fairplay.webp",
    slug:"/eseacd-fairplay", photoCount:1129 },

  { id:15, title:"ESEACD @ Futurália",
    category:"event", year:"2026", location:"Lisboa", desc:"",
    cover:"/assets/images/projects/photo/eseacd-futuralia.webp",
    slug:"/eseacd-futuralia", photoCount:97 },

  { id:14, title:"ESEACD @ Centimfe",
    category:"event", year:"2026", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photo/eseacd-centimfe.webp",
    slug:"/eseacd-centimfe", photoCount:187 },

  { id:13, title:"ESEACD @ Rádio e Televisão Portuguesa",
    category:"event", year:"2026", location:"Lisboa", desc:"",
    cover:"/assets/images/projects/photo/eseacd-rtp.webp",
    slug:"/eseacd-rtp", photoCount:42 },

  { id:12, title:"January 18, 1934",
    category:"theater", year:"2026", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photo/aemgp-18jan1934.webp",
    slug:"/aemgp-18jan1934", photoCount:247 },

  { id:11, title:"Final Party of ACMarinhense",
    category:"sport", year:"2025", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photo/acmarinhense-festa.webp",
    slug:"/acmarinhense-festa", photoCount:434 },

  { id:10, title:"Training Sessions ACMarinhense U-13",
    category:"sport", year:"2025", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photo/acmarinhense-u13.webp",
    slug:"/acmarinhense-u13", photoCount:280 },

  { id:9, title:"ACMarinhense @ PombalCup",
    category:"sport", year:"2025", location:"Pombal", desc:"",
    cover:"/assets/images/projects/photo/acmarinhense-pombalcup.webp",
    slug:"/acmarinhense-pombalcup", photoCount:288 },

  { id:8, title:"XIV Mediateca com Vida",
    category:"event", year:"2025", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photo/aemgp-mediatecacomvida.webp",
    slug:"/aemgp-mediatecacomvida", photoCount:89 },

  { id:7, title:"SLMarinha VS UDBatalha",
    category:"sport", year:"2025", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photo/slmarinha-vs-udbatalha.webp",
    slug:"/slmarinha-vs-udbatalha", photoCount:99 },

  { id:6, title:"Os Penetras @ RTP",
    category:"event", year:"2024", location:"Lisboa", desc:"",
    cover:"/assets/images/projects/photo/penetras-rtp.webp",
    slug:"/penetras-rtp", photoCount:83 },

  { id:5, title:"Os Penetras",
    category:"session", year:"2024", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photo/penetras.webp",
    slug:"/penetras", photoCount:43 },

  { id:4, title:"Grupo Desportivo de Pescadores da Costa da Caparica @ SLMarinha",
    category:"sport", year:"2024", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photo/gdpcc-slmarinha.webp",
    slug:"/gdpcc-slmarinha", photoCount:67 },

  { id:3, title:"IberoAlpla @ Inter-Company Tournament",
    category:"sport", year:"2024", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photo/iberoalpla.webp",
    slug:"/iberoalpla", photoCount:50 },

  { id:2, title:"Song Raiders",
    category:"event", year:"2024", location:"Marinha Grande", desc:"",
    cover:"/assets/images/projects/photo/cmmg-songraiders.webp",
    slug:"/cmmg-songraiders", photoCount:74 },
    
  { id:1, title:"Swee",
    category:"session", year:"2024", location:"", desc:"",
    cover:"/assets/images/projects/photo/swee.webp",
    slug:"/swee", photoCount:74 },
];

const CATS = [
  { id: 'all', label: 'All work' },
  { id: 'event', label: 'Events' },
  { id: 'sport', label: 'Sport' },
  { id: 'theater', label: 'Theatre' },
  { id: 'session', label: 'Portraits & sessions' },
];

const availableCategories = new Set(PROJECTS.map(project => project.category));
const filterContainer = document.getElementById('ftabs');
const projectGrid = document.getElementById('grid');
const projectCount = document.getElementById('vc');

const totalPhotographs = PROJECTS.reduce(
  (total, project) => total + (project.photoCount || 0),
  0
);
document.querySelector('[data-stat="projects"]').textContent = PROJECTS.length;
document.querySelector('[data-stat="photographs"]').textContent =
  totalPhotographs.toLocaleString('en');

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

  projectCount.textContent = projects.length;
  projectGrid.innerHTML = projects.length
    ? projects.map(renderProject).join('')
    : '<p class="empty-state">No projects in this category yet.</p>';
}

renderProjects('all');