import { protectedResolver } from '../../users/user.utils';
import { Resolvers } from './../../types.d';

const resolvers: Resolvers = {
  Mutation: {
    createComment: protectedResolver(
      async (_, { id, payload }, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        const post = await client.post.findUnique({
          where: { id },
          select: { id: true },
        });
        if (!post) {
          return { ok: false, error: '게시글이 존재하지않음' };
        }
        await client.comment.create({
          data: {
            payload,
            user: { connect: { userId } },
            post: { connect: { id } },
          },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
