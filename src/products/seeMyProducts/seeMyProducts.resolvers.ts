import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Query: {
    seeMyProducts: protectedResolver((_, { authorId, lastId }, { client }) =>
      client.product.findMany({
        where: { authorId },
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      })
    ),
  },
};

export default resolvers;
