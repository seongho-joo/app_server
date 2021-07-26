import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    roleUpdate(userId: Int!): MutationResponse!
  }
`;
