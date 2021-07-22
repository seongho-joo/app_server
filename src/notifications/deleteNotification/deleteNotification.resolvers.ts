import { Identity, Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    deleteNotification: protectedResolver(async (_, { id }, { client }) => {
      const exNotifi: Identity = await client.notification.findUnique({
        where: { id },
        select: { id: true },
      });
      if (!exNotifi) {
        return {
          ok: false,
          error: '알림을 찾을 수 없음',
        };
      }
      await client.notification.delete({
        where: { id },
      });
      return { ok: true };
    }),
  },
};

export default resolvers;
