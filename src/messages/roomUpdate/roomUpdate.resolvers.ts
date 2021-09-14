import { Subscription } from '../../types';
import pubsub from '../../pubsub';
import { NEW_MESSAGE } from '../../constants';
import { withFilter } from 'graphql-subscriptions';

const resolvers: Subscription = {
  Subscription: {
    roomUpdate: {
      subscribe: async (root, args, context, info) => {
        const { id } = args;
        const { client } = context;
        const room = await client.room.findUnique({
          where: { id },
          select: { id: true },
        });
        if (!room) {
          throw new Error('권한이 없음');
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          ({ roomUpdate }, { id }) => {
            const { roomId } = roomUpdate;
            return roomId === id;
          }
        )(root, args, context, info);
      },
    },
  },
};

export default resolvers;
