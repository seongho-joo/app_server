import { protectedResolver } from './../user.utils';
import { Identity, Resolvers } from '../../types';
import { deleteObjectsS3, Dir, uploadToS3 } from '../../shared/shared.utils';
import { User } from '@prisma/client';

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { username, location, avatar, removeAvatar },
        { client, loggedInUser }
      ) => {
        const { userId } = loggedInUser;
        const { DEFAULT_IMG } = process.env;
        const user: User | null = await client.user.findUnique({
          where: { userId },
        });
        if (!user) {
          return { ok: false, error: '회원이 존재하지않음' };
        }
        if (username) {
          if (user.username === username) {
            return {
              ok: false,
              error: '이미 사용 중인 닉네임입니다.',
            };
          }
        }
        let avatarUrl: string = '';
        if (avatar) {
          if (user.avatar) {
            await deleteObjectsS3(user.avatar);
          }
          avatarUrl = await uploadToS3(avatar, Dir.AVATAR, loggedInUser);
        }
        if (removeAvatar) {
          await deleteObjectsS3(removeAvatar);
          if (DEFAULT_IMG) {
            avatarUrl = DEFAULT_IMG;
          }
        }
        await client.user.update({
          where: { userId },
          data: {
            ...(username && { username }),
            ...(location && { location }),
            avatar: avatarUrl,
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
