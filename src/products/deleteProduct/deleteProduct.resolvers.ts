import { Product } from '@prisma/client';
import { DeleteObjectsRequest } from 'aws-sdk/clients/s3';
import { deleteFileToS3 } from '../../shared/shared.utils';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    deleteProduct: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const exProduct: Product = await client.product.findUnique({
          where: { id },
        });
        if (!exProduct) {
          return {
            ok: false,
            error: '물품이 존재하지 않음',
          };
        }
        if (exProduct.authorId !== loggedInUser.userId) {
          return {
            ok: false,
            error: '권한이 없음',
          };
        }
        if (exProduct.picture) {
          let files: string[];
          files = exProduct.picture;
          const Objects = await Promise.all(
            files.map(async (item: string) => {
              const keyName: string[] = item.split(
                'https://timebridge-uploads.s3.amazonaws.com/'
              );
              return {
                Key: keyName[1],
              };
            })
          );
          const param: DeleteObjectsRequest = {
            Bucket: 'timebridge-uploads',
            Delete: {
              Objects,
            },
          };
          await deleteFileToS3(param);
        }
        await client.product.delete({ where: { id } });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
