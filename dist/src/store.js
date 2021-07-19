"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const lodash_1 = __importDefault(require("lodash"));
class Store {
    constructor(initialState) {
        this.requestTracker = {};
        this.onUpdateStack = [];
        this.waitingForKeys = {};
        this.onUpdate = (f) => {
            console.log("all", "🥞 Store#onUpdate:", f);
            this.onUpdateStack.push(f);
            return "ok";
        };
        this.handleServerResponse = (attr, model, res) => {
            console.log("dev", "📜 Response:", res);
            let newStateObj = {};
            // Save new state to store
            const relevantData = lodash_1.default(res).get(model.controller.accessor());
            if (relevantData.results) {
                newStateObj[model.name] = newStateObj[model.name] || {};
                newStateObj[model.name][attr] = relevantData.results;
            }
            else {
                newStateObj[model.name] = relevantData;
            }
            this.set(newStateObj);
        };
        this.debug = () => {
            if (this.state)
                console.log("dev", "🍱", this.state);
            return this.state;
        };
        this.state = initialState;
        console.log("debug", "🗺 Store ctx:", this);
        console.debug = this.debug;
    }
    set(newState) {
        console.log("debug", "🚮 Old state:", this.state);
        console.log("debug", "💽 New state:", newState);
        // Object.assign not recommended for deep merge
        this.state = lodash_1.default.merge(this.state, newState);
        console.setTimeout(() => {
            console.log("dev", "🍱 Store state:", this.state);
            this.checkWaitFor();
            this.onUpdateStack.forEach((f) => {
                console.log("all", "🥞 Store onUpdateStack:", f);
                f(this.state);
            });
        }, 0);
    }
    get(passKey) {
        console.log("debug", "💅 Store#get:", passKey);
        if (!passKey || passKey === "") {
            console.error("🙈 Invalid store request: ", arguments);
        }
        return this.cacheKey(passKey);
    }
    getFromServer(model, attr) {
        // Already requested it
        if (this.requestTracker[attr])
            return this.requestTracker[attr];
        if (!attr || !model) {
            console.error("🙈 Invalid store request: ", attr, model);
        }
        model.controller.onFinishedFetching((res) => {
            this.handleServerResponse(attr, model, res);
        });
        console.log("dev", "🌀 Starting get from server...", model.name, attr);
        if (this.isGraphql(model, attr)) {
            this.requestTracker[attr] = model.controller.gqlAttribute({
                client: model.controller.client(),
                action: attr,
            });
        }
        else {
            this.requestTracker[attr] = model.controller.getAttribute(attr);
        }
        return this.requestTracker[attr];
    }
    waitFor(passKey, f) {
        const value = this.get(passKey);
        if (this.valid(value)) {
            return f(value);
        }
        if (lodash_1.default.includes(this.waitingForKeys[passKey], f)) {
            return;
        }
        if (this.waitingForKeys[passKey]) {
            this.waitingForKeys[passKey].push(f);
        }
        else {
            this.waitingForKeys[passKey] = [f];
        }
    }
    // private
    checkWaitFor() {
        console.log("debug", "🧳 Check wait for:", Object.keys(this.waitingForKeys));
        Object.keys(this.waitingForKeys).forEach((passKey) => {
            const value = this.get(passKey);
            console.log("debug", "🧳 Value:", value);
            if (this.valid(value)) {
                this.waitingForKeys[passKey].forEach((f) => {
                    console.log("debug", "🧳 Wait for callback called:", f);
                    f(value);
                });
                console.log("debug", "🧳 Destroyed:", this.waitingForKeys[passKey]);
                delete this.waitingForKeys[passKey];
            }
        });
    }
    isGraphql(model, attr) {
        return model.controller.requestBody(attr).kind === "Document";
    }
    cacheKey(passKey) {
        const cachedValue = lodash_1.default.get(this.state, passKey);
        if (this.valid(cachedValue)) {
            console.log("debug", "💰 Cached value:", cachedValue);
            return cachedValue;
        }
    }
    valid(x) {
        console.log("debug", "🦆 Store#valid type:", typeof x);
        return !lodash_1.default.isNil(x) && !lodash_1.default.isNaN(x);
    }
}
const initialState = {};
const store = new Store(initialState);
exports.default = store;
