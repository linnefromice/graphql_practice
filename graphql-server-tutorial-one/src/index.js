const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

const schema = gql`
    type Query {
        users: [User!]
        me: User
        mike: User
        user(id: ID!): User

        messages: [Message!]!
        message(id: ID!): Message!
    }
    type User {
        id: ID!
        username: String!
    }
    type Message {
        id: ID!
        text: String!
        user: User!
    }
`;
let messages = {
    1: {
        id: '1',
        text: 'Hello World',
    },
    2: {
        id: '2',
        text: 'By World'
    },
}
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
const resolvers = {
    Query: {
        me: (parent, args, { me }) => {
            return me;
        },
        mike: () => {
            return users[3];
        },
        user: (parent, { id }) => {
            return users[id];
        },
        users: () => {
            return Object.values(users);
        },
        messages: () => {
            return Object.values(messages);
        },
        message: (parent, { id }) => {
            return messages[id];
        }
    },
    User: {
        username: user => {
            return user.username;
        }
    },
    Message: {
        user: (parent, args, { me }) => {
            return me;
        }
    }
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
        me: users[1],
    }
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
});
