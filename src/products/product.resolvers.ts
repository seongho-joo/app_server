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
    hashtags: ({ id }, _, { client }) =>
      client.hashtag.findMany({
        where: { products: { some: { id } } },
      }),
    interests: ({ id }, _, { client }) =>
      client.interest.count({ where: { productId: id } }),
  },
};

export default resolvers;
