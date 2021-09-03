## 모델 추가
- 상품 후기

## ⌨️ &nbsp;&nbsp;Refactoring
- 필요없는 모듈 제거 및 권한 추가

## 📲 &nbsp;&nbsp;Computed Field
  
## ⚙️ &nbsp;&nbsp;Mutation
- 사용자 후기 작성
<details>
<summary> &nbsp;코드 </summary>

```ts
const resolvers: Resolvers = {
  Mutation: {
    createUserReview: protectedResolver(
      async (
        _,
        { reciverId, productId, content, organizer, hide },
        { client, loggedInUser }
      ) => {
        const { userId } = loggedInUser;
        await client.userReview.create({
          data: {
            writerId: userId,
            reciverId,
            productId,
            content,
            organizer,
            hide,
          },
        });
        return { ok: true };
      }
    ),
  },
};
```
</details>

- 물품 후기 작성
<details>
<summary> &nbsp;코드 </summary>

```ts
const resolvers: Resolvers = {
  Mutation: {
    createProductReview: protectedResolver(
      async (_, { productId, content, hide }, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        await client.productReview.create({
          data: {
            writerId: userId,
            productId,
            content,
            hide,
          },
        });
        return { ok: true };
      }
    ),
  },
};
```
</details>

## 📃 &nbsp;&nbsp;Qeury
- [프로필] 거래현황 상세보기
<details>
<summary> &nbsp;코드 </summary>

```ts
const resolvers: Resolvers = {
   Query: {
     seeTransactionStatus: protectedResolver(
       async (_, { userId, status }, { client }) => {
         const user = await client.user.findUnique({
           where: { userId },
           select: { userId: true },
         });
         if (!user) {
           return { ok: false, error: '유저를 찾을 수 없음' };
         }
         return await client.product.findMany({
           where: {
             authorId: userId,
             status,
           },
         });
       }
     ),
   },
 };
```
</details>

- [프로필] 게시물 보기(커뮤니티 구현x)
<details>
<summary> &nbsp;코드 </summary>

```ts
const resolvers: Resolvers = {
  Query: {
    seeUserProducts: protectedResolver(
      async (_, { userId, hashtag }, { client }) => {
        const user = await client.user.findUnique({
          where: { userId },
          select: { userId: true },
        });
        if (!user) {
          return { ok: false, error: '유저를 찾을 수 없음' };
        }
        return await client.product.findMany({
          where: {
            authorId: userId,
          },
        });
      }
    ),
  },
};
```
</details>