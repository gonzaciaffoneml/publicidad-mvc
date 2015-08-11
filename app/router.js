var Router = Backbone.Router.extend({
    routes: {
        "": "index"
    },

    index: function() {

        campaignsCollections = new Advertising.Collections.Campaigns();

        campaignsCollections.fetch({
            'success': function(collection, response, options){
                collection.trigger('fetched');
            }
        });

        var campaignView = new Advertising.Views.Campaign({
            collection: campaignsCollections
        });

        $('#app').html(campaignView.el);

    }
});

$(function(){
    Advertising.router = new Router();
    Backbone.history.start({pushState: true});
});
