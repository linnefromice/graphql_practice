import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
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

/**
 * __useGetDraftsQuery__
 *
 * To run a query within a React component, call `useGetDraftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDraftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDraftsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDraftsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetDraftsQuery, GetDraftsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetDraftsQuery, GetDraftsQueryVariables>(
    GetDraftsDocument,
    options
  );
}
export function useGetDraftsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDraftsQuery,
    GetDraftsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetDraftsQuery, GetDraftsQueryVariables>(
    GetDraftsDocument,
    options
  );
}
export type GetDraftsQueryHookResult = ReturnType<typeof useGetDraftsQuery>;
export type GetDraftsLazyQueryHookResult = ReturnType<
  typeof useGetDraftsLazyQuery
>;
export type GetDraftsQueryResult = Apollo.QueryResult<
  GetDraftsQuery,
  GetDraftsQueryVariables
>;
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

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(
    GetPostsDocument,
    options
  );
}
export function useGetPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPostsQuery,
    GetPostsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(
    GetPostsDocument,
    options
  );
}
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<
  typeof useGetPostsLazyQuery
>;
export type GetPostsQueryResult = Apollo.QueryResult<
  GetPostsQuery,
  GetPostsQueryVariables
>;
