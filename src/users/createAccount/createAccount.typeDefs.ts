import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createAccount(
      username: String!
      fullName: String!
      password: String
      phoneNumber: String
      email: String
      location: String!
      kind: Int!
    ): MutationResponse!
  }
`;
