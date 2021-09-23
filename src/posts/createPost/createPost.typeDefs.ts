import { gql } from 'apollo-server-core';

export default gql`
  type createPostResult {
    ok: Boolean!
    error: String
    post: Post
  }
  type Mutation {
    createPost(
      title: String!
      content: String!
      images: [Upload]
    ): createPostResult!
  }
`;
