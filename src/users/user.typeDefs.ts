import { gql } from 'apollo-server-express';

export default gql`
  type User {
    username: String!
    fullName: String
    password: String
    phoneNumber: String!
    location: String!
    email: String
    createdAt: String!
    updatedAt: String!
  }
`;
