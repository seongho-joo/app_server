import {
  createSearchHistory,
  deleteSearchHisoty,
} from './../../searchHistory/searchHistory.utils';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    searchProduct: protectedResolver(
      async (_, { word, lastId }, { client, loggedInUser }) => {
        const userId = loggedInUser.userId;

        await createSearchHistory(word, userId);
        //
        const count: number = await client.searchHistory.count({
          where: { userId: loggedInUser.userId },
          orderBy: { updatedAt: 'asc' },
        });
        // 검색 기록이 10개 초과 시 제일 오래된 값 삭제
        if (count == 11) {
          await deleteSearchHisoty(userId);
        }

        return await client.product.findMany({
          where: {
            OR: [
              { title: { contains: word } },
              { content: { contains: word } },
            ],
          },
          skip: lastId ? 1 : 0,
          take: 20,
          ...(lastId && { cursor: { id: lastId } }),
        });
      }
    ),
  },
};

export default resolvers;
