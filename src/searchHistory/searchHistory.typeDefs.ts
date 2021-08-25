import { gql } from 'apollo-server-express';

export default gql`
  type SearchHistory {
    id: Int!
    word: String! # 검색 단어
    createdAt: Date!
    updatedAt: Date!
  }
`;
