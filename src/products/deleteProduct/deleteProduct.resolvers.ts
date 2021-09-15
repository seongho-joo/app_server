import { Product } from '@prisma/client';
import { deleteObjectsS3 } from '../../shared/shared.utils';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    deleteProduct: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        const exProduct: Product | null = await client.product.findUnique({
          where: { id },
        });
        if (!exProduct) {
          return {
            ok: false,
            error: '물품이 존재하지 않음',
          };
        }
        const { authorId, picture } = exProduct;
        if (authorId !== userId) {
          return {
            ok: false,
            error: '권한이 없음',
          };
        }
        // 상품 리퓨 삭제
        const productReview = await client.productReview.findMany({
          where: { productId: id },
          select: { id: true },
        });
        if (productReview) {
          await client.productReview.deleteMany({
            where: { productId: id },
          });
        }
        // 사진이 존재할 경우
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
