import { gql } from 'apollo-server-express';

export default gql`
  type User {
    username: String!
    fullName: String!
    password: String
    phoneNumber: String!
    email: String
    isRegistered(kind: Int!, account: String!): Boolean!
    duplicateUsername(username: String!): Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
