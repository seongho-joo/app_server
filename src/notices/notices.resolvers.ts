import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Notice: {
    admin: ({ adminId }, _, { client }) =>
      client.user.findUnique({ where: { userId: adminId } }),
  },
};

export default resolvers;
