import { Resolvers } from '../../types';
import * as bcrypt from 'bcryptjs';
import { accountKind } from '../user.utils';

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { username, password, phoneNumber, email, kind, fullName },
      { client }
    ) => {
      if (kind === accountKind.phone) {
        // 전화번호로 가입할 경우
        await client.user.create({
          data: {
            username,
            phoneNumber,
            fullName,
          },
        });
      } else {
        // email로 가입할 경우
        const hash: string = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username,
            phoneNumber,
            email,
            password: hash,
            fullName,
          },
        });
      }
      return { ok: true };
    },
  },
};

export default resolvers;
