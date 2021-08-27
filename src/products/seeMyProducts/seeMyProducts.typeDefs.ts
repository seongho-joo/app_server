import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    seeMyProducts(authorId: Int!, lastId: Int): [Product]
  }
`;
