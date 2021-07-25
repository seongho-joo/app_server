### EC2 인스턴스 테스트 진행
- 테스트를 진행 해보니 서버 메모리 1GB는 돌아가긴하나 서버 터미널이 버벅거려서 사용이 어려울것 같음
- 서버 메모리는 최소 2GB이상 사용해야될것 같음

### pm2 설치 및 에러수정
- AWS 서버를 이용했을때 터미널을 닫아도 서버는 계속 실행시키기 위해 설치
- pm2 log를 보니 에러가 모든 코드에서 에러가 떠서 수정함
- [수정내역](https://github.com/seongho-joo/majgo_server/commit/c8d0406cb5946735f157df51d506615df790c8bd)

### 댓글 삭제
```ts
type Mutation {
  deleteComment(id: Int!): MutationResponse!
}

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: protectedResolver(
      async (_, { id }, { loggedInUser, client }) => {
        const comment: Comment | null = await client.comment.findUnique({
          where: { id },
        });
        if (!comment) {
          return { ok: false, error: '댓글이 없음' };
        }
        if (loggedInUser.userId !== comment.authorId) {
          return { ok: false, error: '권한이 없음' };
        }
        await client.comment.delete({ where: { id } });
        return { ok: true };
      }
    ),
  },
};
```

### 상품 상세보기에서 댓글 보기
```ts
comments: ({ id }, _, { client }) =>
  client.product.findUnique({ where: { id } }).comments(),
```

### 상품 삭제 시 댓글이 존재하면 댓글 삭제 후 삭제 진행
```ts
const comment: Comment[] | null = await client.comment.findMany({
  where: { productId: id },
});
if (comment.length !== 0) {
  await client.comment.deleteMany({ where: { productId: id } });
}
```

### 댓글 수정
```ts
const resolvers: Resolvers = {
  Mutation: {
    editComment: protectedResolver(
      async (_, { id, payload }, { client, loggedInUser }) => {
        const comment: Comment | null = await client.comment.findUnique({
          where: { id },
        });
        if (!comment) {
          return {
            ok: false,
            error: '댓글이 존재하지 않음',
          };
        }
        if (loggedInUser.userId !== comment.authorId) {
          return {
            ok: false,
            error: '권한이 없음',
          };
        }
        await client.comment.update({
          where: { id },
          data: { comment: payload },
        });
        return { ok: true };
      }
    ),
  },
};
```