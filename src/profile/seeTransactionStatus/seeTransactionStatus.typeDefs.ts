import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    seeTransactionStatus(userId: Int!, status: Status!): [Product]
  }
`;
