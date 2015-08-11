Advertising.Views.Campaign = Backbone.View.extend({

    tagName: 'table',

    className: 'campaigns ch-datagrid',

    template: __templates.tableCampaign,

    events: {
        'click [data-js="addBtn"]': 'addCampaign'
    },

    initialize: function () {
        var that = this;

        this.collection.on('fetched', function() {
            that.render();
        });
    },

    render: function () {

        var  that = this;

        this.$el.empty();

        this.$el.append(this.template());

        _.each(this.collection.models, function(model, i){

            var modifyCampaign = new Advertising.Views.ModifyCampaign({
                model: model,
                isEdit : false
            });

            that.$('tbody').append(modifyCampaign.el);

        });

    },

    addCampaign: function () {
        var newCampaign = new Advertising.Models.Campaign();
        var modifyCampaign = new Advertising.Views.ModifyCampaign({
            model: newCampaign,
            isAdding : true
        });
        this.collection.add(newCampaign);
        this.$('tbody').append(modifyCampaign.el);
    }

});
