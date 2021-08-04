import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    seeProduct(id: Int!): Product
  }
`;
