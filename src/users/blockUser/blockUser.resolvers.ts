import { Identity, Resolvers } from '../../types';
import { protectedResolver } from '../user.utils';

const resolvers: Resolvers = {
  Mutation: {
    blockUser: protectedResolver(
      async (_, { userId }, { client, loggedInUser }) => {
        const user: Identity | null = await client.user.findUnique({
          where: { userId },
          select: { userId: true },
        });
        if (!user) {
          return { ok: false, error: '유저가 없음' };
        }
        await client.user.update({
          where: { userId: loggedInUser.userId },
          data: { blocking: { connect: { userId } } },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
