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

/*CLIENT LOGOS*/
(function () {
    var section = document.getElementById('client-strip');
    if (!section) return;

    var viewport = section.querySelector('.client-strip-viewport');
    var track = section.querySelector('.client-strip-track');
    var group = track && track.querySelector('.client-strip-group');
    if (!viewport || !group || !group.children.length) return;

    var originalItems = Array.prototype.slice.call(group.children);
    var resizeFrame = 0;

    function buildMarquee() {
        while (group.children.length > originalItems.length) {
            group.removeChild(group.lastElementChild);
        }

        var oldCopy = track.querySelector('[data-client-strip-copy]');
        if (oldCopy) track.removeChild(oldCopy);

        var baseWidth = group.scrollWidth;
        var itemIndex = 0;
        while (group.scrollWidth < viewport.clientWidth + baseWidth) {
            var item = originalItems[itemIndex % originalItems.length].cloneNode(true);
            var image = item.querySelector('img');
            item.setAttribute('aria-hidden', 'true');
            if (image) image.alt = '';
            group.appendChild(item);
            itemIndex += 1;
        }

        var copy = group.cloneNode(true);
        var copyImages = copy.querySelectorAll('img');
        copy.setAttribute('aria-hidden', 'true');
        copy.setAttribute('data-client-strip-copy', '');
        for (var i = 0; i < copyImages.length; i += 1) {
            copyImages[i].alt = '';
        }
        track.appendChild(copy);
    }

    buildMarquee();
    window.addEventListener('resize', function () {
        if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(function () {
            resizeFrame = 0;
            buildMarquee();
        });
    });
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