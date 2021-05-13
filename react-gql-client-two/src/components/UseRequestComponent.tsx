import { useState, useEffect, VFC } from 'react';
import { GraphQLClient } from 'graphql-request';
import { getSdk, Post } from '../graphql/__generated__/request/graphql-request';

const sdk = getSdk(new GraphQLClient('http://localhost:4000'));
export const DraftsRequestComponent: VFC = () => {
  const [drafts, setDrafts] = useState<Post[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await sdk.getDrafts();
      // eslint-disable-next-line
      const datas: Post[] = response!.drafts!.map((d) => ({
        id: d?.id,
        title: d?.title,
        body: d?.body,
        published: d?.published,
      }));
      setDrafts(datas);
    };
    void fetch();
  }, []);

  return (
    <ul>
      {drafts.map((draft) => {
        if (!draft) return <></>;
        const { id, title, body, published }: Post = draft;
        return (
          <li key={`draft.${id!.toString()}`}>
            {`${title!} / ${body!} / ${published ? 'Published' : 'Draft'}`}
          </li>
        );
      })}
    </ul>
  );
};
export const PostsRequestComponent: VFC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await sdk.getPosts();
      // eslint-disable-next-line
      const datas: Post[] = response!.posts!.map((d) => ({
        id: d?.id,
        title: d?.title,
        body: d?.body,
        published: d?.published,
      }));
      setPosts(datas);
    };
    void fetch();
  }, []);

  return (
    <ul>
      {posts.map((post) => {
        if (!post) return <></>;
        const { id, title, body, published }: Post = post;
        return (
          <li key={`post.${id!.toString()}`}>
            {`${title!} / ${body!} / ${published ? 'Published' : 'Draft'}`}
          </li>
        );
      })}
    </ul>
  );
};
