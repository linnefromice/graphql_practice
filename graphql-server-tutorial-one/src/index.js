const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

const schema = gql`
    type Query {
        me: User
        user(id: ID!): User
    }
    type User {
        id: ID!
        username: String!
    }
`;
let users = {
    1: {
        id: '1',
        username: 'Robin Wieruch'
    },
    2: {
        id: '2',
        username: 'Dave David'
    }
};
const me = users[1];
const resolvers = {
    Query: {
        me: () => {
            return me;
        },
        user: (parent, { id }) => {
            return users[id];
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
