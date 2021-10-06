import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seePost: async (_, { id }, { client }) =>
      await client.post.findUnique({ where: { id } }),
  },
};

export default resolvers;
