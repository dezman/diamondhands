"use strict";
// Validation logic
Object.defineProperty(exports, "__esModule", { value: true });
var resolver_1 = require("./resolver");
var Model = /** @class */ (function () {
    function Model(id) {
        var _this = this;
        // private
        this.generateResolver = function (_a) {
            var endpoint = _a.endpoint, attr = _a.attr, Value = _a.Value, Edit = _a.Edit;
            console.log("dev", "👀 Resolver for:", [_this.name].concat(arguments));
            _this[attr] = resolver_1.default({
                endpoint: endpoint,
                model: _this,
                attr: attr,
                Value: Value,
                Edit: Edit
            });
        };
        this.id = id;
        this.data = {};
        this.name = this.name();
        this.resolvers().forEach(this.generateResolver);
    }
    Model.prototype.hydrate = function (obj) {
        this.data = obj;
        return this;
    };
    Model.prototype.getKey = function (attr) {
        return this.name + "." + attr;
    };
    return Model;
}());
exports.default = Model;
