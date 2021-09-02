import { gql } from 'apollo-server-express';

export default gql`
  enum Organizer {
    PROVIDER
    RECIVER
  }
  type UserReview {
    id: Int!
    writerId: Int!
    reciverId: Int!
    prodcutId: Int
    content: String!
    organizer: Organizer!
    private: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  type ProductReview {
    id: Int!
    writerId: Int!
    productId: Int!
    content: String!
    createdAt: Date!
    updatedAt: Date!
  }
`;
