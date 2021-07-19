declare class Model {
    constructor(id: any);
    hydrate(obj: any): this;
    private getKey;
    private generateResolver;
}
export default Model;
