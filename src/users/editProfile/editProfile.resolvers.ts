import { protectedResolver } from './../user.utils';
import { Resolvers } from '../../types';
import { uploadToS3 } from '../../shared/shared.utils';

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (_, { username, location, avatar }, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        const duplicateCheck: Object = await client.user.findUnique({
          where: { username },
          select: { userId: true },
        });
        if (duplicateCheck) {
          return {
            ok: false,
            error: '이미 사용 중인 닉네임입니다.',
          };
        }
        let avatarUrl: string = null;
        if (avatar) {
          avatarUrl = await uploadToS3(avatar, userId, 'avatars');
        }
        await client.user.update({
          where: { userId },
          data: {
            ...(username && { username }),
            ...(location && { location }),
            ...(avatarUrl && { avatar: avatarUrl }),
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
