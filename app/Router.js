import React from "react";
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route
} from "react-router-dom";
import routes from "../config/routes";
import store from "../lib/store";
import Controller from "../lib/Controller";
import { setDiamondhandsClients } from "../lib/ApolloController";


class Router extends React.Component {
  // Segment

  constructor(props) {
    super(props)

    console.log("dev", "🚏 Router props:", props);

    const cache = new InMemoryCache();

    store.set({
      serverProps: props
    });
  }
  
  componentDidMount() {
    const controller = new Controller();
  }

  render() {
    return (
      <Router>
        <Switch>
          {
            routes.map( (routeObj) => {
              const RouteComponent = routeObj.component;

              return (
                <Route 
                  exact 
                  path={routeObj.path} 
                  key={routeObj.path}
                >
                  <RouteComponent clients={this.state.clients} />
                </Route>
              )
            })
          }
        </Switch>
      </Router>
    )
  }
}

export default Router;