import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Query: {
    seeNoticeList: (_, { lastId, sortation }, { client }) =>
      client.notice.findMany({
        where: { sortation },
        skip: lastId ? 1 : 0,
        take: 10,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};

export default resolvers;
