import { gql } from 'apollo-server-express';

export default gql`
  type Product {
    id: Int!
    author: User! # 작성자
    title: String! # 제목
    price: Int! # 가격
    minutes: Int!
    picture: [String] # 상품 이미지
    hashtags: [Hashtag]
    classificaiton: Classificaiton! # 빌려드림, 빌림 분류
    hits: Int! # 조회수
    isMine: Boolean! # 자신이 작성한 상품인지 판별
    content: String # 내용
    status: Status! # 거래 상태
    interests: Int! # 관심 수
    createdAt: Date!
    updatedAt: Date!
  }

  type Hashtag {
    id: Int!
    hashtag: String! # 해시태그 내용
    products(page: Int!): [Product] # 해당 해시태그를 단 상품
    createdAt: Date!
    updatedAt: Date!
  }

  type Interest {
    id: Int!
    prodcut: Product!
    createdAt: Date!
    updatedAt: Date!
  }

  enum Classificaiton {
    LEND # 빌려드림
    RENT # 빌림
  }

  enum Status {
    WAITING
    ONGOING
    COMPLETED
  }
`;
