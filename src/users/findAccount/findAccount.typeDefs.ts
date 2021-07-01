import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    findEmail(email: String!): MutationResponse!
    findPhone(phoneNumber: String!): MutationResponse!
  }
`;
