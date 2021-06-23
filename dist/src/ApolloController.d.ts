import Controller from './Controller';
declare const setDiamondhandsClients: (obj: any) => void;
declare class ApolloController extends Controller {
    constructor();
    private baseQueryOptions;
    gqlAttribute: ({ client, action, variables }: {
        client: any;
        action: any;
        variables: any;
    }) => any;
    private handleApolloError;
    private handleApolloSuccess;
    private queryOptions;
}
export default ApolloController;
export { setDiamondhandsClients as setDiamondhandsClients };
