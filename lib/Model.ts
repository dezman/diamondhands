// Validation logic

// import resolver from "./resolver"

class Model {
  id = new Number;
  data = {};

  constructor(id) {
    this.id = id;
    this.data = {};
    this.name = this.name();


    // if(this.resolvers().length != 0){
    //   this.resolvers().forEach(this.generateResolver);
    // }
    
  }

  name = () => {
    return this.name || null ;
  }


  hydrate = (obj) => {
    this.data = obj;
    return this;
  }

  protected getKey(attr) {
    return `${this.name}.${attr}`;
  }

  // private

  // private generateResolver = ({ endpoint, attr, Value, Edit }) => {
  //   console.log("dev", "👀 Resolver for:", [this.name].concat(arguments));

  //   this[attr] = resolver({
  //     endpoint: endpoint,
  //     model: this,
  //     attr: attr,
  //     Value: Value,
  //     Edit: Edit
  //   });
  // }
}

export default Model;

