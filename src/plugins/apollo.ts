import Vue                                        from 'vue';
import VueApollo                                  from 'vue-apollo';
import { ApolloLink, concat, split }              from 'apollo-link';
import { HttpLink }                               from 'apollo-link-http';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { ApolloClient }                           from 'apollo-client';
import config                                     from '@/environment';
import { bearerToken }                            from '@/plugins/auth';

Vue.use(VueApollo);


const httpLink = new HttpLink({uri: config.graphqlUri});

const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
        headers: {
            authorization: bearerToken(),
        },
    });
    return forward ? forward(operation) : null;
});


export default new VueApollo({
    defaultClient: new ApolloClient({
        link: concat(authMiddleware, httpLink),
        cache: new InMemoryCache({
            dataIdFromObject: (item) => {
                switch (item.__typename) {
                    case 'User':
                        return (item as any).email;
                    default:
                        return defaultDataIdFromObject(item);
                }
            },
        }),
        defaultOptions: {
            query: {
                fetchPolicy: 'cache-and-network',
            },
        },
    }),
});
