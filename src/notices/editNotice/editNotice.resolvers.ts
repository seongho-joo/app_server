import { deleteObjectsS3, Dir, uploadToS3 } from '../../shared/shared.utils';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    editNotice: protectedResolver(
      async (_, { id, Title, content, Image }, { client, loggedInUser }) => {
        const { role } = loggedInUser;
        if (role !== 'ADMIN') {
          return { ok: false, error: '권한이 없음' };
        }

        const notice = await client.notice.findUnique({
          where: { id },
        });
        if (!notice) {
          return { ok: false, error: '존재하지 않음' };
        }

        const { image, title } = notice;
        let imageUrl: string = '';
        // 변경할 이미지와 이미지가 존재할 경우 s3 오브젝트 삭제
        if (Image) {
          if (image) {
            await deleteObjectsS3(image);
          }
          imageUrl = await uploadToS3(Image, Dir.NOTICE, _, title);
        }

        await client.notice.update({
          where: { id },
          data: {
            ...(Title && { title: Title }),
            ...(content && { content }),
            ...(Image && { image: imageUrl }),
          },
        });

        return { ok: true };
      }
    ),
  },
};

export default resolvers;
