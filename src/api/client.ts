import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_HASURA_ENDPOINT,
  cache: new InMemoryCache(),
});

export default client;
