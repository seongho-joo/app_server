import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    insertNotification(
      userId: Int!
      title: String!
      content: String!
    ): MutationResponse!
  }
`;
