import { gql } from 'apollo-server-express';

export default gql`
  type loginResult {
    ok: Boolean!
    token: String
    error: String
  }
  type Mutation {
    emailSignIn(email: String!, password: String!): loginResult!
  }
`;
