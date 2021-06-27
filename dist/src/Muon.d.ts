import * as React from "react";
declare class Muon extends React.Component {
    model: any;
    attr: any;
    storeKey: any;
    endpoint: any;
    reactSetState: any;
    constructor(props: any);
    protected quark(): any;
    protected componentDidMount(): void;
    protected componentWillUnmount(): void;
    protected onChange: (e: any) => void;
    protected isFetching(): boolean;
    private diamondHandsSetState;
    private refresh;
    private storeValue;
}
export default Muon;
