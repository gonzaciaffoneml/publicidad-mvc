Publicidad.models.Campaign = Backbone.Model.extend({
    defaults:{
        'campaignId': null,
        'name': null,
        'dailyBudget': null,
        'startingDate': null,
        'endingDate': null,
        'cpcProm': null,
        'clics': null,
        'prints': null,
        'ctr': null,
        'budget': null,
        'estate': null,
        'ads':[]
    }
});
