"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const store_1 = __importDefault(require("./store"));
// import $ from "jquery";
class Controller {
    constructor() {
        this._finishStack = [];
        // protected
        this.requestBody = (action) => {
            const body = this[action]();
            if (body) {
                console.log("dev", "🌮 Request body:", body, this);
            }
            else {
                console.error("🍽 Empty request body:", body, this);
            }
            return body;
        };
        this.success = (res) => {
            console.log("debug", "✅ Success:", res);
            this._finishStack.forEach((f) => {
                f(res.data);
            });
            this._finishStack = [];
            return res;
        };
        this.fail = (res) => {
            console.log("dev", "❌ Fail:", res);
            console.log("dev", "🏗 Check your server & your ngrok tunnel.");
            return res;
        };
        this.always = (res) => {
            console.log("debug", "👾 Always:", res);
            return res;
        };
    }
    getAttribute(action) {
        if (!this.controllerActionValid(action))
            return;
        console.log("debug", "🎛 Controller#getAttribute", `🪡 ${action}`);
        return this.controllerFetch(...this.requestBody(action));
    }
    // Plain text fetch
    basicFetch(path, body) {
        return isomorphic_fetch_1.default(path, this.basicFetchOptions(body)).then((res) => res.text());
    }
    // Rest fetch
    controllerFetch(method, path, body) {
        return isomorphic_fetch_1.default(`${this.server()}${path}`, this.fetchOptions(method, body))
            .then((res) => res.json())
            .then(this.success) // https://github.com/github/fetch/issues/223#issuecomment-148927226
            .catch(this.fail)
            .then(this.always, this.always);
    }
    onFinishedFetching(f) {
        this._finishStack.push(f);
        return "ok";
    }
    controllerActionValid(action) {
        if (action === "" || action === undefined || action === null) {
            return console.error("🛂 Please pass in an attribute resolver defined on a model, such as user.ts `firstName`.");
        }
        else {
            return true;
        }
    }
    // private
    server() {
        const baseUrl = store_1.default.get("serverProps.env.server_url");
        console.log("dev", `🎩 Server: ${baseUrl}`);
        return baseUrl;
    }
    fetchOptions(method, body) {
        return {
            method: method,
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Accept: "application/json",
            },
            body: JSON.stringify(body),
            credentials: "include",
        };
    }
    basicFetchOptions(body) {
        return {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            headers: {
                "Content-Type": "text/plain",
            },
            body: body,
            credentials: "include",
        };
    }
}
exports.default = Controller;
