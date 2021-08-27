## Test
- 메일 보내기
<details>
<summary> &nbsp;코드 </summary>

```ts
const resolvers: Resolvers = {
  Query: {
    sendMail: () => {
      const transporter = nodemailer.createTransport(
        smtpTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PW,
          },
        })
      );

      const mailOptions = {
        from: process.env.MAIL_ID,
        to: 'mcm8681@naver.com',
        subject: 'email send test',
        text: 'test',
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          throw new Error(err.message);
        } else {
          console.log(info.response);
        }
      });
      return true;
    },
  },
};
```
</details>

## 📲 &nbsp;&nbsp;Computed Field
- 프로필 거래현황
<details>
<summary> &nbsp;코드 </summary>

```ts
const resolvers: Resolvers = {
  User: {
    
    ...

    waitingProductCount: ({ userId }, _, { client }) =>
      client.product.count({
        where: {
          authorId: userId,
          status: 'WAITING',
        },
      }),
    ongoingProductCount: ({ userId }, _, { client }) =>
      client.product.count({
        where: {
          authorId: userId,
          status: 'ONGOING',
        },
      }),
    completedProductCount: ({ userId }, _, { client }) =>
      client.product.count({
        where: {
          authorId: userId,
          status: 'COMPLETED',
        },
      }),
  },
};
```
</details>

## 📃 &nbsp;&nbsp;Qeury
- 내 게시물 보기
<details>
<summary> &nbsp;코드 </summary>

```ts
const resolvers: Resolvers = {
  Query: {
    seeMyProducts: protectedResolver((_, { authorId, lastId }, { client }) =>
      client.product.findMany({
        where: { authorId },
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      })
    ),
  },
};
```
</details>