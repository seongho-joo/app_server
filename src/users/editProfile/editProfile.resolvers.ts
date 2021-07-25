import { protectedResolver } from './../user.utils';
import { Identity, Resolvers } from '../../types';
import { uploadToS3 } from '../../shared/shared.utils';

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (_, { username, location, avatar }, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        if (username) {
          const duplicateCheck: Identity | null = await client.user.findUnique({
            where: { username },
            select: { userId: true },
          });
          if (duplicateCheck) {
            return {
              ok: false,
              error: '이미 사용 중인 닉네임입니다.',
            };
          }
        }
        let avatarUrl: string | undefined = undefined;
        if (avatar) {
          avatarUrl = await uploadToS3(avatar, 'avtars', loggedInUser);
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
