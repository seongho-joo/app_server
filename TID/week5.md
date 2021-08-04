### Refactoring
- filename 특수문자 제거
- `userId` 비구조화 할당
- S3 url decoding

### Computed fields
- Product
  - 상품 관심 수 보기
- Notice
  - 작성한 관리자 보기

### schema prisma
- Interest 모델 추가

### Qeury
나의 관심 목록 보기
<details>
<summary> &nbsp;코드 </summary>

```ts
const resolvers: Resolvers = {
  Query: {
    seeMyInterestLists: protectedResolver(
      async (_, __, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        const product = await client.interest.findMany({
          where: { userId },
          select: { product: true },
        });
        return product.map((item) => item.product);
      }
    ),
  },
};
```
</details>

공지사항, 이벤트 보기
<details>
<summary> &nbsp;코드 </summary>

```ts
const resolvers: Resolvers = {
  Query: {
    seeNotice: async (_, { id }, { client }) => {
      const notice: Notice | null = await client.notice.findUnique({
        where: { id },
      });
      if (!notice) {
        return null;
      }
      return notice;
    },
  },
};
```
</details>


### Mutation
관심 누르기? toggle 방식으로 구현
<details>
<summary> 코드 </summary>

```ts
const resolvers: Resolvers = {
  Mutation: {
    toggleInterest: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        const product: Identity | null = await client.product.findUnique({
          where: { id },
          select: { id: true },
        });
        if (!product) {
          return { ok: false, error: '상품이 존재하지않음' };
        }
        const interestWhere = {
          productId_userId: {
            productId: id,
            userId,
          },
        };
        const interest: Interest | null = await client.interest.findUnique({
          where: interestWhere,
        });
        if (interest) {
          await client.interest.delete({ where: interestWhere });
        } else {
          await client.interest.create({
            data: {
              user: { connect: { userId } },
              product: { connect: { id } },
            },
          });
        }
        return { ok: true };
      }
    ),
  },
};
```
</details>

공지사항, 이벤트 작성하기
<details>
<summary> &nbsp;코드 </summary>

```ts
const resolvers: Resolvers = {
  Mutation: {
    createNotice: protectedResolver(
      async (
        _,
        { title, content, sortation, image },
        { client, loggedInUser }
      ) => {
        const { userId, role } = loggedInUser;
        if (role !== 'ADMIN') {
          return { ok: false, error: '작성 권한이 없음' };
        }
        let imageUrl: string = '';
        if (image) {
          imageUrl = await uploadToS3(image, 'notices', _, title);
        }
        await client.notice.create({
          data: {
            adminId: userId,
            title,
            content,
            sortation,
            ...(image && { image: imageUrl }),
          },
        });
        return { ok: true };
      }
    ),
  },
};
```
</details>

공지사항 삭제
<details>
<summary> &nbsp;코드 </summary>

```ts
const resolvers: Resolvers = {
  Mutation: {
    deleteNotice: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const { role } = loggedInUser;
        if (role !== 'ADMIN') {
          return { ok: false, error: '권한이 없음' };
        }

        const notice = await client.notice.findUnique({
          where: { id },
          select: { id: true, image: true },
        });
        if (!notice) {
          return { ok: false, error: '존재하지 않음' };
        }

        const { image } = notice;
        if (image) {
          await deleteObjectsS3(image);
        }

        await client.notice.delete({ where: { id } });
        return { ok: true };
      }
    ),
  },
};
```
</details>

### pm2 무중단 배포 테스트 후 배포서버에 적용
pm2 모드를 `cluster`로 실행하기 위해 `ecosystem.config.js`를 생성
<details>
<summary> &nbsp;코드 </summary>

```js
module.exports = {
  apps: [
    {
      name: 'server',
      script: 'src/server.ts',
      instances: 0,
      exec_mode: 'cluster',
      wait_ready: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
    },
  ],
};

```
</details>

- [PM2를 활용한 Node.js 무중단 서비스하기](https://engineering.linecorp.com/ko/blog/pm2-nodejs/) 를 참고함