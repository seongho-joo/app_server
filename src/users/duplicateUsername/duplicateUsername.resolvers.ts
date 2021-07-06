import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    duplicateUsername: async (_, { username }, { client }) => {
      const user: Object = await client.user.findUnique({
        where: { username },
        select: { username: true },
      });
      if (user) {
        return {
          ok: false,
          error: '이미 사용 중입니다.',
        };
      } else {
        return {
          ok: true,
        };
      }
    },
  },
};

export default resolvers;