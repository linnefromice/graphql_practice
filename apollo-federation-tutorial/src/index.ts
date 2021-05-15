import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import { readFileSync } from 'fs';

const supergraphSchema = readFileSync('./supergraph.graphql').toString();
const gateway = new ApolloGateway({
  supergraphSdl: supergraphSchema,
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
});
server
  .listen()
  .then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((err) => console.error(err));
