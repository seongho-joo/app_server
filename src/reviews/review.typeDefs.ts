import { gql } from 'apollo-server-express';

export default gql`
  enum Organizer {
    PROVIDER
    RECIVER
  }
  type UserReview {
    id: Int!
    writerId: Int! # 후기 작성자
    reciverId: Int! # 후기를 받는 사람
    prodcutId: Int # 상품 -> 상호간의 후기를 작성했는지를 파악하기위해 추가함
    content: String! # 후기 내용
    organizer: Organizer! # 주최자 (대여자, 받는 사람)
    hide: Boolean # 비공개 여부
    createdAt: Date!
    updatedAt: Date!
  }

  type ProductReview {
    id: Int!
    writerId: Int! # 후기 작성자
    productId: Int! # 상품
    content: String! # 물품 후기 내용
    hide: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }
`;
