import express from 'express'
import cors from 'cors'
import { ApolloServer, gql, IResolvers } from 'apollo-server-express'

const app = express()
app.use(cors())

interface User {
  id: string;
  firstName: String
  lastName: String
}
interface Users {
  [key: string]: User;
}
interface Message {
  id: string;
  text: string;
  userId: string;
}
interface Messages {
  [key: string]: Message;
}
const users: Users = {
  '1': {
    id: '1',
    firstName: 'Miyuki',
    lastName: 'Watanabe'
  },
  '2': {
    id: '2',
    firstName: 'Sayaka',
    lastName: 'Yamamoto'
  },
}
const me = users[1];
const messages: Messages = {
  '1': {
    id: '1',
    text: 'Hello, World!',
    userId: '1'
  },
  '2': {
    id: '2',
    text: 'from GraphQL and Apollo-Server.',
    userId: '2'
  },
  '3': {
    id: '3',
    text: 'With TypeScript.',
    userId: '2'
  },
}

const schema = gql`
  type Query {
    me: User
    users: [User!]
    user(id: ID!): User
    messages: [Message!]
    message(id: ID!): Message
    author: Author
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
  type Author {
    name: String!
    date: String!
    country: String!
  }
`

const resolvers: IResolvers = {
  Query: {
    me: () => me,
    users: () => Object.values(users),
    user: (parent, { id }) => users[id] || null,
    author: (parent, args, context) => context.author,
    messages: () => Object.values(messages),
    message: (parent, { id }) => messages[id] || null
  },
  User: {
    username: (user: User) => `${user.firstName} ${user.lastName}`,
    messages: (user: User) =>
      Object.values(messages)
        .filter(m => +m.userId === +user.id)
        .map(m => messages[m.id]),
  },
  Message: {
    user: (message: Message, args) => users[message.userId]
  }
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    author: {
      name: "linnefromice",
      date: "2021/04/01",
      country: "Japan"
    }
  }
})

server.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: 23456 }, () => {
  console.log('server on http://localhost:23456/graphql')
})