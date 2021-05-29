"use strict";
// Validation logic
Object.defineProperty(exports, "__esModule", { value: true });
// import resolver from "./resolver"
class Model {
    constructor(id) {
        this.id = new Number;
        this.data = {};
        this.name = () => {
            return this.name || null;
        };
        this.hydrate = (obj) => {
            this.data = obj;
            return this;
        };
        this.id = id;
        this.data = {};
        this.name = this.name();
        // if(this.resolvers().length != 0){
        //   this.resolvers().forEach(this.generateResolver);
        // }
    }
    getKey(attr) {
        return `${this.name}.${attr}`;
    }
}
exports.default = Model;
