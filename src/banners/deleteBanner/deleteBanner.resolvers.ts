import { Banner } from '@prisma/client';
import { deleteObjectsS3 } from '../../shared/shared.utils';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    deleteBanner: async (_, { id }, { client }) => {
      const banner: Banner | null = await client.banner.findUnique({
        where: { id },
      });
      if (!banner) {
        return { ok: false, error: '해당 id는 존재하지 않음' };
      }
      await deleteObjectsS3(banner.file);
      await client.banner.delete({ where: { id } });
      return { ok: true };
    },
  },
};

export default resolvers;
