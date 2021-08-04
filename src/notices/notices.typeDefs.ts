import { gql } from 'apollo-server-express';

export default gql`
  type Notice {
    id: Int!
    adminId: Int!
    admin: User
    title: String!
    content: String!
    image: Upload
    sortation: Sortation! # 공지사항, 이벤트 구분
    createdAt: Date!
    updatedAt: Date!
  }

  enum Sortation {
    EVENT
    NOTICE
  }
`;
