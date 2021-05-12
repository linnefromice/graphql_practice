/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: drafts
// ====================================================

export interface drafts_drafts {
  __typename: 'Post';
  id: number | null;
  title: string | null;
  body: string | null;
  published: boolean | null;
}

export interface drafts {
  drafts: (drafts_drafts | null)[] | null;
}
