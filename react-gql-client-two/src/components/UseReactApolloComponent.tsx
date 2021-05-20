import { VFC, useState } from 'react';
import {
  useCreateDraftMutation,
  useGetDraftsQuery,
  useGetPostsQuery,
  usePublishMutation,
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
export const MutationReactApolloComponent: VFC = () => {
  const [body, setBody] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [draftId, setDraftId] = useState<number>(1)
  const [createDraftMutation] = useCreateDraftMutation();
  const [publishMutation] = usePublishMutation();

  return (
    <>
      <form onSubmit={e => {
        void createDraftMutation({
          variables: {
            body,
            title
          }
        })
      }}>
        <p>
          TITLE: <input ref={node => {
            if (node) setBody(node.value)
          }} />
          BODY: <input ref={node => {
            if (node) setTitle(node.value)
          }} />
        </p>
        <button type="submit">Create Draft</button>
      </form>
      <form onSubmit={e => {
        void publishMutation({
          variables: {
            draftId
          }
        })
      }}>
        <p>
          DraftId: <input ref={node => {
            if (node && Number.isInteger(node.value)) setDraftId(parseInt(node.value, 10))
          }} />
        </p>
        <button type="submit">Create Draft</button>
      </form>
    </>
  );
}