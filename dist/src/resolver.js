"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Proton_1 = require("./Proton");
var value = null;
var Resolver = /** @class */ (function (_super) {
    __extends(Resolver, _super);
    function Resolver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Resolver.prototype.value = function () {
        var Value = this.props.Value;
        return attr = { this: .attr };
        model = { this: .model } /  >
        ;
    };
    Resolver.prototype.edit = function () {
        var Edit = this.props.Edit;
        return attr = { this: .attr };
        model = { this: .model } /  >
        ;
    };
    Resolver.prototype.query = function (variables) {
        return this.model.controller.gqlAttribute({
            client: this.model.controller.client(),
            action: this.props.attr,
            variables: variables
        });
    };
    return Resolver;
}(Proton_1.default));
var resolver = function (_a) {
    var endpoint = _a.endpoint, model = _a.model, attr = _a.attr, Value = _a.Value, Edit = _a.Edit;
    return new Resolver({
        model: model,
        attr: attr,
        Value: Value,
        Edit: Edit
    });
};
exports.default = resolver;
