### EC2 인스턴스 테스트 진행
- 테스트를 진행 해보니 서버 메모리 1GB는 돌아가긴하나 서버 터미널이 버벅거려서 사용이 어려울것 같음
- 서버 메모리는 최소 2GB이상 사용해야될것 같음

### pm2 설치 및 에러수정
- AWS 서버를 이용했을때 터미널을 닫아도 서버는 계속 실행시키기 위해 설치
- pm2 log를 보니 에러가 모든 코드에서 에러가 떠서 수정함
- [수정내역](https://github.com/seongho-joo/majgo_server/commit/c8d0406cb5946735f157df51d506615df790c8bd)

### 코드 리팩터링
- `env` 값을 이용할 경우 값이 `undefined`일 경우 error를 throw하는 코드 추가
- `uploadToS3` 함수에 선택적 매개변수 추가
- S3 배너 업로드 `objectName` 추가
- 상품 삭제 코드에 있는 S3 오브젝트 삭제할때 필요한 `param`을 구하는 코드를 삭제 후 `deleteObjectsS3` 함수에 재 작성
- 배너 삭제할때 필요한 단일 오브젝트 삭제 구현
- aws 리전 이름이 포함된 경우와 안된 경우를 나눠 url 값 변경
- scala Date 추가 및 `createAt`,  `updateAt` 리턴 값 변경

### 댓글 삭제
```ts
type Mutation {
  deleteComment(id: Int!): MutationResponse!
}

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

### 배너 생성, 삭제, 보기
```ts
// 생성
type Mutation {
  createBanner(file: Upload!): MutationResponse!
}
const resolvers: Resolvers = {
  Mutation: {
    createBanner: async (_, { file }, { client }) => {
      if (!file) {
        return { ok: false, error: '이미지가 없음' };
      }
      const fileUrl: string = await uploadToS3(file, 'banners');
      await client.banner.create({ data: { file: fileUrl } });
      return { ok: true };
    },
  },
};
// 삭제
type Mutation {
  deleteBanner(id: Int!): MutationResponse!
}
const resolvers: Resolvers = {
  Mutation: {
    deleteBanner: async (_, { id }, { client }) => {
      const banner: Banner | null = await client.banner.findUnique({
        where: { id },
      });
      if (!banner) {
        return { ok: false, error: '해당 id는 존재하지 않음' };
      }
      await deleteObjectsS3(banner.file);
      await client.banner.delete({ where: { id } });
      return { ok: true };
    },
  },
};

// 보기
type Query {
  seeBanner: [Banner]
}
const resolvers: Resolvers = {
  Query: {
    seeBanner: (_, __, { client }) => client.banner.findMany(),
  },
};
```

### 유저 Role
- Role 열거형 추가
- user 테이블 및 TypeDefs `role`필드 추가
```ts
enum Role {
    ADMIN
    USER
}
```
- roleUpdate
```ts
const resolvers: Resolvers = {
  Mutation: {
    roleUpdate: async (_, { userId }, { client }) => {
      const user: Identity | null = await client.user.findUnique({
        where: { userId },
        select: { userId: true },
      });
      if (!user) {
        return { ok: false, error: 'userId가 존재하지 않음' };
      }
      await client.user.update({ where: { userId }, data: { role: 'ADMIN' } });
      return { ok: true };
    },
  },
};
```

### 상품 거래 상태
- Product 테이블 및 typeDefs `Status` 열거형 추가 
- `status` 필드 추가
- 거래 상태 변경
```ts
const resolvers: Resolvers = {
  Mutation: {
    transactionStatusUpdate: protectedResolver(
      async (_, { id, status }, { client, loggedInUser }) => {
        const product: Identity | null = await client.product.findUnique({
          where: { id },
          select: { id: true },
        });
        if (!product) {
          return { ok: false, error: 'id가 존재하지 않음' };
        }
        await client.product.update({
          where: { id },
          data: { status },
        });
        return { ok: true };
      }
    ),
  },
};
```