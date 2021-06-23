"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isomorphic_fetch_1 = require("isomorphic-fetch");
var store_1 = require("./store");
var Controller = /** @class */ (function () {
    function Controller() {
        var _this = this;
        this._finishStack = [];
        this.requestBody = function (action) {
            var body = _this[action]();
            if (body) {
                console.log("dev", "🌮 Request body:", body, _this);
            }
            else {
                console.error("🍽 Empty request body:", body, _this);
            }
            return body;
        };
        this.success = function (res) {
            console.log("debug", "✅ Success:", res);
            _this._finishStack.forEach(function (f) {
                f(res.data);
            });
            _this._finishStack = [];
            return res;
        };
        this.fail = function (res) {
            console.log("dev", "❌ Fail:", res);
            console.log("dev", "🏗 Check your server & your ngrok tunnel.");
            return res;
        };
        this.always = function (res) {
            console.log("debug", "👾 Always:", res);
            return res;
        };
    }
    Controller.prototype.getAttribute = function (action) {
        if (!this.controllerActionValid(action))
            return;
        console.log("debug", "🎛 Controller#getAttribute", "\uD83E\uDEA1 " + action);
        // return this.controllerFetch( ...this.requestBody(action) );
        console.warn("Not implimented yet");
    };
    // Plain text fetch
    Controller.prototype.basicFetch = function (path, body) {
        return isomorphic_fetch_1.default(path, this.basicFetchOptions(body))
            .then(function (res) { return res.text(); });
    };
    // Rest fetch
    Controller.prototype.controllerFetch = function (method, path, body) {
        return isomorphic_fetch_1.default("" + this.server() + path, this.fetchOptions(method, body))
            .then(function (res) { return res.json(); })
            .then(this.success) // https://github.com/github/fetch/issues/223#issuecomment-148927226
            .catch(this.fail)
            .then(this.always, this.always);
    };
    Controller.prototype.onFinishedFetching = function (f) {
        this._finishStack.push(f);
        return 'ok';
    };
    // private
    Controller.prototype.controllerActionValid = function (action) {
        if (action === "" || action === undefined || action === null) {
            return console.error("🛂 Please pass in an attribute resolver defined on a model, such as user.ts `firstName`.");
        }
        else {
            return true;
        }
    };
    Controller.prototype.server = function () {
        var baseUrl = store_1.default.get("serverProps.env.server_url");
        console.log("dev", "\uD83C\uDFA9 Server: " + baseUrl);
        return baseUrl;
    };
    Controller.prototype.fetchOptions = function (method, body) {
        return {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json',
            },
            body: JSON.stringify(body),
            credentials: 'include'
        };
    };
    Controller.prototype.basicFetchOptions = function (body) {
        return {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: body,
            credentials: 'include'
        };
    };
    return Controller;
}());
exports.default = Controller;
