import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    editProfile(
      userId: Int!
      username: String
      location: String
    ): MutationResponse!
  }
`;
