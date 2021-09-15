import { Product } from '@prisma/client';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';
import { getS3Location } from '../product.utils';

const resolvers: Resolvers = {
  Mutation: {
    uploadProduct: protectedResolver(
      async (
        _,
        { title, price, minutes, pictures, content, hashtags, classification },
        { client, loggedInUser }
      ) => {
        const { userId } = loggedInUser;
        let picturesUrl: string[] = [];
        let hashtagObj = [];
        if (hashtags) {
          hashtagObj = hashtags.map((item: string) => ({
            where: { hashtag: item },
            create: { hashtag: item },
          }));
        }
        const { id } = await client.product.create({
          data: {
            classification,
            minutes,
            title,
            author: {
              connect: { userId },
            },
            content,
            price,
            ...(hashtagObj.length > 0 && {
              hashtags: { connectOrCreate: hashtagObj },
            }),
          },
        });
        if (pictures) {
          if (pictures.length > 10) {
            return { ok: false, error: '사진 수 초과' };
          }
          picturesUrl = await getS3Location(pictures, loggedInUser, id);
        }
        const product: Product = await client.product.update({
          where: { id },
          data: {
            ...(picturesUrl && { picture: picturesUrl }),
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
