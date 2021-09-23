import { Product } from '@prisma/client';
import { deleteObjectsS3, Dir, uploadToS3 } from '../../shared/shared.utils';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';
import { getS3Location } from '../product.utils';

const resolvers: Resolvers = {
  Mutation: {
    editProduct: protectedResolver(
      async (
        _,
        { id, title, content, price, hours, newPictures, removePictures },
        { client, loggedInUser }
      ) => {
        const { userId } = loggedInUser;
        const product: Product | null = await client.product.findUnique({
          where: { id },
        });
        if (!product) {
          return { ok: false, error: '상품이 존재하지 않음' };
        }
        if (userId !== product.authorId) {
          return { ok: false, error: '권한이 없음' };
        }
        let { picture } = product;
        // 제거하려는 사진이 있을 경우
        if (removePictures) {
          picture = picture.filter((item) => !removePictures.includes(item));
          await deleteObjectsS3(removePictures);
        }

        let location: string[] = [];
        // 추가하려는 사진이 있을 경우
        if (newPictures) {
          location = await getS3Location(
            newPictures,
            loggedInUser,
            product.id,
            Dir.PRODUCT
          );
        }

        picture = picture.concat(location);

        await client.product.update({
          where: { id },
          data: {
            ...(title && { title }),
            ...(content && { content }),
            ...(price && { price }),
            ...(hours && { hours }),
            picture,
          },
        });

        return { ok: true };
      }
    ),
  },
};

export default resolvers;
