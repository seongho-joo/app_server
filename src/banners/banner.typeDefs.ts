import { gql } from 'apollo-server-express';

export default gql`
  type Banner {
    id: Int!
    file: String! # 배너 이미지
    createdAt: Date!
    updatedAt: Date!
  }
`;
