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

const schema = gql`
  type Query {
    me: User
    users: [User!]
    user(id: ID!): User
    author: Author
  }
  type User {
    id: ID!
    username: String!
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
  },
  User: {
    username: (user: User) => `${user.firstName} ${user.lastName}`
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