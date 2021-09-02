import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    createProductReview: protectedResolver(
      async (_, { productId, content, hide }, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
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
