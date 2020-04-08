const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const uuidv4 = require('uuid/v4');

const model = require('./model');

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
    type Mutation {
        createMessage(text: String!): Message!
        deleteMessage(id: ID!): Boolean!
    }
    type User {
        id: ID!
        username: String!
        messages: [Message!]
    }
    type Message {
        id: ID!
        text: String!
        user: User!
    }
`;

const resolvers = {
    Query: {
        me: (parent, args, { me }) => {
            return me;
        },
        mike: () => {
            return model.users[3];
        },
        user: (parent, { id }) => {
            return model.users[id];
        },
        users: () => {
            return Object.values(model.users);
        },
        messages: () => {
            return Object.values(model.messages);
        },
        message: (parent, { id }) => {
            return model.messages[id];
        }
    },
    Mutation: {
        createMessage: (parent, { text }, { me }) => {
            const id = uuidv4();
            const message = {
                id,
                text,
                userId: me.id,
            };

            model.messages[id] = message;
            model.users[me.id].messageIds.push(id);

            return message;
        },
        deleteMessage: (parent, { id }) => {
            const { [id]: message, ...otherMessages } = model.messages;
            if (!message) {
                return false;
            }
            messages = otherMessages;
            return true
        },
    },
    User: {
        messages: user => {
            return Object.values(model.messages).filter(
                message => message.userId === user.id,
            );
        }
    },
    Message: {
        user: message => {
            return model.users[message.userId];
        }
    }
};

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
        me: model.users[1],
    }
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
});
