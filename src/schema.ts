import { DocumentNode } from 'graphql';
import { mergeResolvers, loadFilesSync, mergeTypeDefs } from 'graphql-tools';

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

export const typeDefs: DocumentNode = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);
