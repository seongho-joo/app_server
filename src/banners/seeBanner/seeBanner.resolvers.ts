import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seeBanner: (_, __, { client }) => client.banner.findMany(),
  },
};

export default resolvers;
