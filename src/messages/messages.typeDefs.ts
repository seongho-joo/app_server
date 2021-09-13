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
    user: [User]
    messages: [Message]
    product: Product!
    createdAt: Date!
    updatedAt: Date!
  }
`;
