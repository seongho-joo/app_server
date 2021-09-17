import { protectedResolver } from './../../users/user.utils';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    deleteAllSearchHistory: protectedResolver(
      async (_, __, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        const searchHistory = await client.searchHistory.findFirst({
          where: { userId },
          select: { id: true },
        });
        if (!searchHistory) {
          return {
            ok: false,
            error: '검색기록이 존재하지 않음',
          };
        }
        await client.searchHistory.deleteMany({
          where: { userId },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
