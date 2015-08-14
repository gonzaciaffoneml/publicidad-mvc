//'use strict';

AdvertisingApp.module('PAds.Views', function (Views, AdvertisingApp, Backbone, Marionette, $, _) {

    Views.Campaign = Marionette.CompositeView.extend({

      childViewContainer: "tbody",


      tagName: 'div',

      className: '',

      template: __templates.tableCampaign,

      childView: Views.ModifyCampaign,

      ui: {
          addBtn: '[data-js="addBtn"]',
          addInput: '[data-js="addInput"]',
          checkAll: '[data-js="checkAll"]',
          modifySelected: '[data-js="modifySelected"]',
          saveSelected: '[data-js="saveSelected"]',
          sortBySelect: '[data-js="sortBy"]',
          orderSelect: '[data-js="order"]'
      },

      events: {
          'click @ui.addBtn': 'addCampaign',
          'click @ui.checkAll': 'checkRows',
          'click @ui.modifySelected': 'modifySelected',
          'click @ui.saveSelected': 'saveSelected',
          'change @ui.sortBySelect': 'sort',
          'change @ui.orderSelect': 'sort'
      },

        addCampaign: function () {
            for (i = 1; i <= this.ui.addInput.val(); i++) {
              var newCampaign = new AdvertisingApp.PAds.Models.Campaign();
              this.collection.add(newCampaign);
            }
        },

        checkRows : function () {
            if($(this.ui.checkAll).prop('checked')){
                $('tbody tr td input[type="checkbox"]').each(function(){
                    $(this).prop('checked', true);
                });
            }else{
                $('tbody tr td input[type="checkbox"]').each(function(){
                    $(this).prop('checked', false);
                });
            }
        },

        modifySelected : function () {
            AdvertisingApp.trigger('modifySelected');
        },

        saveSelected : function () {
            AdvertisingApp.trigger('saveSelected');
        },

        sort : function () {
            this.collection.sortVar.sortBy = this.ui.sortBySelect.val();
            this.collection.sortVar.sortOrder = this.ui.orderSelect.val();
            console.log(this.ui.sortBySelect.val());
            console.log(this.ui.orderSelect.val());
            this.collection.sort();
        }
    });
});
