import { Resolvers } from './../types.d';

const resolvers: Resolvers = {
  Comment: {
    isMine: ({ userId }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.userId;
    },
  },
};

export default resolvers;
