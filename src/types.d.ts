import { PrismaClient } from '.prisma/client';
import { User } from '@prisma/client';

type Context = {
  loggedInUser: User;
  client: PrismaClient;
};

type aswParam = {
  Bucket: string;
  Key: string;
};

type File = {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: Function;
};

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
