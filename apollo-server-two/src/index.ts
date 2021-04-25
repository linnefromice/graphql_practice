import { ApolloServer, gql } from 'apollo-server';
import fs from 'fs';

/*
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
*/
const typeDefs = gql(fs.readFileSync('schema.graphql', 'utf8'));
const resolvers = {
  Query: {
    hello: () => 'Hello, World! Hello, GraphQL!',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
