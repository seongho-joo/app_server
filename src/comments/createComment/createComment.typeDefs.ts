import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createComment(productId: Int!, comment: String!): MutationResponse!
  }
`;
