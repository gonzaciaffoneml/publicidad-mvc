var Router = Backbone.Router.extend({
    routes: {
        "": "index"
        "createAd" : "createAd"
    },

    index: function() {
    }

    createAd: function() {
    }
});

$(function(){
    Advertising.router = new Router();
    Backbone.history.start({pushState: true});
});
