import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    selectEmail(email: String!): MutationResponse!
    selectPhone(phoneNumber: String!): MutationResponse!
  }
`;
