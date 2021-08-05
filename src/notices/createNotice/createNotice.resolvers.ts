import { Dir, uploadToS3 } from './../../shared/shared.utils';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    createNotice: protectedResolver(
      async (
        _,
        { title, content, sortation, image },
        { client, loggedInUser }
      ) => {
        const { userId, role } = loggedInUser;
        if (role !== 'ADMIN') {
          return { ok: false, error: '작성 권한이 없음' };
        }
        let imageUrl: string = '';
        if (image) {
          imageUrl = await uploadToS3(image, Dir.NOTICE, _, title);
        }
        await client.notice.create({
          data: {
            adminId: userId,
            title,
            content,
            sortation,
            ...(image && { image: imageUrl }),
          },
        });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
