import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    transactionStatusUpdate: protectedResolver(
      async (_, { id, status }, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        const product = await client.product.findUnique({
          where: { id },
          select: { id: true, authorId: true },
        });
        if (!product) {
          return { ok: false, error: 'id가 존재하지 않음' };
        }
        if (product.authorId !== userId) {
          return { ok: false, error: '권한이 없음' };
        }
        await client.product.update({
          where: { id },
          data: { status },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
