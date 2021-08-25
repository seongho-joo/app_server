import { Product } from '@prisma/client';
import { gql } from 'apollo-server-express';

export default gql`
  type Comment {
    id: Int!
    comment: String! # 댓글 내용
    author: User! # 댓글 작성자
    prodcut: Product! # 댓글을 작성한 상품
    isMine: Boolean! # 자신이 작성한 댓글인지 판별
    createdAt: Date!
    updatedAt: Date!
  }
`;
