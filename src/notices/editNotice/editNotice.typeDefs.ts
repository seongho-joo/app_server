import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    editNotice(
      id: Int!
      Title: String
      content: String
      Image: Upload
    ): MutationResponse!
  }
`;
