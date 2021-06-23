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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDiamondhandsClients = void 0;
var Controller_1 = require("./Controller");
var diamondhandsClients = {};
var setDiamondhandsClients = function (obj) {
    diamondhandsClients = obj;
};
exports.setDiamondhandsClients = setDiamondhandsClients;
var ApolloController = /** @class */ (function (_super) {
    __extends(ApolloController, _super);
    function ApolloController() {
        var _this = _super.call(this) || this;
        _this.baseQueryOptions = {
            errorPolicy: "none",
            fetchPolicy: "cache-first",
            notifyOnNetworkStatusChange: true,
            returnPartialData: false,
        };
        _this.gqlAttribute = function (_a) {
            var client = _a.client, action = _a.action, variables = _a.variables;
            if (!_this.controllerActionValid(action))
                return;
            console.log("dev", "🎛 Controller#gqlAttribute", "\uD83E\uDEA1 " + action);
            var queryOptions = _this.queryOptions(action, variables);
            var promise = new Promise(function (resolve, reject) {
                // GraphQL fetch
                return diamondhandsClients[client].query(queryOptions)
                    .then(function (res) { return _this.handleApolloSuccess(res, resolve); })
                    .catch(function (res) { return _this.handleApolloError(res, reject); });
            });
            return promise;
        };
        // private
        _this.handleApolloError = function (e, reject) {
            if (e.message.match("authentication")) {
                alert("🪵 Please log in to your server.");
            }
            console.error("⛔️ Error:", e);
            reject(e);
        };
        _this.handleApolloSuccess = function (res, resolve) {
            console.log("dev", "✅ Success:", res);
            resolve(res.data);
            _this._finishStack.forEach(function (f) {
                f(res.data);
            });
        };
        return _this;
    }
    ApolloController.prototype.queryOptions = function (action, variables) {
        if (variables)
            console.log("dev", "🔮 Query variables:", variables);
        return __assign(__assign({}, this.baseQueryOptions), { query: this.requestBody(action), variables: variables, operationName: action });
    };
    return ApolloController;
}(Controller_1.default));
exports.default = ApolloController;
