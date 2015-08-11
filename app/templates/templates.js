this["__templates"] = this["__templates"] || {};
this["__templates"]["campaignModify"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<td>\n    <input id=\"name\" class=\"readonly-element\" type=\"text\" name=\"name\" value=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" readonly=\"readonly\">\n</td>\n<td>\n    <input id=\"dailyBudget\" class=\"readonly-element\" type=\"text\" name=\"dailyBudget\" value=\""
    + alias3(((helper = (helper = helpers.dailyBudget || (depth0 != null ? depth0.dailyBudget : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"dailyBudget","hash":{},"data":data}) : helper)))
    + "\" readonly=\"readonly\">\n</td>\n<td>\n    "
    + alias3(((helper = (helper = helpers.startingDate || (depth0 != null ? depth0.startingDate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"startingDate","hash":{},"data":data}) : helper)))
    + "\n</td>\n<td>\n    <input id=\"endingDate\" class=\"readonly-element\" type=\"text\" name=\"endingDate\" value=\""
    + alias3(((helper = (helper = helpers.endingDate || (depth0 != null ? depth0.endingDate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"endingDate","hash":{},"data":data}) : helper)))
    + "\" readonly=\"readonly\">\n</td>\n<td>\n    "
    + alias3(((helper = (helper = helpers.cpcProm || (depth0 != null ? depth0.cpcProm : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cpcProm","hash":{},"data":data}) : helper)))
    + "\n</td>\n<td>\n    "
    + alias3(((helper = (helper = helpers.clics || (depth0 != null ? depth0.clics : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"clics","hash":{},"data":data}) : helper)))
    + "\n</td>\n<td>\n    "
    + alias3(((helper = (helper = helpers.prints || (depth0 != null ? depth0.prints : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"prints","hash":{},"data":data}) : helper)))
    + "\n</td>\n<td>\n    "
    + alias3(((helper = (helper = helpers.ctr || (depth0 != null ? depth0.ctr : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"ctr","hash":{},"data":data}) : helper)))
    + "\n</td>\n<td>\n    "
    + alias3(((helper = (helper = helpers.budget || (depth0 != null ? depth0.budget : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"budget","hash":{},"data":data}) : helper)))
    + "\n</td>\n<td>\n    <input id=\"estate\" class=\"readonly-element\" type=\"text\" name=\"estate\" value=\""
    + alias3(((helper = (helper = helpers.estate || (depth0 != null ? depth0.estate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"estate","hash":{},"data":data}) : helper)))
    + "\" readonly=\"readonly\">\n</td>\n<td class=\"modify\">\n    <input type=\"button\" value=\"Modificar\" class=\"ch-btn ch-btn-small\"  data-js=\"modifyBtn\">\n</td>\n<td class=\"save\">\n    <input type=\"button\" value=\"Guardar\" class=\"ch-btn ch-btn-small\"  data-js=\"saveBtn\">\n</td>\n<td class=\"delete\">\n    <div class=\"icon\" role=\"button\" data-js=\"deleteBtn\">\n      <div class=\"lid\"></div>\n      <div class=\"lidcap\"></div>\n      <div class=\"bin\"></div>\n    </div>\n</td>\n";
},"useData":true});
this["__templates"]["tableCampaign"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<caption>Administrador de Campañas</caption>\n<thead>\n    <tr>\n        <th class=\"medium2-col\">\n            Name\n        </th>\n        <th class=\"medium-col\">\n            Daily budget\n        </th>\n        <th class=\"medium-col\">\n            Starting Date\n        </th>\n        <th class=\"medium-col\">\n            Ending date\n        </th>\n        <th class=\"small-col\">\n            CPC\n        </th>\n        <th class=\"small-col\">\n            Clics\n        </th>\n        <th class=\"small-col\">\n            Prints\n        </th>\n        <th class=\"small-col\">\n            CTR\n        </th>\n        <th class=\"small-col\">\n            Budget\n        </th>\n        <th class=\"medium-col\">\n            State\n        </th>\n        <th class=\"medium-col\">\n            Acción\n        </th>\n        <th class=\"small-col\">\n            Delete\n        </th>\n    </tr>\n</thead>\n<tbody></tbody>\n<tfoot>\n    <tr>\n        <td colspan=\"12\">\n            <input id=\"newAddRow\" type=\"button\" value=\"Agregar\" class=\"ch-btn ch-btn-small\" data-js=\"addBtn\">\n        </td>\n    </tr>\n</tfoot>\n";
},"useData":true});