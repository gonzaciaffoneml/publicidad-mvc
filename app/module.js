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

            AdvertisingApp.campaigns = new AdvertisingApp.PAds.Collections.Campaigns();

            AdvertisingApp.campaigns.fetch({
                'success': function(collection, response, options){
                    collection.trigger('fetched');
                }
            });

            var campaignView = new Advertising.Views.Campaign({
                collection: AdvertisingApp.campaigns;
            });

            AdvertisingApp.mainRegion.show(campaignView);

        }
    };

    PAds.onStart = function () {
        var router = new Router({
            controller: controller
        });
    };

};
