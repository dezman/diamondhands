import Controller from './Controller';
declare const setDiamondhandsClients: (obj?: {}) => void;
declare class ApolloController extends Controller {
    constructor();
    private baseQueryOptions;
    gqlAttribute: ({ client, action, variables }: {
        client?: number | undefined;
        action?: String | undefined;
        variables?: String | undefined;
    }) => Promise<unknown> | undefined;
    private handleApolloError;
    private handleApolloSuccess;
    private queryOptions;
}
export default ApolloController;
export { setDiamondhandsClients as setDiamondhandsClients };
