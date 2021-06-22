import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    editPassword(password: String!, email: String!): MutationResponse!
  }
`;
