import { gql } from 'apollo-server-express';

export default gql`
  type User {
    userId: Int!
    username: String! # 사용자 닉네임
    fullName: String! # 사용자 이름
    password: String! # 비밀번호
    phoneNumber: String! # 휴대폰 번호
    location: String # 사용자 위치
    avatar: String # 프로필 이미지
    email: String! # 사용자 이메일
    role: Role! # 권한
    blocking: [User] # 차단한 유저
    isBlocking: Boolean! # 차단한 유저인지 판별
    waitingProductCount: Int! # 빌림 상품 수
    ongoingProductCount: Int! # 빌려드림 상품 수
    completedProductCount: Int! # 거래완료된 상품 수
    createdAt: Date!
    updatedAt: Date!
  }

  enum Role {
    ADMIN
    USER
  }
`;
