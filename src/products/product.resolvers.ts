import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Product: {
    author: ({ authorId }, _, { client }) =>
      client.user.findUnique({ where: { userId: authorId } }),
    isMine: ({ authorId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return authorId === loggedInUser.userId;
    },
    comments: ({ id }, _, { client }) =>
      client.product.findUnique({ where: { id } }).comments(),
  },
};

export default resolvers;
