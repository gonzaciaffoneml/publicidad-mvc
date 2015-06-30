// Improve the #nav-footer-access-content behavior by scrolling to
// the bottom when users open this section
(function (win, doc) {
    if (!win.addEventListener) { return; }

    function scrollTo(scrollDuration) {
        var scrollInterval = setInterval(function () {
            // stop animation when window is scrolled to bottom
            if ((win.innerHeight + win.scrollY) >= doc.body.offsetHeight) {
                clearInterval(scrollInterval);
                // move scroll 20px each time
            } else {
                win.scrollBy(0, 20);
            }
        }, 15);
    }

    // User interaction
    doc.getElementById('nav-footer-access-switch').addEventListener('change', function (ev) {
        if (!this.checked) {
            setTimeout(function () {
                scrollTo(400);
            }, 200);
        }
    });
}(window, document));
