this["__templates"] = this["__templates"] || {};
this["__templates"]["campaign"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<tr>\n    <td><div>\n        "
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n    </td>\n    <td><div>\n        "
    + alias3(((helper = (helper = helpers.dailyBudget || (depth0 != null ? depth0.dailyBudget : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"dailyBudget","hash":{},"data":data}) : helper)))
    + "\n    </td>\n    <td><div>\n        "
    + alias3(((helper = (helper = helpers.startingDate || (depth0 != null ? depth0.startingDate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"startingDate","hash":{},"data":data}) : helper)))
    + "\n    </td>\n    <td><div>\n        "
    + alias3(((helper = (helper = helpers.endingDate || (depth0 != null ? depth0.endingDate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"endingDate","hash":{},"data":data}) : helper)))
    + "\n    </td>\n    <td><div>"
    + alias3(((helper = (helper = helpers.cpcProm || (depth0 != null ? depth0.cpcProm : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cpcProm","hash":{},"data":data}) : helper)))
    + "\n    </td>\n    <td><div>"
    + alias3(((helper = (helper = helpers.clics || (depth0 != null ? depth0.clics : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"clics","hash":{},"data":data}) : helper)))
    + "\n    </td>\n    <td><div>"
    + alias3(((helper = (helper = helpers.prints || (depth0 != null ? depth0.prints : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"prints","hash":{},"data":data}) : helper)))
    + "</td>\n    <td><div>"
    + alias3(((helper = (helper = helpers.ctr || (depth0 != null ? depth0.ctr : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"ctr","hash":{},"data":data}) : helper)))
    + "</td>\n    <td><div>"
    + alias3(((helper = (helper = helpers.budget || (depth0 != null ? depth0.budget : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"budget","hash":{},"data":data}) : helper)))
    + "</td>\n    <td><div>"
    + alias3(((helper = (helper = helpers.estate || (depth0 != null ? depth0.estate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"estate","hash":{},"data":data}) : helper)))
    + "</td>\n</tr>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"useData":true});