import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Query: {
    seeNotifications: protectedResolver(
      async (_, { lastId }, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        return await client.notification.findMany({
          where: { userId },
          take: 10,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { id: lastId } }),
        });
      }
    ),
  },
};

export default resolvers;
