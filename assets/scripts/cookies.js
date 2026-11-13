(function() {
  const COOKIE_NAME = 'makyneta_cookies_accepted';
  const COOKIE_EXPIRY = 365; // dias

  // Verifica se o user já aceitou (melhoria)
  function hasCookieConsent() {
    const cookieString = document.cookie;
    const name = COOKIE_NAME + '=';
    const decodedCookie = decodeURIComponent(cookieString);
    const cookieArray = decodedCookie.split(';');
    
    for(let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        const value = cookie.substring(name.length, cookie.length);
        return value === 'true';
      }
    }
    return false;
  }

  // Cria o banner de consentimento.
  function createBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie preferences');
    banner.innerHTML = `
      <div class="ck-body">
        <div class="ck-heading">
          <span class="ck-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.2 13A8.5 8.5 0 1 1 11 3.8 6.5 6.5 0 0 0 20.2 13Z"></path>
              <path d="M8 10h.01M12 14h.01M7 15h.01"></path>
            </svg>
          </span>
          <div>
            <p class="ck-eyebrow">Privacy preferences</p>
            <h2 class="ck-title">Your privacy matters</h2>
          </div>
        </div>
        <p class="ck-text">
          We use essential cookies to keep this website working. With your permission, analytics cookies help us understand how the site is used.
        </p>
        <a class="ck-link" href="/legal/cookies-policy"><span aria-hidden="true">&#8599;</span> Read our cookie policy</a>
      </div>
      <div class="ck-status" id="cookie-status" aria-live="polite">
        <span class="dot"></span> Your choice is saved for 12 months
      </div>
      <div class="ck-actions">
        <button id="cookie-reject" class="ck-btn reject">Only essential</button>
        <button id="cookie-accept" class="ck-btn accept">Accept all</button>
      </div>
    `;
    document.body.appendChild(banner);

    // Event listeners
    document.getElementById('cookie-accept').addEventListener('click', acceptCookies);
    document.getElementById('cookie-reject').addEventListener('click', rejectCookies);
  }

  // Regista a decisão do utilizador
  function decide(accepted) {
    setCookie(COOKIE_NAME, accepted ? 'true' : 'false', COOKIE_EXPIRY);

    const status = document.getElementById('cookie-status');
    if (status) {
      status.classList.add('saved');
      status.innerHTML = '<span class="dot"></span> Your choice has been saved';
    }

    if (accepted) loadGoogleAnalytics();
    setTimeout(removeBanner, 700);
  }

  // Aceita cookies e inicia Google Analytics
  function acceptCookies() {
    decide(true);
  }

  // Rejeita cookies
  function rejectCookies() {
    decide(false);
  }

  // Define cookie com configuração melhorada
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    const domain = window.location.hostname;
    document.cookie = `${name}=${value};${expires};path=/;domain=${domain};SameSite=Lax;Secure`;
  }

  // Remove banner
  function removeBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.add('hide');
      setTimeout(() => banner.remove(), 400);
    }
  }

  // Carrega Google Analytics
  function loadGoogleAnalytics() {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-YOUR_MEASUREMENT_ID';
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-YOUR_MEASUREMENT_ID', {
      'anonymize_ip': true,
      'allow_google_signals': false,
      'allow_ad_personalization_signals': false
    });
  }

  // Inicia na página com verificação melhorada
  function init() {
    if (hasCookieConsent()) {
      // Cookie já existe e é 'true', carrega GA
      loadGoogleAnalytics();
    } else {
      // Cookie não existe ou é 'false', mostra banner
      createBanner();
    }
  }

  // Espera o DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();