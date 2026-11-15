// Atualiza todos os elementos com a classe 'year'
document.querySelectorAll('.year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

(function() {
  if (!document.querySelector('link[href="/assets/styles/cookies.css"]')) {
    const cookieStyles = document.createElement('link');
    cookieStyles.rel = 'stylesheet';
    cookieStyles.href = '/assets/styles/cookies.css';
    document.head.appendChild(cookieStyles);
  }

  if (!document.querySelector('script[src="/assets/scripts/cookies.js"]')) {
    const cookieConsent = document.createElement('script');
    cookieConsent.src = '/assets/scripts/cookies.js';
    document.head.appendChild(cookieConsent);
  }
})();

var v = Date.now();

fetch("/assets/ui/header/main.html?v=" + v)
  .then(function(r) { return r.text(); })
  .then(function(data) {
    document.getElementById("header").innerHTML = data;
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/styles/header.css?v=" + v;
    document.head.appendChild(link);
    var script = document.createElement("script");
    script.src = "/assets/scripts/header.js?v=" + v;
    document.body.appendChild(script);
  });


//
// Footer
fetch("/assets/ui/footer/main.html?v=" + v)
  .then(response => response.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;

    // CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/styles/footer.css?v=" + v;
    document.head.appendChild(link);

    // JS
    const script = document.createElement("script");
    script.src = "/assets/scripts/footer.js?v=" + v;
    document.body.appendChild(script);
  });