import { ApolloClient, InMemoryCache } from '@apollo/client';
import { API_ENDPOINT } from '../api/constants';

export default new ApolloClient({
    uri: API_ENDPOINT,
    cache: new InMemoryCache(),
});