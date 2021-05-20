import { VFC } from 'react';
import {
  useGetDraftsQuery,
  useGetPostsQuery,
} from '../graphql/__generated__/reactApollo/graphql';

export const DraftsReactApolloComponent: VFC = () => {
  const { data } = useGetDraftsQuery();
  if (!data) return <></>;

  return (
    <ul>
      {data.drafts.map((draft) => {
        const { id, title, body, published } = draft;
        return (
          <li key={`draft.${id.toString()}`}>
            {`${title!} / ${body!} / ${published ? 'Published' : 'Draft'}`}
          </li>
        );
      })}
    </ul>
  );
};
export const PostsReactApolloComponent: VFC = () => {
  const { data } = useGetPostsQuery();
  if (!data) return <></>;

  return (
    <ul>
      {data.posts.map((post) => {
        const { id, title, body, published } = post;
        return (
          <li key={`post.${id.toString()}`}>
            {`${title!} / ${body!} / ${published ? 'Published' : 'Draft'}`}
          </li>
        );
      })}
    </ul>
  );
};
