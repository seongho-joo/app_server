import { gql } from 'apollo-server-core';

export default gql`
  type CheckList {
    id: Int!
    product: Product!
    checkList: String!
    createdAt: Date!
    updatedAt: Date!
  }
`;
