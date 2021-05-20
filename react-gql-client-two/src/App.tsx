import { VFC } from 'react';
import {
  DraftsComponent,
  PostsComponent
} from './components/UseOnlyTypeComponent';
import {
  DraftsRequestComponent,
  PostsRequestComponent,
} from './components/UseRequestComponent';
import {
  DraftsReactApolloComponent,
  PostsReactApolloComponent,
} from './components/UseReactApolloComponent';

const App: VFC = () => (
  <div>
    <h3>use typescript-operations</h3>
    <h4>Drafts</h4>
    <DraftsComponent />
    <h4>Posts</h4>
    <PostsComponent />
    <h3>use typescript-graphql-request</h3>
    <h4>Drafts</h4>
    <DraftsRequestComponent />
    <h4>Posts</h4>
    <PostsRequestComponent />
    <h3>use typescript-react-apollo</h3>
    <h4>Drafts</h4>
    <DraftsReactApolloComponent />
    <h4>Posts</h4>
    <PostsReactApolloComponent />
  </div>
);

export default App;
