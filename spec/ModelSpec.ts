import { extend } from "lodash";
import Model from "../src/Model";
import Resolver from "../src/resolver";

describe("Model", () => {
  class ExampleModel extends Model {
    constructor() {
      const id = 1;
      super(id);
    }

    name() {
      return "potatoes";
    }

    resolvers() {
      return [
        {
          attr: "index",
        },
      ];
    }
  }

  it("can be created", () => {
    const exampleModel = new ExampleModel();
    expect(exampleModel).toBeInstanceOf(Model);
  });

  describe(".getKey", () => {
    it("adds data to the model", () => {
      const exampleModel = new ExampleModel();
      exampleModel.hydrate({ foo: "bar" });
      expect(exampleModel.getKey("foo")).toBe("potatoes.foo");
    });
  });
});
