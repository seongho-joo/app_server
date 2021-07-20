import { Product } from '@prisma/client';
import { gql } from 'apollo-server-express';

export default gql`
  type Comment {
    id: Int!
    comment: String!
    author: User!
    prodcut: Product!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
