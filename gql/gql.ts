/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "#graphql\n   mutation CreateTweet($payload: CreateTweetData!) {\n        createTweet(payload: $payload){\n            id\n        }\n    }\n": types.CreateTweetDocument,
    "#graphql\nmutation FollowUser($to: ID!) {\n  followUser(to: $to)\n}\n": types.FollowUserDocument,
    "#graphql\nmutation UnfollowUser($to: ID!) {\n  unfollowUser(to: $to)\n}\n": types.UnfollowUserDocument,
    "#graphql\n    \n    query GetAllTweets{\n        getAllTweets {\n            id\n            content\n            imageURL\n            author {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n\n        }\n    }\n    ": types.GetAllTweetsDocument,
    "#graphql\n\n            query GetSignUrl($imageName: String!, $imageType: String!) {\n                    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n             }\n    ": types.GetSignUrlDocument,
    "#graphql\nquery VerifyUserGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n  \n": types.VerifyUserGoogleTokenDocument,
    "#graphql\nquery GetCurrentUser {\n  getCurrentUser {\n    id\n    profileImageURL\n    email\n    firstName\n    lastName\n    \n    recommendedUsers{\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n\n    followers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n\n    tweets{\n      id\n      content\n      author {\n        id\n        firstName\n        firstName\n        profileImageURL\n      }\n    }\n  }\n}\n": types.GetCurrentUserDocument,
    "#graphql\n  query GetUserById($id:ID!){\n    getUserById(id: $id){\n      id\n      firstName\n      lastName\n      profileImageURL\n\n    \n\n      followers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      tweets{\n        content\n        imageURL\n        id\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  }\n  ": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n   mutation CreateTweet($payload: CreateTweetData!) {\n        createTweet(payload: $payload){\n            id\n        }\n    }\n"): (typeof documents)["#graphql\n   mutation CreateTweet($payload: CreateTweetData!) {\n        createTweet(payload: $payload){\n            id\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nmutation FollowUser($to: ID!) {\n  followUser(to: $to)\n}\n"): (typeof documents)["#graphql\nmutation FollowUser($to: ID!) {\n  followUser(to: $to)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nmutation UnfollowUser($to: ID!) {\n  unfollowUser(to: $to)\n}\n"): (typeof documents)["#graphql\nmutation UnfollowUser($to: ID!) {\n  unfollowUser(to: $to)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    \n    query GetAllTweets{\n        getAllTweets {\n            id\n            content\n            imageURL\n            author {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n\n        }\n    }\n    "): (typeof documents)["#graphql\n    \n    query GetAllTweets{\n        getAllTweets {\n            id\n            content\n            imageURL\n            author {\n                id\n                firstName\n                lastName\n                profileImageURL\n            }\n\n        }\n    }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n\n            query GetSignUrl($imageName: String!, $imageType: String!) {\n                    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n             }\n    "): (typeof documents)["#graphql\n\n            query GetSignUrl($imageName: String!, $imageType: String!) {\n                    getSignedURLForTweet(imageName: $imageName, imageType: $imageType)\n             }\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nquery VerifyUserGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n  \n"): (typeof documents)["#graphql\nquery VerifyUserGoogleToken($token: String!) {\n  verifyGoogleToken(token: $token)\n}\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nquery GetCurrentUser {\n  getCurrentUser {\n    id\n    profileImageURL\n    email\n    firstName\n    lastName\n    \n    recommendedUsers{\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n\n    followers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n\n    tweets{\n      id\n      content\n      author {\n        id\n        firstName\n        firstName\n        profileImageURL\n      }\n    }\n  }\n}\n"): (typeof documents)["#graphql\nquery GetCurrentUser {\n  getCurrentUser {\n    id\n    profileImageURL\n    email\n    firstName\n    lastName\n    \n    recommendedUsers{\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n\n    followers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n\n    tweets{\n      id\n      content\n      author {\n        id\n        firstName\n        firstName\n        profileImageURL\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query GetUserById($id:ID!){\n    getUserById(id: $id){\n      id\n      firstName\n      lastName\n      profileImageURL\n\n    \n\n      followers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      tweets{\n        content\n        imageURL\n        id\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  }\n  "): (typeof documents)["#graphql\n  query GetUserById($id:ID!){\n    getUserById(id: $id){\n      id\n      firstName\n      lastName\n      profileImageURL\n\n    \n\n      followers {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      following {\n        id\n        firstName\n        lastName\n        profileImageURL\n      }\n      tweets{\n        content\n        imageURL\n        id\n        author {\n          id\n          firstName\n          lastName\n          profileImageURL\n        }\n      }\n    }\n  }\n  "];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;