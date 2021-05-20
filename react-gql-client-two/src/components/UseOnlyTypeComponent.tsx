import { VFC } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Query, Post } from '../graphql/__generated__/operations/graphql';

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
export const DraftsComponent: VFC = () => {
  const { loading, error, data } = useQuery<Query>(GET_DRAFTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.toString()}</p>;
  if (!data) return <div>Error : data is undefined</div>;

  return (
    <ul>
      {data.drafts.map((draft) => {
        const { id, title, body, published }: Post = draft;
        return (
          <li key={`draft.${id.toString()}`}>
            {`${title!} / ${body!} / ${published ? 'Published' : 'Draft'}`}
          </li>
        );
      })}
    </ul>
  );
};
export const PostsComponent: VFC = () => {
  const { loading, error, data } = useQuery<Query>(GET_POSTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.toString()}</p>;
  if (!data) return <div>Error : data is undefined</div>;

  return (
    <ul>
      {data.posts.map((post) => {
        const { id, title, body, published }: Post = post;
        return (
          <li key={`post.${id.toString()}`}>
            {`${title!} / ${body!} / ${published ? 'Published' : 'Draft'}`}
          </li>
        );
      })}
    </ul>
  );
};