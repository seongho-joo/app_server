import { getS3Location } from './../../products/product.utils';
import { protectedResolver } from './../../users/user.utils';
import { Resolvers } from '../../types';
import { Dir } from '../../shared/shared.utils';

const resolvers: Resolvers = {
  Mutation: {
    createPost: protectedResolver(
      async (_, { title, content, images }, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        let imageUrl: string[] = [];

        const { id } = await client.post.create({
          data: {
            title,
            content,
            author: {
              connect: { userId },
            },
          },
        });
        if (images) {
          imageUrl = await getS3Location(images, loggedInUser, id, Dir.POST);
        }
        const post = await client.post.update({
          where: { id },
          data: {
            image: imageUrl,
          },
        });
        return {
          ok: true,
          post,
        };
      }
    ),
  },
};

export default resolvers;
