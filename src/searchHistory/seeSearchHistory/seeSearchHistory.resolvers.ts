import { protectedResolver } from './../../users/user.utils';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seeSearchHistory: protectedResolver(
      async (_, __, { client, loggedInUser }) =>
        client.searchHistory.findMany({
          where: { userId: loggedInUser.userId },
          orderBy: { updatedAt: 'desc' },
        })
    ),
  },
};

export default resolvers;
