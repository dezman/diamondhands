"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as React from "react";
const Proton_1 = __importDefault(require("./Proton"));
// import View from './components/View'
let value = null;
class Resolver extends Proton_1.default {
    value() {
        const Value = this.props.Value;
        // return (
        //   <Value attr={this.attr} model={this.model} />
        // )
    }
    edit() {
        const Edit = this.props.Edit;
        // return (
        //   // <Edit attr={this.attr} model={this.model} />
        // )
    }
    query(variables) {
        return this.model.controller.gqlAttribute({
            client: this.model.controller.client(),
            action: this.props.attr,
            variables: variables,
        });
    }
}
// const resolver = ({ endpoint, model, attr, Value, Edit }) => {
const resolver = ({ endpoint, model, attr }) => {
    return new Resolver({
        model: model,
        attr: attr,
        // Value: Value,
        // Edit: Edit,
    });
};
exports.default = resolver;
