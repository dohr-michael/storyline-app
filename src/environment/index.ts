// This File should be use global variable provided by the environment.
const global = (window as any).Config || {};

export default {
    graphqlUri: global.GRAPHQL_URL || '',
    auth0: {
        domain: global.AUTH0_DOMAIN || '',
        redirectUri: `${window.location.origin}/login`,
        clientID: global.AUTH0_CLIENT_ID || '',
        responseType: 'token id_token',
        scope: 'openid profile email',
    }
};