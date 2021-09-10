import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';
import { twoWayCheck } from '../review.utils';

const resolvers: Resolvers = {
  Mutation: {
    createUserReview: protectedResolver(
      async (
        _,
        { reciverId, productId, content, organizer, nondisclosure },
        { client, loggedInUser }
      ) => {
        const { userId } = loggedInUser;
        const product = await client.product.findUnique({
          where: { id: productId },
          select: { id: true },
        });
        const review = await client.userReview.create({
          data: {
            writerId: userId,
            reciverId,
            ...(product && { productId }),
            content,
            organizer,
            nondisclosure,
          },
          select: { id: true },
        });
        twoWayCheck(review.id, reciverId, userId, productId, organizer);
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
