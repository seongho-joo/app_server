import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    seeProduct(id: Int!): Product!
  }
`;
