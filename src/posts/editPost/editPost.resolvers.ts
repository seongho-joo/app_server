import { Dir } from './../../shared/shared.utils';
import { deleteObjectsS3 } from '../../shared/shared.utils';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';
import { getS3Location } from '../../products/product.utils';

const resolvers: Resolvers = {
  Mutation: {
    editPost: protectedResolver(
      async (
        _,
        { id, title, content, newImages, removeImages },
        { client, loggedInUser }
      ) => {
        const { userId } = loggedInUser;
        let post = await client.post.findUnique({ where: { id } });
        if (!post) {
          return { ok: false, error: '게시글이 존재하지 않음' };
        }
        if (post.authorId !== userId) {
          return { ok: false, error: '작성자만 이용할 수 있음' };
        }

        let { image } = post;
        if (removeImages) {
          image = image.filter((item) => !removeImages.includes(item));
          await deleteObjectsS3(removeImages);
        }

        let location: string[] = [];
        if (newImages) {
          location = await getS3Location(
            newImages,
            loggedInUser,
            post.id,
            Dir.POST
          );
        }

        image = image.concat(location);

        await client.post.update({
          where: { id },
          data: {
            ...(title && { title }),
            ...(content && { content }),
            image,
          },
        });

        return { ok: true };
      }
    ),
  },
};

export default resolvers;
