import React from "react";
import store from "./store";
import Proton from "./Proton";

class Atom extends Proton {
  constructor(props) {
    super(props);

    if (props.molecule) return;

    if (Object.keys(this.state).length !== 1) {
      console.error("↳ ⚛ Atoms can only have once piece of state. ⚛");
      console.log("dev", this);
    }
  }
}

export default Atom;
