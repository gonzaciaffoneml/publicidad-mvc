AdvertisingApp.module('PAds.Models', function (Models, AdvertisingApp, Backbone, Marionette, $, _) {

    Models.Campaign = Backbone.Model.extend({
        validate: function(attrs, options) {
            var errorFields = [];
            $.each(attrs, function(index, value) {
                if (value === ''){
                    errorFields.push(index);
                }
            });
            if (errorFields.length > 0) {
                return errorFields;
            }
        },
        defaults:{
            'id': null,
            'name': null,
            'dailyBudget': 0,
            'startingDate': function () {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1;

                var yyyy = today.getFullYear();
                if(dd<10){
                    dd='0'+dd;
                }
                if(mm<10){
                    mm='0'+mm;
                }
                var formatToday = dd+'/'+mm+'/'+yyyy;

                return formatToday;
            },
            'endingDate': null,
            'cpcProm': 0,
            'clics': 0,
            'prints': 0,
            'ctr': 0,
            'budget': 0,
            'estate': null
        }
    });

});
