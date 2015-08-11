var Router = Backbone.Router.extend({
    routes: {
        "": "index"
    },
    
    initialize: function() {
        this.index();
    },

    index: function() {

        Advertising.Cache.campaigns = new Advertising.Collections.Campaigns();

        Advertising.Cache.campaigns.fetch({
            'success': function(collection, response, options){
                collection.trigger('fetched');
            }
        });

        var campaignView = new Advertising.Views.Campaign({
            collection: Advertising.Cache.campaigns
        });

        $('#app').html(campaignView.el);

    }
});

$(function(){
    Advertising.router = new Router();
    Backbone.history.start({pushState: true});
});
