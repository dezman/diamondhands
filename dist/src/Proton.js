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
var store_1 = require("./store");
var Muon_1 = require("./Muon");
// Server <-> client state
var _finishedRequests = [];
var Proton = /** @class */ (function (_super) {
    __extends(Proton, _super);
    function Proton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.accelerate = function () {
            if (_this.attr) {
                store_1.default.getFromServer(_this.model, _this.attr).then(_this.finishedReq);
            }
        };
        _this.onBlur = function () {
            // TODO: Save
        };
        _this.finishedReq = function () {
            _finishedRequests.push(_this);
        };
        return _this;
    }
    Proton.prototype.isFinishedReq = function () {
        return _.includes(_finishedRequests, this);
    };
    Proton.prototype.componentDidMount = function () {
        this.mounted = true;
        this.accelerate();
    };
    return Proton;
}(Muon_1.default));
exports.default = Proton;
