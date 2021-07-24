import { Comment, Product } from '@prisma/client';
import { DeleteObjectsRequest } from 'aws-sdk/clients/s3';
import { deleteObjectsS3 } from '../../shared/shared.utils';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    deleteProduct: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const exProduct: Product | null = await client.product.findUnique({
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
        const comment: Comment[] | null = await client.comment.findMany({
          where: { productId: id },
        });
        if (comment.length !== 0) {
          await client.comment.deleteMany({ where: { productId: id } });
        }
        if (exProduct.picture.length !== 0) {
          const Bucket: string | undefined = process.env.BUCKET;
          if (Bucket === undefined) {
            throw new Error('env BUCKET 존재하지 않음');
          }
          let files: string[];
          files = exProduct.picture;
          const Objects = await Promise.all(
            files.map(async (item: string) => {
              const keyName: string[] = item.split(
                'https://majgo-uploads.s3.ap-northeast-2.amazonaws.com/' ||
                  'https://majgo-uploads.s3.amazonaws.com/'
              );
              return {
                Key: keyName[1],
              };
            })
          );
          const param: DeleteObjectsRequest = {
            Bucket,
            Delete: {
              Objects,
            },
          };
          await deleteObjectsS3(param);
        }
        await client.product.delete({ where: { id } });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
