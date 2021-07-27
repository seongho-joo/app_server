import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Comment: {
    isMine: ({ authorId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return authorId === loggedInUser.userId;
    },
    author: ({ authorId }, _, { client }) =>
      client.user.findUnique({ where: { userId: authorId } }),
  },
};

export default resolvers;
