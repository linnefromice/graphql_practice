const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

const schema = gql`
    type Query {
        users: [User!]
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
    },
    3: {
        id: '3',
        username: 'Mike Ross'
    },
    4: {
        id: '4',
        username: 'Harvey Specter'
    },
    5: {
        id: '5',
        username: 'Rachel Zane'
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
        },
        users: () => {
            return Object.values(users);
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
