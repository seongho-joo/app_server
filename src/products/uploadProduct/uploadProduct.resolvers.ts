import { Product } from '@prisma/client';
import { uploadToS3, Dir } from '../../shared/shared.utils';
import { File, Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

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
          picturesUrl = await Promise.all(
            pictures.map(async (file: File) => {
              const location: string = await uploadToS3(
                file,
                Dir.PRODUCT,
                loggedInUser,
                title
              );
              return location;
            })
          );
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
