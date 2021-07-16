import { protectedResolver } from './../../users/user.utils';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    createSearchHistory: protectedResolver(
      async (_, { word }, { client, loggedInUser }) => {
        const exWord = await client.searchHistory.findFirst({
          where: { word, userId: loggedInUser.userId },
          select: { id: true },
        });
        if (exWord) {
          // 이미 검색한 기록이 있을때 updateAt만 변경해줌
          await client.searchHistory.update({
            where: {
              id: exWord.id,
            },
            data: {
              word,
            },
          });
        } else {
          await client.searchHistory.create({
            data: {
              word,
              user: {
                connect: { userId: loggedInUser.userId },
              },
            },
          });
        }
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
