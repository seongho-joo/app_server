## ⌨️ &nbsp;&nbsp;Refactoring
- 가입할때 기본 이미지 URL 추가
- 프로필 사진 삭제 시 기본 이미지로 변경

## 📃 &nbsp;&nbsp;Qeury
- 차단한 유저 보기
<details>
<summary> &nbsp;코드 </summary>

```ts
const resolvers: Resolvers = {
  Query: {
    seeBlockingUser: protectedResolver(
      async (_, { lastId }, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        return await client.user.findUnique({ where: { userId } }).blocking({
          take: 10,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { userId: lastId } }),
        });
      }
    ),
  },
};
```
</details>

## ⚙️ &nbsp;&nbsp;Mutation
- 사용자 차단 & 차단 해제
<details>
<summary> &nbsp;코드 </summary>

```ts
// 차단하기
const resolvers: Resolvers = {
  Mutation: {
    blockUser: protectedResolver(
      async (_, { userId }, { client, loggedInUser }) => {
        const user: Identity | null = await client.user.findUnique({
          where: { userId },
          select: { userId: true },
        });
        if (!user) {
          return { ok: false, error: '유저가 없음' };
        }
        await client.user.update({
          where: { userId: loggedInUser.userId },
          data: { blocking: { connect: { userId } } },
        });
        return { ok: true };
      }
    ),
  },
};
// 차단 해제
const resolvers: Resolvers = {
  Mutation: {
    unblockUser: protectedResolver(
      async (_, { userId }, { client, loggedInUser }) => {
        const user: Identity | null = await client.user.findUnique({
          where: { userId },
          select: { userId: true },
        });
        if (!user) {
          return { ok: false, error: '유저가 없음' };
        }
        await client.user.update({
          where: { userId: loggedInUser.userId },
          data: { blocking: { disconnect: { userId } } },
        });
        return { ok: true };
      }
    ),
  },
};
```
</details>