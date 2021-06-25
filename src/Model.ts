// Validation logic

import resolver from "./resolver"

class Model {
  constructor(id) {
    this.id = id;
    this.data = {};
    this.name = this.name();

    this.resolvers().forEach(this.generateResolver);
  }

  public hydrate(obj) {
    this.data = obj;
    return this;
  }

  protected getKey(attr) {
    return `${this.name}.${attr}`;
  }

  // private

  private generateResolver = ({ endpoint, attr, Value, Edit }) => {
    console.log("dev", "👀 Resolver for:", [this.name].concat(arguments));

    this[attr] = resolver({
      endpoint: endpoint,
      model: this,
      attr: attr,
      Value: Value,
      Edit: Edit
    });
  }
}

export default Model;

