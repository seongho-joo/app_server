import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createProductReview(
      productId: Int!
      content: String!
      nondisclosure: Boolean
    ): MutationResponse!
  }
`;
