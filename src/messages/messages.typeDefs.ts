import { gql } from 'apollo-server-express';

export default gql`
  type Message {
    id: Int!
    payload: String!
    user: User!
    read: Boolean!
    room: Room!
    createdAt: Date!
    updatedAt: Date!
  }

  type Room {
    id: Int!
    users: [User]
    messages: [Message]
    product: Product!
    unreadTotal: Int!
    createdAt: Date!
    updatedAt: Date!
  }
`;
