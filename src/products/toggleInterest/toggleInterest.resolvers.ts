import { Interest } from '@prisma/client';
import { Identity, Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

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

export default resolvers;
