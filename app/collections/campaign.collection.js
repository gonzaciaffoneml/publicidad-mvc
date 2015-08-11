'use strict';

AdvertisingApp.module('PAds.Collections', function (Collections, AdvertisingApp, Backbone, Marionette, $, _) {
    Collections.Campaigns = Backbone.Collection.extend({
        'url': '/campaigns',
        model: AdvertisingApp.PAds.Models.Campaign
    });
});
