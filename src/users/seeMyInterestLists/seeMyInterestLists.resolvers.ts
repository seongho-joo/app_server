import { Resolvers } from '../../types';
import { protectedResolver } from '../user.utils';

const resolvers: Resolvers = {
  Query: {
    seeMyInterestLists: protectedResolver(
      async (_, __, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        const product = await client.interest.findMany({
          where: { userId },
          select: { product: true },
        });
        return product.map((item) => item.product);
      }
    ),
  },
};

export default resolvers;
