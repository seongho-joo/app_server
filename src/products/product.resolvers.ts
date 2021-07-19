import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Product: {
    author: ({ authorId }, _, { client }) =>
      client.user.findUnique({ where: { userId: authorId } }),
  },
};

export default resolvers;
