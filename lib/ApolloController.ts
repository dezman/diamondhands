import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Controller from './Controller';
// import ApolloClients from './ApolloClients';
import store from './store';

let diamondhandsClients: any = { id: 0, name: "Acme" } || {} ;
let objDefaultValue = {};
let clientDefault = 0;
let actionDefault = new String;
let variablesDefault = new String;

const setDiamondhandsClients = (obj = objDefaultValue) => {
  diamondhandsClients = obj
}

class ApolloController extends Controller {
  constructor() {
    super();
  }

  private baseQueryOptions = {
    errorPolicy: "none",
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    returnPartialData: false,
  };

  public gqlAttribute = ({ client = clientDefault, action = actionDefault, variables = variablesDefault }) => {
    if ( !this.controllerActionValid(action) ) return;
    console.log("dev", "🎛 Controller#gqlAttribute", `🪡 ${action}`);

    const queryOptions = this.queryOptions(action, variables);

    const promise = new Promise((resolve, reject) => {
      // GraphQL fetch
      let clientValues = 0;
      return diamondhandsClients[client].query(queryOptions)
        .then( (res: any) => this.handleApolloSuccess(res, resolve) )
        .catch( (res: any) => this.handleApolloError(res, reject) );
    });


    return promise;
  }

  // private

  private handleApolloError = (e: any, reject: any) => {
    if (e.message.match("authentication")) {
      alert("🪵 Please log in to your server.");
    }
    console.error("⛔️ Error:", e);
    reject(e);
  }

  private handleApolloSuccess = (res: any, resolve: any) => {
    console.log("dev", "✅ Success:", res);
    resolve(res.data);

    this._finishStack.forEach( (f: any) => {
      f(res.data);
    });
  }

  private queryOptions(action = actionDefault, variables = variablesDefault) {
    if (variables) console.log("dev", "🔮 Query variables:", variables);

    return {
      ...this.baseQueryOptions,
      query: this.requestBody(action),
      variables: variables,
      operationName: action
    }
  }
}

export default ApolloController;
export { setDiamondhandsClients as setDiamondhandsClients };
