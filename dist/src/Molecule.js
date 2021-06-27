"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Atom_1 = __importDefault(require("./Atom"));
class Molecule extends Atom_1.default {
    constructor(props) {
        super(Object.assign(Object.assign({}, props), { molecule: true }));
    }
}
exports.default = Molecule;
