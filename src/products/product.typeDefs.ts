import { gql } from 'apollo-server-express';

export default gql`
  type Product {
    id: Int!
    author: User!
    title: String!
    price: Int!
    hours: Int!
    picture: [String]
    hashtags: [Hashtag]
    hits: Int! # 조회수
    isMine: Boolean!
    content: String # 내용
    status: Status! # 거래 상태
    interests: Int! # 관심 수
    commentsCount: Int! # 댓글 수
    comments(orderBy: String!, lastId: Int): [Comment] # 댓글보기
    createdAt: Date!
    updatedAt: Date!
  }

  type Hashtag {
    id: Int!
    hashtag: String!
    products(page: Int!): [Product]
    totalPhotos: Int
    createdAt: Date!
    updatedAt: Date!
  }

  type Interest {
    id: Int!
    prodcut: Product!
    createdAt: Date!
    updatedAt: Date!
  }

  enum Status {
    WAITING
    ONGOING
    COMPLETED
  }
`;
