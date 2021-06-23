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
var Atom = /** @class */ (function (_super) {
    __extends(Atom, _super);
    function Atom(props) {
        var _this = _super.call(this, props) || this;
        if (props.molecule)
            return _this;
        if (Object.keys(_this.state).length !== 1) {
            console.error("↳ ⚛ Atoms can only have once piece of state. ⚛");
            console.log("dev", _this);
        }
        return _this;
    }
    return Atom;
}(Proton_1.default));
exports.default = Atom;
