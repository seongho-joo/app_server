import { User } from '@prisma/client';
import { Resolvers } from '../../types';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { accountKind } from '../user.utils';

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { kind, phoneNumber, email, password }, { client }) => {
      let user: User = undefined;
      // email로 로그인할 경우 패스워드 확인과 email 확인 필요
      if (kind === accountKind.email) {
        user = await client.user.findUnique({ where: { email } });
        if (!user) {
          return {
            ok: false,
            error: 'email 또는 비밀번호를 잘못 입력했습니다.',
          };
        }
        const comparePw: boolean = await bcrypt.compare(
          password,
          user.password
        );
        if (!comparePw) {
          return {
            ok: false,
            error: 'email 또는 비밀번호를 잘못 입력했습니다.',
          };
        }
      } else {
        user = await client.user.findUnique({ where: { phoneNumber } });
        if (!user) {
          return {
            ok: false,
            error: '입력하신 정보를 다시 확인해주세요.',
          };
        }
      }
      const token: string = await jwt.sign(
        { id: user.username },
        process.env.JWT_SECRET
      );
      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
