// @ts-nocheck
// Validation logic

import resolver from "./resolver";
import store from "../dist/src/store";

class Model {
  constructor(id) {
    this.id = id;
    this.name = this.name();

    this.resolvers().forEach(this.generateResolver.bind(this));
  }

  public hydrate(obj) {
    const newState = {};
    newState[this.name] = obj;
    store.set(newState);

    return this;
  }

  public getKey(attr) {
    return `${this.name}.${attr}`;
  }

  // private

  private generateResolver({ endpoint, attr, Value, Edit }) {
    console.log(`dev", "👀 Resolver for:`);

    this[attr] = resolver({
      endpoint: endpoint,
      model: this,
      attr: attr,
      Value: Value,
      Edit: Edit,
    });
  }
}

export default Model;
