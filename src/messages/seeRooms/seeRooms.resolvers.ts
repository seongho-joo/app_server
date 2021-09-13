import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Query: {
    seeRooms: protectedResolver(async (_, __, { client, loggedInUser }) => {
      const { userId } = loggedInUser;
      return await client.room.findMany({
        where: {
          users: { some: { userId } },
        },
      });
    }),
  },
};

export default resolvers;
