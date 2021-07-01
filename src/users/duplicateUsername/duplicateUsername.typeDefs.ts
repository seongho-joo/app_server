import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    duplicateUsername(username: String!): MutationResponse!
  }
`;
