import { gql } from 'apollo-server-express';

export default gql`
  type Notification {
    id: Int!
    title: String! # 제목
    content: String! # 내용
    read: Boolean! # 읽음 유무
    image: String
    user: User!
    createdAt: Date!
    updatedAt: Date!
  }
`;
