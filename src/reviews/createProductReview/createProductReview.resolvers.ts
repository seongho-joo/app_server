import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    createProductReview: protectedResolver(
      async (
        _,
        { productId, content, nondisclosure },
        { client, loggedInUser }
      ) => {
        const { userId } = loggedInUser;
        const product = await client.product.findUnique({
          where: { id: productId },
          select: { id: true },
        });
        if (!product) {
          return { ok: false, error: '상품이 존재하지않음' };
        }
        const review = await client.productReview.create({
          data: {
            writerId: userId,
            productId,
            content,
            nondisclosure,
          },
          select: { id: true },
        });
        // 특정 기간 후 공개처리
        setTimeout(async () => {
          const res = await client.productReview.findUnique({
            where: { id: review.id },
            select: { hide: true },
          });
          if (res) {
            if (res.hide) {
              await client.productReview.update({
                where: { id: review.id },
                data: { hide: false },
              });
            }
          }
        }, 259200000);
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
