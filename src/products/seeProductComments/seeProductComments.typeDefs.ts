import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    seeProductComments(productId: Int!, lastId: Int): [Comment]
  }
`;
