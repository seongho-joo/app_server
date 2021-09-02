import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createUserReview(
      reciverId: Int!
      productId: Int
      content: String!
      organizer: Organizer!
      hide: Boolean
    ): MutationResponse!
  }
`;
