import { Dir, uploadToS3 } from '../../shared/shared.utils';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    createBanner: async (_, { file }, { client }) => {
      if (!file) {
        return { ok: false, error: '이미지가 없음' };
      }
      const fileUrl: string = await uploadToS3(file, Dir.BANNER);
      await client.banner.create({ data: { file: fileUrl } });
      return { ok: true };
    },
  },
};

export default resolvers;
