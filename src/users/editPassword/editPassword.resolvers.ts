import { Resolvers } from '../../types';
import * as bcrypt from 'bcryptjs';

const resolvers: Resolvers = {
  Mutation: {
    editPassword: async (_, { password, email }, { client }) => {
      const user: Object = await client.user.findUnique({
        where: { email },
        select: { username: true },
      });
      if (!user) {
        return { ok: false, error: '입력하신 정보가 없습니다.' };
      }
      const hash: string = await bcrypt.hash(password, 10);
      await client.user.update({
        where: { email },
        data: {
          password: hash,
        },
      });
      return { ok: true };
    },
  },
};

export default resolvers;
