Publicidad.models.Ad = Backbone.Model.extend({
    defaults:{
        'anuncioId': null,
        'title': null,
        'firstLine': null,
        'secondLine': null,
        'url': null,
        'visibleUrl': null,
        'cpcMax': null,
        'cpcProm': null,
        'category': null,
        'clics': null,
        'prints': null,
        'ctr': null,
        'budget': null,
        'parentCampaign': null,
        'estate': null
    }
});
