import { Resolvers } from '../types';

const resolvers: Resolvers = {
  User: {
    duplicateUsername: async (_, { username }, { client }) => {
      const duplication = await client.user.findUnique({
        where: { username },
        select: { username: true },
      });
      if (!duplication) {
        return true;
      } else {
        return false;
      }
    },
    existEmail: async (_, { email }, { client }) => {
      const user = await client.user.findUnique({
        where: { email },
        select: { username: true },
      });
      if (user) {
        return true;
      } else {
        return false;
      }
    },
    existPhoneNumber: async (_, { phoneNumber }, { client }) => {
      const user = await client.user.findUnique({
        where: { phoneNumber },
        select: { username: true },
      });
      if (user) {
        return true;
      } else {
        return false;
      }
    },
  },
};

export default resolvers;
