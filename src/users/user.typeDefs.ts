import { gql } from 'apollo-server-express';

export default gql`
  type User {
    userId: Int!
    username: String!
    fullName: String!
    password: String!
    phoneNumber: String!
    location: String
    avatar: String
    email: String!
    searchHistoryOnOf: Boolean!
    notificationOnOf: Boolean!
    searchHistories: [SearchHistory]
    createdAt: String!
    updatedAt: String!
  }
`;
