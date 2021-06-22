import { gql } from 'apollo-server-express';

export default gql`
  type loginResult {
    ok: Boolean!
    token: String
    error: String
  }
  type Mutation {
    login(
      kind: Int!
      phoneNumber: String
      email: String
      password: String
    ): loginResult!
  }
`;
