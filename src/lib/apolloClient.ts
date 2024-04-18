import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://wordsearchmonkey.outsoar.ph/graphql'
  }),
  cache: new InMemoryCache()
});

export default client;

