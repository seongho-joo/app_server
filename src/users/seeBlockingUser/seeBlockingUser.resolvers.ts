import { Resolvers } from '../../types';
import { protectedResolver } from '../user.utils';

const resolvers: Resolvers = {
  Query: {
    seeBlockingUser: protectedResolver(
      async (_, { lastId }, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        return await client.user.findUnique({ where: { userId } }).blocking({
          take: 10,
          skip: lastId ? 1 : 0,
          ...(lastId && { cursor: { userId: lastId } }),
        });
      }
    ),
  },
};

export default resolvers;
