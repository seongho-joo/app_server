import { Identity, Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    roleUpdate: async (_, { userId }, { client }) => {
      const user: Identity | null = await client.user.findUnique({
        where: { userId },
        select: { userId: true },
      });
      if (!user) {
        return { ok: false, error: 'userId가 존재하지 않음' };
      }
      await client.user.update({ where: { userId }, data: { role: 'ADMIN' } });
      return { ok: true };
    },
  },
};

export default resolvers;
