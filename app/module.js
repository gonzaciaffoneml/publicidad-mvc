AdvertisingApp.module('PAds', function (PAds, AdvertisingApp, Backbone, Marionette, $, _) {
    var controller,
        Router;

        AdvertisingApp.PAds.Cache = {};
        AdvertisingApp.PAds.Cache.Collections = {};

    Router = Marionette.AppRouter.extend({
        'appRoutes': {
            '': 'index'
        }
    });

    controller = {
        index : function() {
            var campaigns,
                campaignView;

            campaigns = new AdvertisingApp.PAds.Collections.Campaigns();

            campaigns.fetch({
                'success': function(collection, response, options){
                    AdvertisingApp.PAds.Cache.Collections.campaigns = _.extend({}, collection);
                }
            });

            campaignView = new AdvertisingApp.PAds.Views.Campaign({
                collection: campaigns
            });

            AdvertisingApp.mainRegion.show(campaignView);

        }
    };

    AdvertisingApp.onStart = function () {
        var router = new Router({
            controller: controller
        });
    };

});
