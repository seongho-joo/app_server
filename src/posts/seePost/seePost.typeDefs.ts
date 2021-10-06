import { gql } from 'apollo-server-core';

export default gql`
  type Query {
    seePost(id: Int!): Post
  }
`;
