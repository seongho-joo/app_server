import jwt from 'jsonwebtoken';
import client from '../client';
import { Resolver, Context } from '../types';

export const getUser = async (token: any) => {
  try {
    if (!token) {
      return null;
    }
    const JWT_SECRET: string | undefined = process.env.JWT_SECRET;
    if (JWT_SECRET) {
      const verifiedToken: any = await jwt.verify(token, JWT_SECRET);
      if ('id' in verifiedToken) {
        const user = await client.user.findUnique({
          where: { userId: verifiedToken['id'] },
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
  (ourResolver: Resolver) =>
  (root: any, args: any, context: Context, info: any) => {
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
