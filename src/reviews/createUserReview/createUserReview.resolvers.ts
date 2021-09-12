import { Iot } from 'aws-sdk';
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
        // 특정 기간 후 공개처리
        setTimeout(async () => {
          const res = await client.userReview.findUnique({
            where: { id: review.id },
            select: { hide: true },
          });
          if (res) {
            if (res.hide) {
              await client.userReview.update({
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
