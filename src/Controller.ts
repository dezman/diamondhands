// @ts-nocheck
import fetch from "isomorphic-fetch";
import store from "./store";
// import $ from "jquery";

class Controller {
  _finishStack = [];

  public getAttribute(action) {
    if (!this.controllerActionValid(action)) return;
    console.log("debug", "🎛 Controller#getAttribute", `🪡 ${action}`);

    // return this.controllerFetch( ...this.requestBody(action) );
    console.warn("Not implimented yet");
  }

  // Plain text fetch
  public basicFetch(path, body) {
    return fetch(path, this.basicFetchOptions(body)).then((res) => res.text());
  }

  // Rest fetch
  public controllerFetch(method, path, body) {
    return fetch(`${this.server()}${path}`, this.fetchOptions(method, body))
      .then((res) => res.json())
      .then(this.success) // https://github.com/github/fetch/issues/223#issuecomment-148927226
      .catch(this.fail)
      .then(this.always, this.always);
  }

  public onFinishedFetching(f) {
    this._finishStack.push(f);
    return "ok";
  }

  protected requestBody = (action) => {
    const body = this[action]();

    if (body) {
      console.log("dev", "🌮 Request body:", body, this);
    } else {
      console.error("🍽 Empty request body:", body, this);
    }
    return body;
  };

  // protected

  protected controllerActionValid(action) {
    if (action === "" || action === undefined || action === null) {
      return console.error(
        "🛂 Please pass in an attribute resolver defined on a model, such as user.ts `firstName`."
      );
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

  private success = (res) => {
    console.log("debug", "✅ Success:", res);

    this._finishStack.forEach((f) => {
      f(res.data);
    });
    this._finishStack = [];

    return res;
  };

  private fail = (res) => {
    console.log("dev", "❌ Fail:", res);
    console.log("dev", "🏗 Check your server & your ngrok tunnel.");
    return res;
  };

  private always = (res) => {
    console.log("debug", "👾 Always:", res);
    return res;
  };

  private fetchOptions(method, body) {
    return {
      method: method,
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    };
  }

  private basicFetchOptions(body) {
    return {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "text/plain",
      },
      body: body,
      credentials: "include",
    };
  }
}

export default Controller;
