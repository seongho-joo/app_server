import { protectedResolver } from '../../users/user.utils';
import { Resolvers } from '../../types';
import { UserReview } from '.prisma/client';

const resolvers: Resolvers = {
  Query: {
    seeUserReviews: protectedResolver(
      async (_, { userId }, { client, loggedInUser }) => {
        let reviews: UserReview[] = [];
        if (userId === loggedInUser.userId) {
          return await client.userReview.findMany({
            where: { reciverId: userId },
          });
        }
        const publicReviews = await client.userReview.findMany({
          where: {
            reciverId: userId,
            hide: false,
            nondisclosure: false,
          },
        });
        // 작성자가 로그인한 유저일 경우만 볼 수 있음
        const privateReviews = await client.userReview.findMany({
          where: {
            hide: false,
            nondisclosure: true,
            AND: [{ reciverId: userId }, { writerId: loggedInUser.userId }],
          },
        });
        reviews = publicReviews.concat(privateReviews);
        return reviews;
      }
    ),
  },
};

export default resolvers;
