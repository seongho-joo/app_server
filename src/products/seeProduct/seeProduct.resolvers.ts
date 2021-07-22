import { Product } from '@prisma/client';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    seeProduct: async (_, { id }, { client }) => {
      const exProduct: Product | null = await client.product.findUnique({
        where: { id },
      });
      if (!exProduct) {
        return null;
      }
      return await client.product.update({
        where: { id },
        data: { hits: exProduct.hits + 1 },
      });
    },
  },
};

export default resolvers;
