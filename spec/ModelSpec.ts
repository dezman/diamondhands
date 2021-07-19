import { extend } from 'lodash';
import Model from '../src/Model';
import Resolver from '../src/resolver';


describe("Model", ()=> {
  describe(".hydrate", () =>{
    let id, exampleModel, resolever ;

    beforeEach(()=> {
      

      class ExampleModel extends Model {
        constructor(){          
          id = 1          
          super(id);
        }

        name() {
          return "examples"
        }

        resolvers() {
          return [{
            attr: "index"
          }]
        }
      }

      // exampleModel = new ExampleModel();
      
    })

    it("should return the obejct", () => {            
      // expect(exampleModel.hydrate).toBeInstanceOf(Model);
    });
    
  })
})