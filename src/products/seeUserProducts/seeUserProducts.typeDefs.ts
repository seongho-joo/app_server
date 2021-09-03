import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    seeUserProducts(userId: Int!, hastag: String): [Product]
  }
`;
