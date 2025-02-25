import Proton from "./Proton";
declare class Resolver extends Proton {
    value(): void;
    edit(): void;
    query(variables: any): any;
}
declare const resolver: ({ endpoint, model, attr, Value, Edit }: {
    endpoint: any;
    model: any;
    attr: any;
    Value: any;
    Edit: any;
}) => Resolver;
export default resolver;
