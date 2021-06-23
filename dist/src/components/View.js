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
var React = require("react");
var Value = /** @class */ (function (_super) {
    __extends(Value, _super);
    function Value(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            attr: _this.props.attr,
            model: _this.props.model
        };
        return _this;
    }
    Value.prototype.render = function () {
        return ({ this: .props.attr } < /span>);
    };
    return Value;
}(React.Component));
