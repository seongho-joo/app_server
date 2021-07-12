import { gql } from 'apollo-server-express';

export default gql`
  type findEmailResult {
    ok: Boolean!
    error: String
    user: User
  }
  type Query {
    findEmail(phoneNumber: String!): findEmailResult!
  }
`;
