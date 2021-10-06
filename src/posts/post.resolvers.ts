import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Post: {
    author: ({ authorId }, _, { client }) =>
      client.user.findUnique({ where: { userId: authorId } }),
  },
};

export default resolvers;
