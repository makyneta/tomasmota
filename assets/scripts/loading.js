(function(){
  var LO = document.getElementById('loader-overlay');
  if (!LO) return;

  if (document.readyState === 'complete') return;

  var showTimer = window.setTimeout(function(){
    LO.classList.add('is-visible');
  }, 200);

  window.addEventListener('load', function(){
    window.clearTimeout(showTimer);
    LO.classList.remove('is-visible');
  });
})();