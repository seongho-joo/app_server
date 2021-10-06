import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seePostList: async (_, { lastId }, { client }) =>
      await client.post.findMany({
        skip: lastId ? 1 : 0,
        take: 10,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: { createdAt: 'desc' },
      }),
  },
};

export default resolvers;
