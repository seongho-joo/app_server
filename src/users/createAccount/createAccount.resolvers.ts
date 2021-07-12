import { Resolvers } from '../../types';
import * as bcrypt from 'bcryptjs';

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { username, password, phoneNumber, email, fullName },
      { client }
    ) => {
      const hash: string = await bcrypt.hash(password, 10);
      await client.user.create({
        data: {
          username,
          fullName,
          password: hash,
          email,
          phoneNumber,
        },
      });
      return { ok: true };
    },
  },
};

export default resolvers;
