import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    findEmail: async (_, { email }, { client }) => {
      const user: Object = await client.user.findUnique({
        where: { email },
        select: { username: true },
      });
      if (!user) {
        return { ok: false, error: '입력하신 정보를 다시 확인해주세요 !' };
      } else {
        return { ok: true };
      }
    },
    findPhone: async (_, { phoneNumber }, { client }) => {
      const user: Object = await client.user.findUnique({
        where: { phoneNumber },
        select: { username: true },
      });
      if (!user) {
        return { ok: false, error: '입력하신 정보를 다시 확인해주세요 !' };
      } else {
        return { ok: true };
      }
    },
  },
};

export default resolvers;
