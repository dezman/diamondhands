declare class Model {
    constructor(id: any);
    hydrate(obj: any): this;
    getKey(attr: any): string;
    private generateResolver;
}
export default Model;
