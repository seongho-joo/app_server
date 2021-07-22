import { Resolvers, Identity } from '../../types';

const resolvers: Resolvers = {
  Query: {
    selectEmail: async (_, { email }, { client }) => {
      const user: Identity | null = await client.user.findUnique({
        where: { email },
        select: { userId: true },
      });
      if (!user) {
        return { ok: false, error: '입력하신 정보를 다시 확인해주세요 !' };
      } else {
        return { ok: true };
      }
    },
    selectPhone: async (_, { phoneNumber }, { client }) => {
      const user: Identity | null = await client.user.findUnique({
        where: { phoneNumber },
        select: { userId: true },
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
