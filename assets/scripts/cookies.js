(function() {
  const COOKIE_NAME = 'makyneta_cookies_accepted';
  const COOKIE_EXPIRY = 180; // dias
  const GA_MEASUREMENT_ID = 'G-JBSGBCL6R5';
  const GTM_CONTAINER_ID = 'GTM-KMC9L3R8';
  const isPortuguese = document.documentElement.lang.toLowerCase().startsWith('pt');
  let analyticsLoaded = false;

  function getCookieConsent() {
    const cookie = document.cookie.split(';').map(value => value.trim())
      .find(value => value.indexOf(COOKIE_NAME + '=') === 0);

    if (!cookie) return null;
    return cookie.substring(COOKIE_NAME.length + 1) === 'true';
  }

  // Cria o banner de consentimento.
  function createBanner() {
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', isPortuguese ? 'Preferências de cookies' : 'Cookie preferences');
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
            <p class="ck-eyebrow">${isPortuguese ? 'Preferências de privacidade' : 'Privacy preferences'}</p>
            <h2 class="ck-title">${isPortuguese ? 'A sua privacidade importa' : 'Your privacy matters'}</h2>
          </div>
        </div>
        <p class="ck-text">
          ${isPortuguese ? 'Utilizamos cookies essenciais para manter este site a funcionar. Com a sua autorização, os cookies analíticos ajudam-nos a compreender como o site é utilizado.' : 'We use essential cookies to keep this website working. With your permission, analytics cookies help us understand how the site is used.'}
        </p>
        <a class="ck-link" href="/legal/cookies-policy"><span aria-hidden="true">&#8599;</span> ${isPortuguese ? 'Consulte a nossa política de cookies' : 'Read our cookie policy'}</a>
      </div>
      <div class="ck-status" id="cookie-status" aria-live="polite">
        <span class="dot"></span> ${isPortuguese ? 'A sua escolha fica guardada durante 6 meses' : 'Your choice is saved for 6 months'}
      </div>
      <div class="ck-actions">
        <button id="cookie-reject" class="ck-btn reject">${isPortuguese ? 'Apenas essenciais' : 'Only essential'}</button>
        <button id="cookie-accept" class="ck-btn accept">${isPortuguese ? 'Aceitar todos' : 'Accept all'}</button>
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
      status.innerHTML = '<span class="dot"></span> ' + (isPortuguese ? 'A sua escolha foi guardada' : 'Your choice has been saved');
    }

    if (accepted) initializeAnalytics();
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

  // Carrega Google Analytics e Google Tag Manager
  function initializeAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(gaScript);

    const gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_CONTAINER_ID;
    document.head.appendChild(gtmScript);
  }

  // Inicia na página com verificação melhorada
  function init() {
    const consent = getCookieConsent();
    if (consent === true) {
      initializeAnalytics();
    } else if (consent === null) {
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