import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDraft: Post;
  publish?: Maybe<Post>;
};

export type MutationCreateDraftArgs = {
  title: Scalars['String'];
  body: Scalars['String'];
};

export type MutationPublishArgs = {
  draftId: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  id?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  published?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  drafts?: Maybe<Array<Maybe<Post>>>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type GetDraftsQueryVariables = Exact<{ [key: string]: never }>;

export type GetDraftsQuery = { __typename?: 'Query' } & {
  drafts?: Maybe<
    Array<
      Maybe<
        { __typename?: 'Post' } & Pick<
          Post,
          'id' | 'title' | 'body' | 'published'
        >
      >
    >
  >;
};

export type GetPostsQueryVariables = Exact<{ [key: string]: never }>;

export type GetPostsQuery = { __typename?: 'Query' } & {
  posts?: Maybe<
    Array<
      Maybe<
        { __typename?: 'Post' } & Pick<
          Post,
          'id' | 'title' | 'body' | 'published'
        >
      >
    >
  >;
};

export const GetDraftsDocument = gql`
  query getDrafts {
    drafts {
      id
      title
      body
      published
    }
  }
`;
export const GetPostsDocument = gql`
  query getPosts {
    posts {
      id
      title
      body
      published
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    getDrafts(
      variables?: GetDraftsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetDraftsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetDraftsQuery>(GetDraftsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getDrafts'
      );
    },
    getPosts(
      variables?: GetPostsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetPostsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetPostsQuery>(GetPostsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getPosts'
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;