import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seeProduct: (_, { id }, { client }) =>
      client.product.findUnique({ where: { id } }),
  },
};

export default resolvers;
