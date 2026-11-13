(function () {
  const form = document.getElementById('feedback-form');
  const status = document.getElementById('form-status');
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

  if (!form || !status) return;

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const submitLabel = submitButton && submitButton.querySelector('span');
    const originalLabel = submitLabel ? submitLabel.textContent : '';

    if (submitButton) {
      submitButton.disabled = true;
      if (submitLabel) submitLabel.textContent = 'A enviar…';
    }

    status.hidden = true;
    status.classList.remove('error');

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        throw new Error('O serviço não conseguiu receber a avaliação.');
      }

      form.reset();
      form.hidden = true;
      status.textContent = 'Obrigado por partilhares a tua experiência. A tua avaliação foi enviada com sucesso.';
      status.hidden = false;
    } catch (error) {
      status.textContent = 'Não foi possível enviar a avaliação. Verifica a tua ligação e tenta novamente.';
      status.classList.add('error');
      status.hidden = false;
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        if (submitLabel) submitLabel.textContent = originalLabel;
      }
    }
  });
})();
