/*HERO SECTION*/
(function () {
    var clock = document.getElementById('mk-hero-clock');
    if (!clock) return;
    function updateLeiriaTime() {
        clock.textContent = 'LEIRIA — ' + new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Europe/Lisbon', hour: '2-digit', minute: '2-digit', hour12: false
        }).format(new Date());
    }
    updateLeiriaTime();
    window.setInterval(updateLeiriaTime, 60000);
})();

/*about section observer*/
(function () {
    var about = document.getElementById('about');
    if (!about || !('IntersectionObserver' in window)) return;
    about.classList.add('about-pending');
    var observer = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        about.classList.remove('about-pending');
        about.classList.add('about-visible');
        observer.disconnect();
    }, { threshold: 0.12 });
    observer.observe(about);
})();