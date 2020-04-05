const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

const schema = gql`
    type Query {
        me: User
        user: User
    }
    type User {
        id: ID!
        username: String!
    }
`;
const resolvers = {
    Query: {
        me: () => {
            return {
                username: 'Robin Wieruch',
            }
        },
        user: () => {
            return {
                username: 'Dave Davids',
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
});
