import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    seeNoticeList(lastId: Int, sortation: Sortation!): [Notice]
  }
`;
