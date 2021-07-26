import { gql } from 'apollo-server-express';

export default gql`
  type Notification {
    id: Int!
    title: String!
    content: String!
    read: Boolean!
    user: User!
    createdAt: Date!
    updatedAt: Date!
  }
`;
