import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seeFeed: (_, { lastId }, { client }) =>
      client.product.findMany({
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: { createdAt: 'desc' },
      }),
  },
};

export default resolvers;
