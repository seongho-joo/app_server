import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    editProfile(
      username: String
      location: String
      avatar: Upload
    ): MutationResponse!
  }
`;
