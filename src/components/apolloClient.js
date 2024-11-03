import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://gateway.thegraph.com/api/12801ac54737fec39966619c11b0958c/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV',
  cache: new InMemoryCache()
});

export default client;