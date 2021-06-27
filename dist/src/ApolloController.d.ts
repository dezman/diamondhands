import Controller from "./Controller";
declare const setDiamondhandsClients: (obj: {
    client: string;
}) => void;
interface GqlAttr {
    client: String;
    action: String;
    variables: any;
}
declare class ApolloController extends Controller {
    constructor();
    private baseQueryOptions;
    gqlAttribute: ({ client, action, variables }: GqlAttr) => Promise<unknown>;
    private handleApolloError;
    private handleApolloSuccess;
    private queryOptions;
}
export default ApolloController;
export { setDiamondhandsClients as setDiamondhandsClients };
