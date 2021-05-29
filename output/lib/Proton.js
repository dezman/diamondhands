"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __importDefault(require("../lib/store"));
const Muon_1 = __importDefault(require("./Muon"));
const lodash_1 = __importDefault(require("lodash"));
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
        return lodash_1.default.includes(_finishedRequests, this);
    }
    componentDidMount() {
        this.mounted = true;
        this.accelerate();
    }
}
exports.default = Proton;
