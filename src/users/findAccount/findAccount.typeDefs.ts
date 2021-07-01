import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    findEmail(email: String!): MutationResoponse!
    findPhone(phoneNumber: String!): MutationResoponse!
  }
`;
