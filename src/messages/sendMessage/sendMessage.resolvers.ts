import { Room } from '.prisma/client';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    sendMessage: protectedResolver(
      async (
        _,
        { payload, roomId, userId, productId },
        { client, loggedInUser }
      ) => {
        let room = null;
        if (userId) {
          const user = await client.user.findUnique({
            where: { userId },
            select: { userId: true },
          });
          if (!user) {
            return { ok: false, error: '사용자가 존재하지 않음' };
          }
          room = await client.room.create({
            data: {
              users: { connect: [{ userId: loggedInUser.userId }, { userId }] },
              product: { connect: { id: productId } },
            },
            select: { id: true },
          });
        } else if (roomId) {
          room = await client.room.findUnique({
            where: { id: roomId },
            select: { id: true },
          });
          if (!room) {
            return { ok: false, error: '대화방을 찾을 수 없음' };
          }
        }
        if (room) {
          await client.message.create({
            data: {
              payload,
              user: { connect: { userId: loggedInUser.userId } },
              room: { connect: { id: room.id } },
            },
          });
        }
        return {
          ok: true,
          ...(room && { id: room.id }),
        };
      }
    ),
  },
};

export default resolvers;
