import { Subscription } from '../../types';
import pubsub from '../../pubsub';
import { NEW_MESSAGE } from '../../constants';
import { withFilter } from 'graphql-subscriptions';

const resolvers: Subscription = {
  Subscription: {
    roomUpdate: {
      subscribe: async (root, args, context, info) => {
        const { id } = args;
        const { client, loggedInUser } = context;
        // 채팅방 유저인지 확인
        const room = await client.room.findFirst({
          where: {
            id,
            users: {
              some: { userId: loggedInUser.userId },
            },
          },
          select: { id: true },
        });
        if (!room) {
          throw new Error('You shall not see this.');
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          async ({ roomUpdate }, { id }, { loggedInUser }) => {
            const { roomId } = roomUpdate;
            if (roomId === id) {
              const room = await client.room.findFirst({
                where: {
                  id,
                  users: {
                    some: { userId: loggedInUser.userId },
                  },
                },
                select: { id: true },
              });
              if (!room) {
                return false;
              }
              return true;
            }
            return false;
          }
        )(root, args, context, info);
      },
    },
  },
};

export default resolvers;
