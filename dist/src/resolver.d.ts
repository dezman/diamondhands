import Proton from "./Proton";
declare class Resolver extends Proton {
    value(): void;
    edit(): void;
    query(variables: any): any;
}
declare const resolver: ({ endpoint, model, attr }: {
    endpoint: any;
    model: any;
    attr: any;
}) => Resolver;
export default resolver;
