import { Resolvers, Identity } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    deleteSearchHistory: protectedResolver(async (_, { id }, { client }) => {
      const exHistory: Identity | null = await client.searchHistory.findUnique({
        where: { id },
        select: { id: true },
      });
      if (!exHistory) {
        return {
          ok: false,
          error: '검색 기록을 찾을 수 없습니다.',
        };
      }
      await client.searchHistory.delete({ where: { id } });
      return { ok: true };
    }),
  },
};

export default resolvers;
