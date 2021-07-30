### Refactoring
- filename 특수문자 제거
- `userId` 비구조화 할당

### Computed fields
- 상품 관심 수 보기

### schema prisma
- Interest 모델 추가

### Qeury
나의 관심 목록 보기
<details>
<summary> 코드 </summary>

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
  