import { Comment } from '@prisma/client';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    editComment: protectedResolver(
      async (_, { id, payload }, { client, loggedInUser }) => {
        const comment: Comment | null = await client.comment.findUnique({
          where: { id },
        });
        if (!comment) {
          return {
            ok: false,
            error: '댓글이 존재하지 않음',
          };
        }
        if (loggedInUser.userId !== comment.authorId) {
          return {
            ok: false,
            error: '권한이 없음',
          };
        }
        await client.comment.update({
          where: { id },
          data: { comment: payload },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
