// App.js
;(function (win) {

    // Check if app its launched
    if (win.AdvertisingApp) { return; }

    // Create app
    var AdvertisingApp = new Backbone.Marionette.Application();

    AdvertisingApp.addRegions({
        'mainRegion': '#app'
    });

    // Subscribe to "start" application event
    AdvertisingApp.on('start', function() {
        Backbone.history.start();
    });

    // Export Application
    win.AdvertisingApp = AdvertisingApp;

    // Start the AdvertisingApp app
    $(function() {
        // This fire "start" application event
        AdvertisingApp.start();
    });
}(window));
