// Improve the #nav-header-menu behavior by closing when users click outside checkbox.
// Deprecated in 0.2.0
(function (doc) {
    var input = doc.getElementById('nav-header-user-switch');
    // Only works when a user menu exists (for logged users)
    if (!input || !window.addEventListener) return;
    // Listen for every click on tag "html"
    // The support for IE8+ was dropped because of lack of support of :checked pseudo-selector
    doc.documentElement.addEventListener('click', function (ev) {
        // Avoid to close if I click on the trigger. In that case, it will use CSS
        if (input.checked && ev.target !== input && ev.target !== input.previousElementSibling) {
            input.checked = false;
        }
    });
}(document));
