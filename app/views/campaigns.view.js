//'use strict';

AdvertisingApp.module('PAds.Views', function (Views, AdvertisingApp, Backbone, Marionette, $, _) {

    Views.Campaign = Marionette.CompositeView.extend({

      childViewContainer: "tbody",

      reorderOnSort: true,

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
          deleteSelected: '[data-js="deleteSelected"]',
          sortBySelect: '[data-js="sortBy"]',
          orderSelect: '[data-js="order"]',
          searchName : '[data-js="searchName"]',
          tbody: 'tbody'
      },

      onRender: function () {
           this.ui.sortBySelect.val(this.collection.sortVar.sortBy);
           this.ui.orderSelect.val(this.collection.sortVar.sortOrder);
      },

      events: {
          'click @ui.addBtn': 'addCampaign',
          'click @ui.checkAll': 'checkRows',
          'click @ui.modifySelected': 'modifySelected',
          'click @ui.saveSelected': 'saveSelected',
          'click @ui.deleteSelected': 'deleteSelected',
          'change @ui.sortBySelect': 'sort',
          'change @ui.orderSelect': 'sort',
          'keyup @ui.searchName': 'newFilter'
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

        deleteSelected : function () {
            AdvertisingApp.trigger('deleteSelected');
        },

        sort : function () {
            this.collection.sortVar.sortBy = this.ui.sortBySelect.val();
            this.collection.sortVar.sortOrder = this.ui.orderSelect.val();
            this.collection.sort(this.collection.comparator);
        },

      newFilter : function () {
          that = this;
           _.each(that.children._views,function(v){
               that.ui.tbody.append(v.$el);
               });
          _.each(that.children._views,function(v){
              if(v.model.attributes.name.indexOf(that.ui.searchName.val()) <= -1){
                 v.$el.remove();
              }
            });
      }
    });
});
