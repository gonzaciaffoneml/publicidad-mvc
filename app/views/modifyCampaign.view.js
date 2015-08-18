//'use strict';

AdvertisingApp.module('PAds.Views', function (Views, AdvertisingApp, Backbone, Marionette, $, _) {


    Views.ModifyCampaign = Marionette.ItemView.extend({

        tagName: "tr",

        template:  __templates.campaignModify,

        className: 'view-campaign',

        ui: {
            saveBtn: '[data-js="saveBtn"]',
            modifyBtn: '[data-js="modifyBtn"]',
            deleteBtn: '[data-js="deleteBtn"]'
        },

        events: {
            'click @ui.saveBtn': 'saveCampaign',
            'click @ui.modifyBtn': 'modifyCampaign',
            'click @ui.deleteBtn': 'deleteCampaign'
        },

        initialize: function(){
            this.listenTo(AdvertisingApp, "modifySelected", this.modifySelected);
            this.listenTo(AdvertisingApp, "saveSelected", this.saveSelected);
            this.listenTo(AdvertisingApp, "deleteSelected", this.deleteSelected);
          },

        onRender: function () {
            if (this.model.get('name') === null) {
                this.$el.addClass('modify-campaign ch-hide');
                this.$el.find('.readonly-element').attr('readonly', false);
                this.$el.fadeIn("slow");
                this.$(".checkbox").prop('checked', true);
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
        },

        modifySelected : function () {
             if(this.$(".checkbox").is(':checked')) {
                if (!this.$el.hasClass( "modify-campaign" )){
                    this.modifyCampaign();
                }
             }
        },

        saveSelected : function () {
            if(this.$(".checkbox").is(':checked')) {
                if (this.$el.hasClass( "modify-campaign" )){
                    this.saveCampaign();
                }
            }
        },

        deleteSelected : function () {
            if(this.$(".checkbox").is(':checked')) {
                this.deleteCampaign();
            }
        }

        });
});
