import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    insertNotification: async (_, { userId, title, content }, { client }) => {
      const exUser = await client.user.findUnique({
        where: { userId },
        select: { userId: true },
      });
      if (!exUser) {
        return {
          ok: false,
          error: '유저가 존재하지 않음',
        };
      }
      await client.notification.create({
        data: {
          user: {
            connect: { userId },
          },
          title,
          content,
        },
      });
      return { ok: true };
    },
  },
};

export default resolvers;
