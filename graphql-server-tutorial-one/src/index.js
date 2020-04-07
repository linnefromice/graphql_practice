const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const uuidv4 = require('uuid/v4');

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
let messages = {
    1: {
        id: '1',
        text: 'Hello World',
        userId: '1',
    },
    2: {
        id: '2',
        text: 'By World',
        userId: '2',
    },
}
let users = {
    1: {
        id: '1',
        username: 'Robin Wieruch',
        messageIds: [1],
    },
    2: {
        id: '2',
        username: 'Dave David',
        messageIds: [2],
    },
    3: {
        id: '3',
        username: 'Mike Ross',
        messageIds: [],
    },
    4: {
        id: '4',
        username: 'Harvey Specter',
        messageIds: [],
    },
    5: {
        id: '5',
        username: 'Rachel Zane',
        messageIds: [],
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
    Mutation: {
        createMessage: (parent, { text }, { me }) => {
            const id = uuidv4();
            const message = {
                id,
                text,
                userId: me.id,
            };

            messages[id] = message;
            users[me.id].messageIds.push(id);

            return message;
        },
        deleteMessage: (parent, { id }) => {
            const { [id]: message, ...otherMessages } = messages;
            if (!message) {
                return false;
            }
            messages = otherMessages;
            return true
        },
    },
    User: {
        messages: user => {
            return Object.values(messages).filter(
                message => messages.userId === user.id,
            );
        }
    },
    Message: {
        user: message => {
            return users[message.userId];
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
