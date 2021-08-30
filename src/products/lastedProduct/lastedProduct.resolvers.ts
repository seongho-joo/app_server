import { Identity, Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    lastedProduct: protectedResolver(async (_, { id }, { client }) => {
      const product: Identity | null = await client.product.findUnique({
        where: { id },
        select: { id: true },
      });
      if (!product) {
        return { ok: false, error: '게시물을 찾을 수 없음' };
      }
      await client.product.update({
        where: { id },
        data: { updatedAt: new Date() },
      });
      return { ok: true };
    }),
  },
};

export default resolvers;
