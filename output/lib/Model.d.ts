declare class Model {
    id: Number;
    data: {};
    constructor(id: any);
    name: () => any;
    hydrate: (obj: any) => this;
    protected getKey(attr: any): string;
}
export default Model;
