import { gql } from 'apollo-server-core';

export default gql`
  type Mutation {
    deletePost(id: Int!): MutationResponse!
  }
`;
