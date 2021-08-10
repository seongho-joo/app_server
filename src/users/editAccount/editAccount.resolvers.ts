import { Identity, Resolvers } from '../../types';
import { protectedResolver } from '../user.utils';

const resolvers: Resolvers = {
  Mutation: {
    editAccount: protectedResolver(
      async (_, { phoneNumber }, { client, loggedInUser }) => {
        const { userId } = loggedInUser;
        const user: Identity | null = await client.user.findUnique({
          where: { phoneNumber },
          select: { userId: true },
        });
        if (user) {
          return { ok: false, error: '이미 존재하는 번호입니다.' };
        }
        await client.user.update({ where: { userId }, data: { phoneNumber } });
        return { ok: true };
      }
    ),
  },
};

export default resolvers;
