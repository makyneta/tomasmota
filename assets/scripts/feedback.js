(function () {
  const reviews = window.MakynetaTestimonials;

  const grid = document.getElementById('feedback-grid');
  const count = document.getElementById('feedback-count');
  const average = document.getElementById('feedback-average');
  const summaryCopy = document.getElementById('feedback-summary-copy');

  if (!grid || !count || !average || !summaryCopy) return;
  if (!Array.isArray(reviews) || reviews.length === 0) {
    console.error('Client testimonials could not be loaded.');
    grid.setAttribute('aria-busy', 'false');
    return;
  }

  const star = '\u2605';
  const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
  const fragment = document.createDocumentFragment();

  reviews.forEach((review, index) => {
    const card = document.createElement('article');
    card.className = 'feedback-card';

    const cardTop = document.createElement('div');
    cardTop.className = 'feedback-card-top';

    const label = document.createElement('span');
    label.className = 'feedback-card-label';
    label.textContent = 'Client review';

    const stars = document.createElement('span');
    stars.className = 'feedback-card-stars';
    stars.setAttribute('role', 'img');
    stars.setAttribute('aria-label', review.rating + ' out of 5 stars');
    stars.textContent = star.repeat(review.rating);

    const quote = document.createElement('blockquote');
    quote.className = 'feedback-quote';
    quote.textContent = review.quote;

    const author = document.createElement('div');
    author.className = 'feedback-author';

    const avatar = document.createElement('img');
    avatar.className = 'feedback-avatar';
    avatar.src = review.image;
    avatar.alt = '';
    avatar.loading = 'lazy';
    avatar.decoding = 'async';

    const authorCopy = document.createElement('div');
    authorCopy.className = 'feedback-author-copy';

    const name = document.createElement('span');
    name.className = 'feedback-author-name';
    name.textContent = review.name;

    const role = document.createElement('span');
    role.className = 'feedback-author-role';
    role.textContent = review.role;

    cardTop.append(label, stars);
    authorCopy.append(name, role);
    author.append(avatar, authorCopy);
    card.append(cardTop, quote, author);
    fragment.appendChild(card);
  });

  grid.replaceChildren(fragment);
  grid.setAttribute('aria-busy', 'false');
  count.textContent = String(reviews.length).padStart(2, '0') + ' testimonials';
  average.textContent = averageRating.toFixed(1);
  summaryCopy.textContent = 'Based on ' + reviews.length + ' client testimonials';

  const progressBar = document.getElementById('bar');
  if (progressBar) {
    const updateProgress = function () {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      progressBar.style.width = Math.min(progress, 100) + '%';
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }
})();
