import { protectedResolver } from './../user.utils';
import { Resolvers } from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectedResolver(
      async (_, { userId, username, location }, { client }) => {
        const user: Object = await client.user.findUnique({
          where: { userId },
          select: { userId: true },
        });
        if (!user) {
          return {
            ok: false,
            error: '유저를 찾을 수 없습니다.',
          };
        }
        await client.user.update({
          where: { userId },
          data: {
            username,
            location,
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
