import { Resolvers } from '../types';

const resolvers: Resolvers = {
  User: {
    isBlocking: async ({ userId }, _, { client, loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const user = await client.user.count({
        where: {
          username: loggedInUser.username,
          blocking: { some: { userId } },
        },
      });
      return Boolean(user);
    },
  },
};

export default resolvers;
