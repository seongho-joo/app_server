import { gql } from 'apollo-server-express';

export default gql`
  type User {
    username: String!
    fullName: String!
    password: String
    phoneNumber: String!
    email: String
    duplicateUsername(username: String!): Boolean!
    existEmail(email: String!): Boolean!
    existPhoneNumber(phoneNumber: String!): Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
