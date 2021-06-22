import React from "react";
import Atom from "./Atom";

class Molecule extends Atom {
  constructor(props) {
    super({
      ...props,
      molecule: true
    });
  }
}

export default Molecule;
