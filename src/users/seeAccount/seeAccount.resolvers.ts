import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seeAccount: (_, { userId }, { client }) =>
      client.user.findUnique({ where: { userId } }),
  },
};

export default resolvers;
