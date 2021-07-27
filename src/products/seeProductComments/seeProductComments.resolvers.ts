import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    seeProductComments: async (_, { productId, lastId }, { client }) => {
      // 메인 홈에서 댓글을 클릭했을 경우 댓글을 보여줌
      return await client.comment.findMany({
        where: { productId },
        take: 10,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
        orderBy: { createdAt: 'asc' },
      });
    },
  },
};

export default resolvers;
