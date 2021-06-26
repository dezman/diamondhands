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
var store_1 = require("./store");
// Store <-> client state
var Muon = /** @class */ (function (_super) {
    __extends(Muon, _super);
    function Muon(props) {
        var _this = _super.call(this, props) || this;
        _this.onChange = function (e) {
            var newStoreState = {};
            var newKeyValue = e.target.value;
            newStoreState["" + _this.storeKey] = newKeyValue;
            store_1.default.set(newStoreState);
            _this.setState({ value: newKeyValue });
        };
        _this.refresh = function () {
            if (!_this.mounted)
                return;
            console.log("debug", "🌊 Muon refresh:", _this.quark());
            _this.forceUpdate();
        };
        _this.storeValue = function () {
            var value = store_1.default.get(_this.storeKey);
            if (_this.attr) {
                console.log("debug", "\uD83E\uDDEC Quark attr:", _this.attr);
                if (value) {
                    console.log("debug", "\uD83E\uDDE9", "Quark value: " + value);
                }
                else {
                    if (_this.isFetching())
                        console.log("dev", "\uD83E\uDDE9", "Fetching...");
                }
            }
            return value || "";
        };
        _this.model = props.model;
        _this.attr = props.attr;
        _this.storeKey = props.storeKey || _this.model.getKey(_this.attr);
        _this.endpoint = props.endpoint;
        store_1.default.onUpdate(_this.refresh);
        _this.reactSetState = _this.setState;
        _this.setState = function () { return _this.diamondHandsSetState.apply(_this, arguments); };
        _this.state = {
            value: "",
        };
        return _this;
    }
    Muon.prototype.quark = function () {
        // return if quark is already set
        if (this.state.value.length)
            return this.state.value;
        if (!this.storeKey) {
            console.log("dev", "\uD83D\uDDDD You need a store key in your component to get a value.");
            console.log("dev", "\u21B3", this);
        }
        return this.storeValue();
    };
    Muon.prototype.componentDidMount = function () {
        this.mounted = true;
    };
    Muon.prototype.componentWillUnmount = function () {
        this.mounted = false;
    };
    Muon.prototype.isFetching = function () {
        return this.proton && !this.isFinishedReq();
    };
    // private
    Muon.prototype.diamondHandsSetState = function (state) {
        if (!this.mounted)
            return;
        this.reactSetState(state);
    };
    return Muon;
}(React.Component));
exports.default = Muon;
