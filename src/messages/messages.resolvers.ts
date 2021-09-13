import { Resolvers } from '../types';

const resolvers: Resolvers = {
  Room: {
    users: ({ id }, _, { client }) =>
      client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }, _, { client }) =>
      client.message.findMany({ where: { roomId: id } }),
    unreadTotal: ({ id }, _, { client, loggedInUser }) =>
      client.message.count({
        where: {
          read: false,
          roomId: id,
          user: { userId: { not: loggedInUser.userId } },
        },
      }),
    lastMessage: ({ id }, _, { client }) =>
      client.message.findFirst({
        where: { roomId: id },
        orderBy: { createdAt: 'desc' },
      }),
  },
  Message: {
    user: ({ id }, _, { client }) =>
      client.message.findUnique({ where: { id } }).user(),
  },
};

export default resolvers;
