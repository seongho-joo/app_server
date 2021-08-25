import { gql } from 'apollo-server-express';

export default gql`
  type Notice {
    id: Int!
    adminId: Int!
    admin: User
    title: String! # 제목
    content: String! # 내용
    image: String # 공지 이미지
    sortation: Sortation! # 공지사항, 이벤트 구분
    createdAt: Date!
    updatedAt: Date!
  }

  enum Sortation {
    EVENT
    NOTICE
  }
`;
