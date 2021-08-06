import { Product } from '@prisma/client';
import { uploadToS3, Dir } from '../../shared/shared.utils';
import { File, Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';
import { getS3Location } from '../product.utils';

const resolvers: Resolvers = {
  Mutation: {
    uploadProduct: protectedResolver(
      async (
        _,
        { title, price, hours, pictures, content, hashtags },
        { client, loggedInUser }
      ) => {
        const { userId } = loggedInUser;
        let picturesUrl: string[] = [];
        if (pictures) {
          picturesUrl = await getS3Location(pictures, loggedInUser, title);
        }
        let hashtagObj = [];
        if (hashtags) {
          hashtagObj = hashtags.map((item: string) => ({
            where: { hashtag: item },
            create: { hashtag: item },
          }));
        }
        const product: Product | null = await client.product.create({
          data: {
            hours,
            title,
            author: {
              connect: { userId },
            },
            content,
            ...(picturesUrl && { picture: picturesUrl }),
            price,
            ...(hashtagObj.length > 0 && {
              hashtags: { connectOrCreate: hashtagObj },
            }),
          },
        });
        return {
          ok: true,
          product,
        };
      }
    ),
  },
};

export default resolvers;
