import { User } from '@prisma/client';
import { Resolvers } from '../../types';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const resolvers: Resolvers = {
  Mutation: {
    emailSignIn: async (_, { email, password }, { client }) => {
      const exUser: User | null = await client.user.findUnique({
        where: { email },
      });
      if (!exUser) {
        return {
          ok: false,
          error: 'email 또는 password를 잘못 입력하셨습니다.',
        };
      }
      const comparePW: boolean = await bcrypt.compare(
        password,
        exUser.password
      );
      if (!comparePW) {
        return {
          ok: false,
          error: 'email 또는 password를 잘못 입력하셨습니다.',
        };
      }
      const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
      let token: string | undefined = undefined;
      if (JWT_SECRET) {
        token = jwt.sign({ id: exUser.userId }, JWT_SECRET);
      }
      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
