import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Controller from './Controller';
// import ApolloClients from './ApolloClients';
import store from './store';

let diamondhandsClients = {};

const setDiamondhandsClients = (obj) => {
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

  public gqlAttribute = ({ client, action, variables }) => {
    if ( !this.controllerActionValid(action) ) return;
    console.log("dev", "🎛 Controller#gqlAttribute", `🪡 ${action}`);

    const queryOptions = this.queryOptions(action, variables);

    const promise = new Promise((resolve, reject) => {
      // GraphQL fetch
      return diamondhandsClients[client].query(queryOptions)
        .then( res => this.handleApolloSuccess(res, resolve) )
        .catch( res => this.handleApolloError(res, reject) );
    });


    return promise;
  }

  // private

  private handleApolloError = (e, reject) => {
    if (e.message.match("authentication")) {
      alert("🪵 Please log in to your server.");
    }
    console.error("⛔️ Error:", e);
    reject(e);
  }

  private handleApolloSuccess = (res, resolve) => {
    console.log("dev", "✅ Success:", res);
    resolve(res.data);

    this._finishStack.forEach( (f) => {
      f(res.data);
    });
  }

  private queryOptions(action, variables) {
    if (variables) console.log("dev", "🔮 Query variables:", variables);

    return {
      ...this.baseQueryOptions,
      query: this.requestBody(action),
      variables: variables,
      operationName: action
    }
  }
}

export default ApolloController
export { setDiamondhandsClients as setDiamondhandsClients }
