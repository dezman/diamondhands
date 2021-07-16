"use strict";
// @ts-nocheck
// Validation logic
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolver_1 = __importDefault(require("./resolver"));
class Model {
    constructor(id) {
        this.id = id;
        this.data = {};
        this.name = this.name();
        this.resolvers().forEach(this.generateResolver);
    }
    hydrate(obj) {
        this.data = obj;
        return this;
    }
    getKey(attr) {
        return `${this.name}.${attr}`;
    }
    // private
    generateResolver({ endpoint, attr, Value, Edit }) {
        console.log(`dev", "👀 Resolver for:`);
        this[attr] = resolver_1.default({
            endpoint: endpoint,
            model: this,
            attr: attr,
            Value: Value,
            Edit: Edit,
        });
    }
}
exports.default = Model;
