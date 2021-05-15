import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';

const supergraphSchema = '';
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
