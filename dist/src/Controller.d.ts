declare class Controller {
    _finishStack: never[];
    getAttribute(action: any): void;
    basicFetch(path: any, body: any): any;
    controllerFetch(method: any, path: any, body: any): any;
    onFinishedFetching(f: any): string;
    protected requestBody: (action: any) => any;
    protected controllerActionValid(action: any): true | void;
    private server;
    private success;
    private fail;
    private always;
    private fetchOptions;
    private basicFetchOptions;
}
export default Controller;
