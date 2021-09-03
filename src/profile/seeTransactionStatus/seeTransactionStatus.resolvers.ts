import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

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

export default resolvers;
