import { gql } from 'apollo-server-express';

export default gql`
  type Banner {
    id: Int!
    file: String!
    createAt: Date!
    updateAt: Date!
  }
`;
