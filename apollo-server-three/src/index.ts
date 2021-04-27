import { ApolloServer, gql } from 'apollo-server';
import fs from 'fs';

type ID = string;
enum TodoStatus {
  done = 'done',
  pending = 'pending',
}
interface Comment {
  todoid: ID;
  commentid: string;
  content?: string;
}
interface Todo {
  id: ID;
  name?: string;
  description?: string;
  priority?: number;
  status?: TodoStatus;
  comments?: Comment[];
}
interface TodoConnection {
  todos: Todo[];
  nextToken: string;
}

// DataSource
const comments: Comment[] = [
  {
    todoid: '1',
    commentid: '1',
    content: 'content 1',
  },
  {
    todoid: '1',
    commentid: '2',
    content: 'content 2',
  },
  {
    todoid: '5',
    commentid: '3',
    content: 'content 3',
  },
];
const todos: Todo[] = [
  {
    id: '1',
    name: 'TODO name 1',
    description: 'TODO description 1',
    priority: 1,
    status: TodoStatus.done,
  },
  {
    id: '2',
    name: 'TODO name 2',
    description: 'TODO description 2',
    priority: 2,
    status: TodoStatus.pending,
  },
  {
    id: '3',
    name: 'TODO name 3',
    description: 'TODO description 3',
    priority: 3,
    status: TodoStatus.done,
  },
  {
    id: '4',
    name: 'TODO name 4',
    description: 'TODO description 4',
    priority: 4,
    status: TodoStatus.pending,
  },
  {
    id: '5',
    name: 'TODO name 5',
    description: 'TODO description 5',
    priority: 5,
    status: TodoStatus.done,
  },
  {
    id: '6',
    name: 'TODO name 6',
    description: 'TODO description 6',
    priority: 6,
    status: TodoStatus.pending,
  },
];

const typeDefs = gql(fs.readFileSync('schema.graphql', 'utf8'));
const resolvers = {
  Query: {
    getTodos: (parent: any, args: any, context: any) => {
      const { limit, nextToken } = args;
      const index = todos.findIndex((todo) => todo.id === nextToken);
      const resultTodos = todos.slice(index, index + limit);

      const response: TodoConnection = {
        todos: resultTodos,
        nextToken: todos[index + limit]?.id,
      };
      return response;
    },
  },
  Mutation: {
    addTodo: async (parent: any, args: any, context: any) => {
      return {};
    },
    addComment: async (parent: any, args: any, context: any) => {
      return {};
    },
  },
  Todo: {
    comments: (todo: Todo, args: any) =>
      comments.filter((comment) => comment.todoid === todo.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
