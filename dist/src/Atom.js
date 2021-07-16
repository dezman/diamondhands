"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Proton_1 = __importDefault(require("./Proton"));
class Atom extends Proton_1.default {
    constructor(props) {
        super(props);
        if (props.molecule)
            return;
        if (Object.keys(this.state).length !== 1) {
            console.error("↳ ⚛ Atoms can only have once piece of state. ⚛");
            console.log("dev", this);
        }
    }
}
exports.default = Atom;
