const { gql } = require('apollo-server-express');

module.exports = gql`
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