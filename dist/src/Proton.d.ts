import Muan from "./Muon";
declare class Proton extends Muan {
    protected accelerate: () => void;
    protected onBlur: () => void;
    protected isFinishedReq(): any;
    protected finishedReq: () => void;
    protected componentDidMount(): void;
}
export default Proton;
