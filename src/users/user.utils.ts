import * as jwt from 'jsonwebtoken';
import client from '../client';
import { Resolver, Context } from '../types';

export enum accountKind {
  phone,
  email,
}

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    const JWT_SECRET: string = process.env.JWT_SECRET;
    if (JWT_SECRET) {
      const verifiedToken: any = await jwt.verify(token, JWT_SECRET);
      if ('id' in verifiedToken) {
        const user = await client.user.findUnique({
          where: { username: verifiedToken['id'] },
        });
        if (user) {
          return user;
        }
      }
    }
  } catch {
    return null;
  }
};

export const protectedResolver =
  (ourResolver: Resolver) => (root, args, context: Context, info) => {
    if (!context.loggedInUser) {
      const query: boolean = info.operation.operation === 'query';
      if (query) {
        return null;
      }
      return {
        ok: false,
        error: '로그인이 필요합니다.',
      };
    }
    return ourResolver(root, args, context, info);
  };
