import * as React from "react";
import store from "./store";

// Store <-> client state
class Muon extends React.Component {
  model;
  attr;
  storeKey;
  endpoint;
  reactSetState;

  constructor(props) {
    super(props);

    this.model = props.model;
    this.attr = props.attr;
    this.storeKey = props.storeKey || this.model.getKey(this.attr);
    this.endpoint = props.endpoint;

    store.onUpdate(this.refresh);

    this.reactSetState = this.setState;
    this.setState = () => this.diamondHandsSetState.apply(this, arguments);

    this.state = {
      value: "",
    };
  }

  protected quark() {
    // return if quark is already set
    if (this.state.value.length) return this.state.value;

    if (!this.storeKey) {
      console.log(
        "dev",
        `🗝 You need a store key in your component to get a value.`
      );
      console.log("dev", `↳`, this);
    }

    return this.storeValue();
  }

  protected componentDidMount() {
    this.mounted = true;
  }

  protected componentWillUnmount() {
    this.mounted = false;
  }

  protected onChange = (e) => {
    let newStoreState = {};
    const newKeyValue = e.target.value;

    newStoreState[`${this.storeKey}`] = newKeyValue;
    store.set(newStoreState);

    this.setState({ value: newKeyValue });
  };

  protected isFetching() {
    return this.proton && !this.isFinishedReq();
  }

  // private

  private diamondHandsSetState(state) {
    if (!this.mounted) return;
    this.reactSetState(state);
  }

  private refresh = () => {
    if (!this.mounted) return;
    console.log("debug", "🌊 Muon refresh:", this.quark());
    this.forceUpdate();
  };

  private storeValue = () => {
    const value = store.get(this.storeKey);

    if (this.attr) {
      console.log("debug", `🧬 Quark attr:`, this.attr);
      if (value) {
        console.log("debug", `🧩`, `Quark value: ${value}`);
      } else {
        if (this.isFetching()) console.log("dev", `🧩`, "Fetching...");
      }
    }

    return value || "";
  };
}

export default Muon;
