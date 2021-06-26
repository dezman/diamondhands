// import * as React from "react";
import Proton from "./Proton";
import store from "./store";
// import View from './components/View'

let value = null;

class Resolver extends Proton {
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
export default resolver;
