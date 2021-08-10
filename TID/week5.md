### 개발 서버 lightsail로 바꿈

### Refactoring
- ~~filename 특수문자 제거~~
- `userId` 비구조화 할당
- ~~S3 url decoding~~
- user profile 아바타 변경 시 S3에 있는 파일 삭제 구현
- S3 dirName 매개변수 열거형으로 바꿈
- 여러 장의 사진을 업로드할때 중복되는 코드를 함수로 바꿈
- ~~`uploadToS3`함수에 `filname`이나 `title`에 공백이 포함될 시 제거하거나 '_' 로 치환~~
- S3 url 경로 수정 및 `filname`을 `Date.now()`로 변경

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

공지사항 및 이벤트 리스트 보기
<details>
<summary> &nbsp;코드 </summary>

```ts
const resolvers: Resolvers = {
  Query: {
    seeNoticeList: (_, { lastId, sortation }, { client }) =>
      client.notice.findMany({
        where: { sortation },
        skip: lastId ? 1 : 0,
        take: 10,
        ...(lastId && { cursor: { id: lastId } }),
      }),
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

공지사항 및 이벤트 삭제
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

공지사항 및 이벤트 수정
<details>
<summary> &nbsp;코드 </summary>

```ts
const resolvers: Resolvers = {
  Mutation: {
    editNotice: protectedResolver(
      async (_, { id, Title, content, Image }, { client, loggedInUser }) => {
        const { role } = loggedInUser;
        if (role !== 'ADMIN') {
          return { ok: false, error: '권한이 없음' };
        }

        const notice = await client.notice.findUnique({
          where: { id },
        });
        if (!notice) {
          return { ok: false, error: '존재하지 않음' };
        }

        const { image, title } = notice;
        let imageUrl: string = '';
        // 변경할 이미지와 이미지가 존재할 경우 s3 오브젝트 삭제
        if (Image) {
          if (image) {
            await deleteObjectsS3(image);
          }
          imageUrl = await uploadToS3(Image, 'notices', _, title);
        }

        await client.notice.update({
          where: { id },
          data: {
            ...(Title && { title: Title }),
            ...(content && { content }),
            ...(Image && { image: imageUrl }),
          },
        });

        return { ok: true };
      }
    ),
  },
};
```
</details>

<details>
<summary> &nbsp;코드 </summary>

```ts
const resolvers: Resolvers = {
  Mutation: {
    withdrawalAccount: protectedResolver(
      async (_, __, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        const user: User | null = await client.user.findUnique({
          where: { userId },
        });
        const comments = await client.comment.findFirst({
          where: { authorId: userId },
          select: { id: true },
        });
        const products = await client.product.findMany({
          where: { authorId: userId },
        });

        if (!user) {
          return { ok: false, error: '사용자가 존재하지 않음' };
        }
        // 프로필 사진이 존재할 경우 S3 오브젝트 삭제
        if (user.avatar) {
          await deleteObjectsS3(user.avatar);
        }

        if (products) {
          products.forEach(async (item: Product) => {
            const { id, picture } = item;
            const comment = await client.comment.findFirst({
              where: { productId: id },
            });
            // 사용자가 작성한 상품에 댓글이 있으면 삭제
            if (comment) {
              await client.comment.deleteMany({ where: { productId: id } });
            }
            if (picture.length !== 0) {
              await deleteObjectsS3(picture);
            }
          });
          // 사용자가 작성한 상품들 삭제
          await client.product.deleteMany({ where: { authorId: userId } });
        }
        // 사용자가 작성한 댓글들 삭제
        if (comments) {
          await client.comment.deleteMany({ where: { authorId: userId } });
        }

        await client.user.delete({ where: { userId } });

        return { ok: true };
      }
    ),
  },
};
```
</details>

휴대폰 번호 변경
### schema prisma
<details>
<summary> &nbsp;코드 </summary>

```ts
const resolvers: Resolvers = {
  Mutation: {
    editAccount: protectedResolver(
      async (_, { phoneNumber }, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        const user: Identity | null = await client.user.findUnique({
          where: { phoneNumber },
          select: { userId: true },
        });
        if (user) {
          return { ok: false, error: '이미 존재하는 번호입니다.' };
        }
        await client.user.update({ where: { userId }, data: { phoneNumber } });
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
