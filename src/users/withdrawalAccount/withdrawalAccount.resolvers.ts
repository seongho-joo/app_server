import { Product, User } from '@prisma/client';
import { deleteObjectsS3 } from '../../shared/shared.utils';
import { Resolvers } from '../../types';
import { protectedResolver } from '../user.utils';

const resolvers: Resolvers = {
  Mutation: {
    withdrawalAccount: protectedResolver(
      async (_, __, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        const user: User | null = await client.user.findUnique({
          where: { userId },
        });
        const comments = await client.comment.findFirst({
          where: { authorId: userId },
          select: { id: true },
        });
        const products = await client.product.findMany({
          where: { authorId: userId },
        });

        if (!user) {
          return { ok: false, error: '사용자가 존재하지 않음' };
        }
        // 프로필 사진이 존재할 경우 S3 오브젝트 삭제
        if (user.avatar) {
          await deleteObjectsS3(user.avatar);
        }

        if (products) {
          products.forEach(async (item: Product) => {
            const { id, picture } = item;
            const comment = await client.comment.findFirst({
              where: { productId: id },
            });
            // 사용자가 작성한 상품에 댓글이 있으면 삭제
            if (comment) {
              await client.comment.deleteMany({ where: { productId: id } });
            }
            if (picture.length !== 0) {
              await deleteObjectsS3(picture);
            }
          });
          // 사용자가 작성한 상품들 삭제
          await client.product.deleteMany({ where: { authorId: userId } });
        }
        // 사용자가 작성한 댓글들 삭제
        if (comments) {
          await client.comment.deleteMany({ where: { authorId: userId } });
        }

        await client.user.delete({ where: { userId } });

        return { ok: true };
      }
    ),
  },
};

export default resolvers;
