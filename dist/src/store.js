"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store = /** @class */ (function () {
    function Store(initialState) {
        var _this = this;
        this.requestTracker = {};
        this.onUpdateStack = [];
        this.waitingForKeys = {};
        this.onUpdate = function (f) {
            console.log("all", "🥞 Store#onUpdate:", f);
            _this.onUpdateStack.push(f);
            return 'ok';
        };
        this.handleServerResponse = function (attr, model, res) {
            console.log("dev", "📜 Response:", res);
            var newStateObj = {};
            // Save new state to store
            var relevantData = _(res).get(model.controller.accessor());
            if (relevantData.results) {
                newStateObj[model.name] = newStateObj[model.name] || {};
                newStateObj[model.name][attr] = relevantData.results;
            }
            else {
                newStateObj[model.name] = relevantData;
            }
            _this.set(newStateObj);
        };
        this.debug = function () {
            if (_this.state)
                console.log("dev", "🍱", _this.state);
            return _this.state;
        };
        this.state = initialState;
        console.log("debug", "🗺 Store ctx:", this);
        window.bug = this.debug;
    }
    Store.prototype.set = function (newState) {
        var _this = this;
        console.log("debug", "🚮 Old state:", this.state);
        console.log("debug", "💽 New state:", newState);
        // Object.assign not recommended for deep merge
        this.state = _.merge(this.state, newState);
        window.setTimeout(function () {
            console.log("dev", "🍱 Store state:", _this.state);
            _this.checkWaitFor();
            _this.onUpdateStack.forEach(function (f) {
                console.log("all", "🥞 Store onUpdateStack:", f);
                f(_this.state);
            });
        }, 0);
    };
    Store.prototype.get = function (passKey) {
        console.log("debug", "💅 Store#get:", passKey);
        if (!passKey || passKey === "") {
            console.error("🙈 Invalid store request: ", arguments);
        }
        return this.cacheKey(passKey);
    };
    Store.prototype.getFromServer = function (model, attr) {
        var _this = this;
        // Already requested it
        if (this.requestTracker[attr])
            return this.requestTracker[attr];
        if (!attr || !model) {
            console.error("🙈 Invalid store request: ", attr, model);
        }
        model.controller.onFinishedFetching(function (res) {
            _this.handleServerResponse(attr, model, res);
        });
        console.log("dev", "🌀 Starting get from server...", model.name, attr);
        if (this.isGraphql(model, attr)) {
            this.requestTracker[attr] = model.controller.gqlAttribute({
                client: model.controller.client(),
                action: attr
            });
        }
        else {
            this.requestTracker[attr] = model.controller.getAttribute(attr);
        }
        return this.requestTracker[attr];
    };
    Store.prototype.waitFor = function (passKey, f) {
        var value = this.get(passKey);
        if (this.valid(value)) {
            return f(value);
        }
        if (_.includes(this.waitingForKeys[passKey], f)) {
            return;
        }
        if (this.waitingForKeys[passKey]) {
            this.waitingForKeys[passKey].push(f);
        }
        else {
            this.waitingForKeys[passKey] = [f];
        }
    };
    // private
    Store.prototype.checkWaitFor = function () {
        var _this = this;
        console.log("debug", "🧳 Check wait for:", Object.keys(this.waitingForKeys));
        Object.keys(this.waitingForKeys).forEach(function (passKey) {
            var value = _this.get(passKey);
            console.log("debug", "🧳 Value:", value);
            if (_this.valid(value)) {
                _this.waitingForKeys[passKey].forEach(function (f) {
                    console.log("debug", "🧳 Wait for callback called:", f);
                    f(value);
                });
                console.log("debug", "🧳 Destroyed:", _this.waitingForKeys[passKey]);
                delete _this.waitingForKeys[passKey];
            }
        });
    };
    Store.prototype.isGraphql = function (model, attr) {
        return model.controller.requestBody(attr).kind === "Document";
    };
    Store.prototype.cacheKey = function (passKey) {
        var cachedValue = _.get(this.state, passKey);
        if (this.valid(cachedValue)) {
            console.log("debug", "💰 Cached value:", cachedValue);
            return cachedValue;
        }
    };
    Store.prototype.valid = function (x) {
        console.log("debug", "🦆 Store#valid type:", typeof x);
        return !_.isNil(x) && !_.isNaN(x);
    };
    return Store;
}());
var initialState = {};
var store = new Store(initialState);
exports.default = store;
