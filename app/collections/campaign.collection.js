AdvertisingApp.module('PAds.Collections', function (Collections, AdvertisingApp, Backbone, Marionette, $, _) {
    Collections.Campaigns = Backbone.Collection.extend({
        'url': '/campaigns',
        model: AdvertisingApp.PAds.Models.Campaign,
        initialize: function(){
          this.sortVar = {
              sortBy : "dailyBudget",
              sortOrder : "DESC"
          };
        },

        comparator: function(collection){
          var that = this;
          if (that.sortVar.sortOrder === "DESC") {
              return (collection.get(that.sortVar.sortBy));
          } else {
              return -(collection.get(that.sortVar.sortBy));
          }
      }
    });
});
