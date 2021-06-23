import * as React from "react";
declare class Muon extends React.Component {
    model: any;
    attr: any;
    storeKey: any;
    endpoint: any;
    reactSetState: <K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined) => void;
    constructor(props: any);
    protected quark(): any;
    protected componentDidMount(): void;
    protected componentWillUnmount(): void;
    protected onChange: (e: any) => void;
    protected isFetching(): any;
    private diamondHandsSetState;
    private refresh;
    private storeValue;
}
export default Muon;
