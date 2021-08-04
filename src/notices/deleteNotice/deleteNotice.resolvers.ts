import { deleteObjectsS3 } from '../../shared/shared.utils';
import { Identity, Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    deleteNotice: protectedResolver(
      async (_, { id }, { client, loggedInUser }) => {
        const { role } = loggedInUser;
        if (role !== 'ADMIN') {
          return { ok: false, error: '권한이 없음' };
        }

        const notice = await client.notice.findUnique({
          where: { id },
          select: { id: true, image: true },
        });
        if (!notice) {
          return { ok: false, error: '존재하지 않음' };
        }

        const { image } = notice;
        if (image) {
          await deleteObjectsS3(image);
        }

        await client.notice.delete({ where: { id } });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
