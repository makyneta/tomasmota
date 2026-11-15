(function () {
  const track = document.getElementById('tslider');
  const reviews = window.MakynetaTestimonials;
  const dots = document.getElementById('test-dots');
  const previous = document.getElementById('t-prev');
  const next = document.getElementById('t-next');
  const toggle = document.getElementById('t-toggle');
  const counter = document.getElementById('test-counter');
  const progress = document.getElementById('test-progress');

  if (!track) return;
  if (!Array.isArray(reviews) || reviews.length === 0) {
    console.error('Homepage testimonials could not be loaded.');
    track.setAttribute('aria-busy', 'false');
    return;
  }

  const star = '\u2605';
  const cards = reviews.map((review, index) => {
    const card = document.createElement('article');
    card.className = 'test-card';
    card.setAttribute('role', 'group');
    card.setAttribute('aria-roledescription', 'slide');
    card.setAttribute('aria-label', `${index + 1} de ${reviews.length}`);
    card.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');

    const client = document.createElement('div');
    client.className = 'testimonial-client';

    const avatar = document.createElement('img');
    avatar.className = 'testimonial-avatar';
    avatar.src = review.image;
    avatar.alt = '';
    avatar.loading = 'lazy';
    avatar.decoding = 'async';

    const name = document.createElement('strong');
    name.textContent = review.name;

    const role = document.createElement('span');
    role.className = 'testimonial-role';
    role.textContent = review.role;

    const identity = document.createElement('div');
    identity.className = 'testimonial-identity';
    identity.append(name, role);

    const rating = document.createElement('span');
    rating.className = 'testimonial-rating';
    rating.setAttribute('role', 'img');
    rating.setAttribute('aria-label', `${review.rating} de 5 estrelas`);
    rating.textContent = star.repeat(review.rating);

    client.append(avatar, identity, rating);

    const quote = document.createElement('blockquote');
    quote.textContent = `“${review.quote}”`;

    const content = document.createElement('div');
    content.className = 'testimonial-content';
    content.append(quote);

    if (review.projectUrl) {
      const projectLink = document.createElement('a');
      projectLink.className = 'testimonial-project';
      projectLink.href = review.projectUrl;
      projectLink.target = '_blank';
      projectLink.rel = 'noopener noreferrer';
      projectLink.append(document.createTextNode('Ver projeto'));

      const arrow = document.createElement('span');
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '↗';
      projectLink.append(arrow);
      content.append(projectLink);
    }

    card.append(client, content);
    return card;
  });

  const dotButtons = reviews.map((review, index) => {
    const button = document.createElement('button');
    button.className = 'test-dot';
    button.type = 'button';
    button.setAttribute('aria-label', `Mostrar testemunho ${index + 1}`);
    button.setAttribute('aria-current', index === 0 ? 'true' : 'false');
    button.addEventListener('click', () => show(index));
    return button;
  });

  track.replaceChildren(...cards);
  track.setAttribute('aria-busy', 'false');
  dots.replaceChildren(...dotButtons);

  let current = 0;
  let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer;
  let hovering = false;
  let focused = false;
  const carousel = track.closest('.testimonials-carousel');
  const viewport = carousel.querySelector('.testimonials-viewport');
  let pointerStart;

  function show(index) {
    current = (index + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    cards.forEach((card, cardIndex) => {
      card.setAttribute('aria-hidden', cardIndex === current ? 'false' : 'true');
      const projectLink = card.querySelector('.testimonial-project');
      if (projectLink) projectLink.tabIndex = cardIndex === current ? 0 : -1;
    });
    dotButtons.forEach((button, buttonIndex) => {
      button.classList.toggle('on', buttonIndex === current);
      button.setAttribute('aria-current', buttonIndex === current ? 'true' : 'false');
    });
    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    progress.style.width = `${((current + 1) / cards.length) * 100}%`;
    viewport.style.height = `${cards[current].offsetHeight}px`;
  }

  function scheduleNext() {
    window.clearTimeout(timer);
    if (paused || hovering || focused || document.hidden) return;
    timer = window.setTimeout(() => {
      show(current + 1);
      scheduleNext();
    }, 6500);
  }

  previous.addEventListener('click', () => {
    show(current - 1);
    scheduleNext();
  });
  next.addEventListener('click', () => {
    show(current + 1);
    scheduleNext();
  });
  toggle.addEventListener('click', () => {
    paused = !paused;
    toggle.setAttribute('aria-pressed', paused ? 'true' : 'false');
    toggle.setAttribute('aria-label', paused ? 'Iniciar slideshow' : 'Pausar slideshow');
    toggle.textContent = paused ? '▶' : 'Ⅱ';
    scheduleNext();
  });
  toggle.setAttribute('aria-pressed', paused ? 'true' : 'false');
  toggle.setAttribute('aria-label', paused ? 'Iniciar slideshow' : 'Pausar slideshow');
  toggle.textContent = paused ? '▶' : 'Ⅱ';

  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch') {
      pointerStart = { x: event.clientX, y: event.clientY };
    }
  });
  viewport.addEventListener('pointerup', event => {
    if (!pointerStart) return;
    const deltaX = pointerStart.x - event.clientX;
    const deltaY = pointerStart.y - event.clientY;
    pointerStart = null;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      show(current + (deltaX > 0 ? 1 : -1));
      scheduleNext();
    }
  });

  carousel.addEventListener('mouseenter', () => {
    hovering = true;
    scheduleNext();
  });
  carousel.addEventListener('mouseleave', () => {
    hovering = false;
    scheduleNext();
  });
  carousel.addEventListener('focusin', () => {
    focused = true;
    scheduleNext();
  });
  carousel.addEventListener('focusout', event => {
    if (!carousel.contains(event.relatedTarget)) {
      focused = false;
      scheduleNext();
    }
  });
  document.addEventListener('visibilitychange', scheduleNext);
  window.addEventListener('resize', () => {
    viewport.style.height = `${cards[current].offsetHeight}px`;
  });

  show(0);
  scheduleNext();
})();
