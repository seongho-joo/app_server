import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    createProductReview: protectedResolver(
      async (_, { productId, content, hide }, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        const product = await client.product.findUnique({
          where: { id: productId },
          select: { id: true },
        });
        if (!product) {
          return { ok: false, error: '상품이 존재하지않음' };
        }
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

export default resolvers;
