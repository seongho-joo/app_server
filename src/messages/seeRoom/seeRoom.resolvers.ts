import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    seeRoom: protectedResolver(async (_, { id }, { client, loggedInUser }) => {
      const room = await client.room.findFirst({
        where: {
          id,
          users: { some: { userId: loggedInUser.userId } },
        },
        select: { id: true },
      });
      if (!room) {
        return null;
      }
      // read Messages
      await client.message.updateMany({
        where: {
          roomId: id,
          read: false,
          userId: { not: loggedInUser.userId },
        },
        data: {
          read: true,
        },
      });
      return await client.room.findFirst({
        where: {
          id,
          users: { some: { userId: loggedInUser.userId } },
        },
      });
    }),
  },
};

export default resolvers;
