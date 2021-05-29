import Muan from "./Muon";
declare class Proton extends Muan {
    protected accelerate: () => void;
    protected onBlur: () => void;
    protected isFinishedReq(): boolean;
    protected finishedReq: () => void;
    protected componentDidMount(): void;
}
export default Proton;
