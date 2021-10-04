import { gql } from 'apollo-server-express';

export default gql`
  type Test {
    ok: Boolean!
    error: String
    post: Post
  }
  type Mutation {
    editPost(
      id: Int!
      title: String
      content: String
      newImages: [Upload]
      removeImages: [String]
    ): Test!
  }
`;
