import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    deleteProduct(id: Int!): MutationResponse!
  }
`;
