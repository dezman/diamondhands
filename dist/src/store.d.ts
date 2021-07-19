declare class Store {
    private state;
    private requestTracker;
    private onUpdateStack;
    private waitingForKeys;
    constructor(initialState: any);
    set(newState: any): void;
    get(passKey: any): any;
    getFromServer(model: any, attr: any): any;
    waitFor(passKey: any, f: any): any;
    onUpdate: (f: any) => string;
    private checkWaitFor;
    private isGraphql;
    private cacheKey;
    private handleServerResponse;
    private valid;
    private debug;
}
declare const store: Store;
export default store;
