import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    editPost(
      id: Int!
      title: String
      content: String
      newImages: [Upload]
      removeImages: [String]
    ): MutationResponse!
  }
`;
