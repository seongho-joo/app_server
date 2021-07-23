import { Comment } from '@prisma/client';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    deleteComment: protectedResolver(
      async (_, { id }, { loggedInUser, client }) => {
        const comment: Comment | null = await client.comment.findUnique({
          where: { id },
        });
        if (!comment) {
          return { ok: false, error: '댓글이 없음' };
        }
        if (loggedInUser.userId !== comment.authorId) {
          return { ok: false, error: '권한이 없음' };
        }
        await client.comment.delete({ where: { id } });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
