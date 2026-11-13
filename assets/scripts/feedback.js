(function () {
  const reviews = [
    {
      name: 'Esdras Lopes',
      role: 'Programmer & Musician',
      rating: 5,
      image: '/assets/images/clients/esdras-lopes.webp',
      quote: 'Very good, it was done in just a few hours and turned out really well.'
    },
    {
      name: 'Victor Campos',
      role: 'Influencer',
      rating: 5,
      image: '/assets/images/clients/victor-campos.webp',
      quote: 'Impeccable and extremely practical work, I trust it and recommend it!'
    },
    {
      name: 'Nicholas Moraes',
      role: 'Influencer & Musician',
      rating: 5,
      image: '/assets/images/clients/nicholas-moraes.webp',
      quote: 'Tomás made a very good job, beautiful, fast delivery and modern design on the site. He put all the correct information and left everything very well structured. I loved it!'
    },
    {
      name: 'Nicholas Simões',
      role: 'Photographer',
      rating: 5,
      image: '/assets/images/clients/nicholas-simoes.webp',
      quote: "Tomás, it's incredible!!! I had already imagined you were a really professional based on what you had shown of your website and your work. But I have no words to thank you. Thank you so much for the care and thank you so much for the opportunity. What you did for me is already going to be a difference and so much for my future work! I hope that in the future we have the opportunity to collaborate again, and this time I can repay you for this incredible work you did for me."
    },
    {
      name: 'Gabriel Sousa',
      role: 'Photographer',
      rating: 4,
      image: '/assets/images/clients/gabriel-sousa.webp',
      quote: "Tomás I loved the website it's on Instagram as a link and I'm just waiting for the account to grow so I can start doing what I want and I thank you for making this website."
    }
  ];

  const grid = document.getElementById('feedback-grid');
  const count = document.getElementById('feedback-count');
  const average = document.getElementById('feedback-average');
  const summaryCopy = document.getElementById('feedback-summary-copy');

  if (!grid || !count || !average || !summaryCopy) return;

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
