import { Comment } from '@prisma/client';
import { protectedResolver } from '../../users/user.utils';
import { Identity, Resolvers } from './../../types.d';

const resolvers: Resolvers = {
  Mutation: {
    createComment: protectedResolver(
      async (_, { productId, comment }, { loggedInUser, client }) => {
        const { userId } = loggedInUser;
        const product: Identity | null = await client.product.findUnique({
          where: { id: productId },
          select: { id: true },
        });

        if (!product) {
          return {
            ok: false,
            error: '게시글이 존재하지 않음',
          };
        }
        await client.comment.create({
          data: {
            comment,
            author: {
              connect: { userId },
            },
            product: {
              connect: { id: productId },
            },
          },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
