'use strict';

AdvertisingApp.module('PAds', function (PAds, AdvertisingApp, Backbone, Marionette, $, _) {
    var controller,
        Router;

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
                    // collection.trigger('fetched');
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
