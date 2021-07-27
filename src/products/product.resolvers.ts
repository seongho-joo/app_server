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
    commentsCount: ({ id }, _, { client }) =>
      client.product.count({ where: { id } }),
    comments: ({ id }, { orderBy, lastId }, { client }) =>
      client.comment.findMany({
        where: { productId: id },
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: { createdAt: orderBy },
      }),
  },
};

export default resolvers;
