import store from "./store";
import Muan from "./Muon";

// Server <-> client state
const _finishedRequests = [];

class Proton extends Muan {
  protected accelerate = () => {
    if (this.attr) {
      store.getFromServer(this.model, this.attr).then(this.finishedReq);
    }
  }

  protected onBlur = () => {
    // TODO: Save
  }

  protected isFinishedReq() {
    return _.includes(_finishedRequests, this);
  }

  protected finishedReq = () => {
    _finishedRequests.push(this);
  }

  protected componentDidMount() {
    this.mounted = true;
    this.accelerate();
  }
}

export default Proton;
