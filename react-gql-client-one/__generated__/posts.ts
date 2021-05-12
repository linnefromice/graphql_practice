/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: posts
// ====================================================

export interface posts_posts {
  __typename: 'Post';
  id: number | null;
  title: string | null;
  body: string | null;
  published: boolean | null;
}

export interface posts {
  posts: (posts_posts | null)[] | null;
}
