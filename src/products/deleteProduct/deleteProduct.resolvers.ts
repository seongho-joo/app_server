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
        // 댓글이 존재할 경우
        const comment: Comment[] | null = await client.comment.findMany({
          where: { productId: id },
        });
        if (comment.length !== 0) {
          await client.comment.deleteMany({ where: { productId: id } });
        }
        // 사진이 존재할 경우
        const { picture } = exProduct;
        if (picture.length !== 0) {
          await deleteObjectsS3(picture);
        }

        await client.product.delete({ where: { id } });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
