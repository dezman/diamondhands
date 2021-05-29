"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDiamondhandsClients = void 0;
const Controller_1 = __importDefault(require("./Controller"));
let diamondhandsClients = { id: 0, name: "Acme" } || {};
let objDefaultValue = {};
let clientDefault = 0;
let actionDefault = new String;
let variablesDefault = new String;
const setDiamondhandsClients = (obj = objDefaultValue) => {
    diamondhandsClients = obj;
};
exports.setDiamondhandsClients = setDiamondhandsClients;
class ApolloController extends Controller_1.default {
    constructor() {
        super();
        this.baseQueryOptions = {
            errorPolicy: "none",
            fetchPolicy: "cache-first",
            notifyOnNetworkStatusChange: true,
            returnPartialData: false,
        };
        this.gqlAttribute = ({ client = clientDefault, action = actionDefault, variables = variablesDefault }) => {
            if (!this.controllerActionValid(action))
                return;
            console.log("dev", "🎛 Controller#gqlAttribute", `🪡 ${action}`);
            const queryOptions = this.queryOptions(action, variables);
            const promise = new Promise((resolve, reject) => {
                // GraphQL fetch
                let clientValues = 0;
                return diamondhandsClients[client].query(queryOptions)
                    .then((res) => this.handleApolloSuccess(res, resolve))
                    .catch((res) => this.handleApolloError(res, reject));
            });
            return promise;
        };
        // private
        this.handleApolloError = (e, reject) => {
            if (e.message.match("authentication")) {
                alert("🪵 Please log in to your server.");
            }
            console.error("⛔️ Error:", e);
            reject(e);
        };
        this.handleApolloSuccess = (res, resolve) => {
            console.log("dev", "✅ Success:", res);
            resolve(res.data);
            this._finishStack.forEach((f) => {
                f(res.data);
            });
        };
    }
    queryOptions(action = actionDefault, variables = variablesDefault) {
        if (variables)
            console.log("dev", "🔮 Query variables:", variables);
        return Object.assign(Object.assign({}, this.baseQueryOptions), { query: this.requestBody(action), variables: variables, operationName: action });
    }
}
exports.default = ApolloController;
