import { VFC } from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css';
import {
  drafts as Drafts,
  drafts_drafts as DraftsDrafts,
} from '../__generated__/drafts';
import {
  posts as Posts,
  posts_posts as PostsPosts,
} from '../__generated__/posts';

const GET_DRAFTS = gql`
  query drafts {
    drafts {
      id
      title
      body
      published
    }
  }
`;

const GET_POSTS = gql`
  query posts {
    posts {
      id
      title
      body
      published
    }
  }
`;

const DraftsComponent: VFC = () => {
  const { loading, error, data } = useQuery<Drafts>(GET_DRAFTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.toString()}</p>;
  if (!data) return <div>Error : data is undefined</div>;

  return (
    <ul>
      {data.drafts!.map((draft) => {
        if (!draft) return <></>;
        const { id, title, body, published }: DraftsDrafts = draft;
        return (
          <li key={`draft.${id!.toString()}`}>
            {`${title!} / ${body!} / ${published ? 'Published' : 'Draft'}`}
          </li>
        );
      })}
    </ul>
  );
};

const PostsComponent: VFC = () => {
  const { loading, error, data } = useQuery<Posts>(GET_POSTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.toString()}</p>;
  if (!data) return <div>Error : data is undefined</div>;

  return (
    <ul>
      {data.posts!.map((post) => {
        if (!post) return <></>;
        const { id, title, body, published }: PostsPosts = post;
        return (
          <li key={`post.${id!.toString()}`}>
            {`${title!} / ${body!} / ${published ? 'Published' : 'Draft'}`}
          </li>
        );
      })}
    </ul>
  );
};

const App: VFC = () => (
  <div>
    <h4>Drafts</h4>
    <DraftsComponent />
    <h4>Posts</h4>
    <PostsComponent />
  </div>
);

export default App;
