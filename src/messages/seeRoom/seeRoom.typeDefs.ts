import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    seeRoom(id: Int!): Room
  }
`;
