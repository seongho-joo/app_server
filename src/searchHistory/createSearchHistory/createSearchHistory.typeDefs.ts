import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    createSearchHistory(word: String!): MutationResponse!
  }
`;
