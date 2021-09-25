import { deleteObjectsS3 } from './../../shared/shared.utils';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    deletePost: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        const post = await client.post.findUnique({
          where: { id },
          select: { authorId: true, image: true },
        });
        if (!post) {
          return { ok: false, error: '게시글이 존재하지않음' };
        }
        const { authorId, image } = post;
        if (userId !== authorId) {
          return { ok: false, error: '작성자만 삭제할 수 있음' };
        }
        if (image.length !== 0) {
          await deleteObjectsS3(image);
        }
        await client.post.delete({ where: { id } });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
