import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    editComment: protectedResolver(
      async (_, { id, payload }, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        const comment = await client.comment.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!comment) {
          return { ok: false, error: '댓글이 존재하지않음' };
        }
        if (comment.userId !== userId) {
          return { ok: false, error: "you don't have permission." };
        }
        await client.comment.update({ where: { id }, data: { payload } });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
