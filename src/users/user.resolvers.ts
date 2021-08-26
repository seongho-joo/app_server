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
    waitingProductCount: ({ userId }, _, { client }) =>
      client.product.count({
        where: {
          authorId: userId,
          status: 'WAITING',
        },
      }),
    ongoingProductCount: ({ userId }, _, { client }) =>
      client.product.count({
        where: {
          authorId: userId,
          status: 'ONGOING',
        },
      }),
    completedProductCount: ({ userId }, _, { client }) =>
      client.product.count({
        where: {
          authorId: userId,
          status: 'COMPLETED',
        },
      }),
  },
};

export default resolvers;
