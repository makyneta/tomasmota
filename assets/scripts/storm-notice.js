(function () {
  var notice = document.getElementById('storm-notice');
  if (!notice || typeof notice.showModal !== 'function') return;

  var closeButton = notice.querySelector('.storm-notice-close');
  if (!closeButton) return;

  closeButton.addEventListener('click', function () {
    notice.close();
  });

  notice.addEventListener('click', function (event) {
    if (event.target === notice) notice.close();
  });

  window.setTimeout(function () {
    notice.showModal();
  }, 2800);
})();
