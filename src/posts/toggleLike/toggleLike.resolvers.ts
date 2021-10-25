import { protectedResolver } from './../../users/user.utils';
import { Resolvers } from './../../types.d';

const resolvers: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(
      async (_, { id }, { loggedInUser, client }) => {
        const { userId } = loggedInUser;
        const post = await client.post.findUnique({
          where: { id },
          select: { id: true },
        });
        if (!post) {
          return { ok: false, error: '게시글이 존재하지 않음' };
        }
        const likeWhere = {
          postId_userId: {
            userId,
            postId: id,
          },
        };
        const like = await client.like.findUnique({
          where: likeWhere,
          select: { id: true },
        });
        if (like) {
          await client.like.delete({ where: likeWhere });
        } else {
          await client.like.create({
            data: {
              user: { connect: { userId } },
              post: { connect: { id } },
            },
          });
        }
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
