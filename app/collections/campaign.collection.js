AdvertisingApp.module('PAds.Collections', function (Collections, AdvertisingApp, Backbone, Marionette, $, _) {
    Collections.Campaigns = Backbone.Collection.extend({
        'url': '/campaigns',
        model: AdvertisingApp.PAds.Models.Campaign,
        initialize: function(){
          this.sortVar = {
              sortBy : "dailyBudget",
              sortOrder : "asc"
          };
        },

        comparator: function(collection){
          var that = this;
          if (that.sortVar.sortOrder === "asc") {
              return (collection.get(that.sortVar.sortBy));
          } else {
              return -(collection.get(that.sortVar.sortBy));
          }
        }
    });
});
