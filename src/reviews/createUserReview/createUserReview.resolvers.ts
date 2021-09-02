import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    createUserReview: protectedResolver(
      async (
        _,
        { reciverId, productId, content, organizer, hide },
        { client, loggedInUser }
      ) => {
        const { userId } = loggedInUser;
        await client.userReview.create({
          data: {
            writerId: userId,
            reciverId,
            productId,
            content,
            organizer,
            hide,
          },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
