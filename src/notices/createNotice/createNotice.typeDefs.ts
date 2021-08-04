import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createNotice(
      title: String!
      content: String!
      sortation: Sortation!
      image: Upload
    ): MutationResponse!
  }
`;
