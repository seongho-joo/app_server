import { User } from '@prisma/client';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    findEmail: async (_, { phoneNumber }, { client }) => {
      const user: User = await client.user.findUnique({
        where: { phoneNumber },
      });
      if (!user) {
        return {
          ok: false,
          error: '가입되지않은 회원입니다.',
        };
      }
      return {
        ok: true,
        user,
      };
    },
  },
};

export default resolvers;
