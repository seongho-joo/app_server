import { Notice } from '@prisma/client';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seeNotice: async (_, { id }, { client }) => {
      const notice: Notice | null = await client.notice.findUnique({
        where: { id },
      });
      if (!notice) {
        return null;
      }
      return notice;
    },
  },
};

export default resolvers;
