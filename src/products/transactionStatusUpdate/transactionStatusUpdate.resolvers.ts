import { Identity, Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    transactionStatusUpdate: protectedResolver(
      async (_, { id, status }, { client, loggedInUser }) => {
        const product: Identity | null = await client.product.findUnique({
          where: { id },
          select: { id: true },
        });
        if (!product) {
          return { ok: false, error: 'id가 존재하지 않음' };
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
