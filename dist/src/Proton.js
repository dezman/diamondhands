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
const store_1 = __importDefault(require("./store"));
const Muon_1 = __importDefault(require("./Muon"));
const _ = __importStar(require("lodash"));
// Server <-> client state
const _finishedRequests = [];
class Proton extends Muon_1.default {
    constructor() {
        super(...arguments);
        this.accelerate = () => {
            if (this.attr) {
                store_1.default.getFromServer(this.model, this.attr).then(this.finishedReq);
            }
        };
        this.onBlur = () => {
            // TODO: Save
        };
        this.finishedReq = () => {
            _finishedRequests.push(this);
        };
    }
    isFinishedReq() {
        return _.includes(_finishedRequests, this);
    }
    componentDidMount() {
        this.mounted = true;
        this.accelerate();
    }
}
exports.default = Proton;
