import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    searchProduct(word: String!, lastId: Int): [Product]
  }
`;
