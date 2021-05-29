import fetch from "isomorphic-fetch";
import Router from "../config/routes";
import store from "./store";
import _ from "lodash";

class Controller {
  _finishStack = [];

  public getAttribute(action: any) {
    if ( !this.controllerActionValid(action) ) return;
    console.log("debug", "🎛 Controller#getAttribute", `🪡 ${action}`);

    // return this.controllerFetch( ...this.requestBody(action) );
    console.warn("Not implimented yet")
  }

  // Plain text fetch
  public basicFetch(path: string, body: {}) {
    return fetch(path, this.basicFetchOptions(body: any))
      .then(res => res.text())
  }

  // Rest fetch
  public controllerFetch(method: string, path: string, body: any) {
    return fetch( 
      `${this.server()}${path}`, 
      this.fetchOptions(method: string, body: any) 
    )
    .then(res => res.json())
    .then(this.success) // https://github.com/github/fetch/issues/223#issuecomment-148927226
    .catch(this.fail)
    .then(this.always, this.always);
  }

  public onFinishedFetching(f: any) {
    this._finishStack.push(f);
    return 'ok';
  }

  protected requestBody = (action: string) => {
    const body = this[action]();

    if (body) {
      console.log("dev", "🌮 Request body:", body, this);
    } else {
      console.error("🍽 Empty request body:", body, this);
    }
    return body;
  }

  protected controllerActionValid(action: string) {
    if (action === "" || action === undefined || action === null) {
      return console.error("🛂 Please pass in an attribute resolver defined on a model, such as user.ts `firstName`.")
    } else {
      return true;
    }
  }
  

  // private

 

  private server() {
    const baseUrl = store.get("serverProps.env.server_url");
    console.log("dev", `🎩 Server: ${baseUrl}`);

    return baseUrl;
  }

  private success = (res: { data: any }) => {
    console.log("debug", "✅ Success:", res);

    this._finishStack.forEach( (f: any) => {
      f(res.data);
    });
    this._finishStack = [];

    return res;
  }

  private fail = (res: {}) => {
    console.log("dev", "❌ Fail:", res);
    console.log("dev", "🏗 Check your server & your ngrok tunnel.");
    return res;
  }

  private always = (res: {}) => {
    console.log("debug", "👾 Always:", res);
    return res;
  }

  private fetchOptions(method: string, body: any) {
    return {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      headers: { 
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include'
    };
  }

  private basicFetchOptions(body: any) {
    return {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 
        'Content-Type': 'text/plain',
      },
      body: body,
      credentials: 'include'
    };
  }
}

export default Controller;
