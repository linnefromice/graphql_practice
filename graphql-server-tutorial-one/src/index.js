const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const model = require('./model');
const schema = require('./schema');
const resolvers = require('./resolvers');

const app = express();
const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
        model,
        me: model.users[1],
        mike: model.users[3],
    }
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on http://localhost:8000/graphql');
});
