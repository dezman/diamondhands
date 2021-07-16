import Controller from "./Controller";
declare const setDiamondhandsClients: (obj: {
    client: string;
}) => void;
declare class ApolloController extends Controller {
    constructor();
    private baseQueryOptions;
    gqlAttribute: ({ client, action, variables }: any) => Promise<unknown>;
    private handleApolloError;
    private handleApolloSuccess;
    private queryOptions;
}
export default ApolloController;
export { setDiamondhandsClients as setDiamondhandsClients };
