import Vue               from 'vue';
import VueApollo         from 'vue-apollo';
import { HttpLink }      from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient }  from 'apollo-client';
import config            from '@/environment';

Vue.use(VueApollo);


export default new VueApollo({
    defaultClient: new ApolloClient({
        link: new HttpLink({
            uri: config.graphqlUri,
        }),
        cache: new InMemoryCache(),
    }),
});
