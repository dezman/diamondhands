declare class Controller {
    _finishStack: never[];
    getAttribute(action: any): void;
    basicFetch(path: string, body: {}): Promise<string>;
    controllerFetch(method: string, path: string, body: any): Promise<{}>;
    onFinishedFetching(f: any): string;
    protected requestBody: (action: string) => any;
    protected controllerActionValid(action: string): true | void;
    private server;
    private success;
    private fail;
    private always;
    private fetchOptions;
    private basicFetchOptions;
}
export default Controller;
