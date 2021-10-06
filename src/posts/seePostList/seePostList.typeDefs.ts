import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    seePostList(lastId: Int): [Post]
  }
`;
