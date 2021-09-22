# Todo
- [x] 상품 분류 변경
- [x] 검색 기록 전체 삭제
- [x] 불필요한 컬럼 삭제 및 컬럼 추가
- [x] 다른 유저의 리뷰 보기
- [x] 내가 받은 사용자 후기 보기
- [ ] 거래 신청 (거래 정보 update)
- [ ] 거래 완료
- 커뮤니티
  - [ ] 게시글 작성
  - [ ] 게시글 수정
  - [ ] 게시글 삭제
  - [ ] 댓글 작성
  - [ ] 댓글 수정
  - [ ] 댓글 삭제

## 🔨 &nbsp;&nbsp;Modify Logic
- [상품 분류 추가](https://github.com/seongho-joo/majgo_server/commit/3e1c4df6e880e3efe1f4a7d73117be1d76840b0c)
  - `Classification` 열거형 및 `Product` 모델에 `classification` 필드 추가
- [상품 삭제 시 상품 리뷰 삭제](https://github.com/seongho-joo/majgo_server/commit/23b29668041850d76c6ef48a1bc24dd74284dbd1)
- [알림 이미지 컬럼 추가](https://github.com/seongho-joo/majgo_server/commit/7554820485fe52e4715defd48b9e310534d94607)

## ⚙️ &nbsp;&nbsp;Mutation
- [검색 기록 전체 삭제](../src/searchHistory/deleteAllSearchHistory/deleteAllSearchHistory.resolvers.ts)

## 📃 &nbsp;&nbsp;Qeury
- [유저 리뷰 보기](../src/reviews/seeUserReviews/seeUserReviews.resolvers.ts)

<!-- ## ⌨️ &nbsp;&nbsp;Refactoring

## 📲 &nbsp;&nbsp;Computed Field
  

 -->
