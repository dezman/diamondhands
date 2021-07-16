declare class Controller {
    _finishStack: any[];
    getAttribute(action: any): Promise<any>;
    basicFetch(path: any, body: any): Promise<string>;
    controllerFetch(method: any, path: any, body: any): Promise<any>;
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
