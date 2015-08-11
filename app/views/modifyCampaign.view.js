Advertising.Views.ModifyCampaign = Backbone.View.extend({

    tagName: 'tr',

    className: 'view-campaign',

    template: __templates.campaignModify,

    events: {
        'click [data-js="saveBtn"]': 'saveCampaign',
        'click [data-js="modifyBtn"]': 'modifyCampaign',
        'click [data-js="deleteBtn"]': 'deleteCampaign'
    },

    initialize: function (options) {
        this.isAdding = options.isAdding;
        this.render();
    },

    render: function () {

        this.$el.html(this.template(this.model.toJSON()));
        if (this.isAdding) {
            this.$el.addClass('modify-campaign ch-hide');
            this.$el.find('.readonly-element').attr('readonly', false);
            this.$el.fadeIn("slow");
        }
    },

    saveCampaign: function() {
        that = this;
        this.$el.hide();
        this.model.set({
            name: this.$('#name').val(),
            dailyBudget: this.$('#dailyBudget').val(),
            endingDate: this.$('#endingDate').val(),
            estate: this.$('#estate').val()
        });
        this.model.save();
        that.$el.find('input').removeClass('error-border');
        if (this.model.validationError) {
          this.$el.addClass('error-color');
          $.each(this.model.validationError, function(index, value) {
              var element = '#' + value;
              that.$el.find(element).addClass('error-border');
          });
      } else {
          this.$el.removeClass('error-color');
          this.$el.removeClass('modify-campaign');
          this.$el.find('.readonly-element').attr('readonly', true);
      }
        this.$el.fadeIn("slow");
    },

    modifyCampaign: function() {
        this.$el.hide();
        this.$el.addClass('modify-campaign');
        this.$el.find('.readonly-element').attr('readonly', false);
        this.trigger('onModify');
        this.$el.fadeIn("slow");
    },

    deleteCampaign: function() {
        that = this;
        this.$el.fadeOut();
        this.model.destroy({
            success: function(){
                that.$el.remove();
            },
            error: function(){
                that.$el.fadeIn();
            }
        });


    }
});
