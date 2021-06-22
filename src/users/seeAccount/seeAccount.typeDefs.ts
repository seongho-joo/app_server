import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    seeAccount(username: String!): User
  }
`;
