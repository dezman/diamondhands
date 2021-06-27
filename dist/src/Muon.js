"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const store_1 = __importDefault(require("./store"));
// Store <-> client state
class Muon extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = (e) => {
            let newStoreState = {};
            const newKeyValue = e.target.value;
            newStoreState[`${this.storeKey}`] = newKeyValue;
            store_1.default.set(newStoreState);
            this.setState({ value: newKeyValue });
        };
        this.refresh = () => {
            if (!this.mounted)
                return;
            console.log("debug", "🌊 Muon refresh:", this.quark());
            this.forceUpdate();
        };
        this.storeValue = () => {
            const value = store_1.default.get(this.storeKey);
            if (this.attr) {
                console.log("debug", `🧬 Quark attr:`, this.attr);
                if (value) {
                    console.log("debug", `🧩`, `Quark value: ${value}`);
                }
                else {
                    if (this.isFetching())
                        console.log("dev", `🧩`, "Fetching...");
                }
            }
            return value || "";
        };
        this.model = props.model;
        this.attr = props.attr;
        this.storeKey = props.storeKey || this.model.getKey(this.attr);
        this.endpoint = props.endpoint;
        store_1.default.onUpdate(this.refresh);
        this.reactSetState = this.setState;
        this.setState = () => this.diamondHandsSetState.apply(this, arguments);
        this.state = {
            value: "",
        };
    }
    quark() {
        // return if quark is already set
        if (this.state.value.length)
            return this.state.value;
        if (!this.storeKey) {
            console.log("dev", `🗝 You need a store key in your component to get a value.`);
            console.log("dev", `↳`, this);
        }
        return this.storeValue();
    }
    componentDidMount() {
        this.mounted = true;
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    isFetching() {
        return this.proton && !this.isFinishedReq();
    }
    // private
    diamondHandsSetState(state) {
        if (!this.mounted)
            return;
        this.reactSetState(state);
    }
}
exports.default = Muon;
