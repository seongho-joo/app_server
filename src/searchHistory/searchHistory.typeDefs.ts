import { gql } from 'apollo-server-express';

export default gql`
  type SearchHistory {
    id: Int!
    word: String!
    createdAt: String!
    updatedAt: String!
  }
`;
