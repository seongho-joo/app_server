import { NEW_MESSAGE } from '../../constants';
import pubsub from '../../pubsub';
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
          // userId로 채팅을 할 경우
          const user = await client.user.findUnique({
            where: { userId },
            select: { userId: true },
          });
          if (!user) {
            return { ok: false, error: '사용자가 존재하지 않음' };
          }
          // 기존에 채팅방이 있는지 확인
          room = await client.room.findFirst({
            where: {
              AND: [
                { users: { some: { userId } } },
                { users: { some: { userId: loggedInUser.userId } } },
              ],
            },
            select: { id: true },
          });
          // 기존에 채팅방이 없을경우 방을 새로 생성
          if (!room) {
            room = await client.room.create({
              data: {
                users: {
                  connect: [{ userId: loggedInUser.userId }, { userId }],
                },
                product: { connect: { id: productId } },
              },
              select: { id: true },
            });
          }
        } else if (roomId) {
          // roomId로 채팅을 할 경우
          room = await client.room.findFirst({
            where: {
              id: roomId,
              AND: [
                { users: { some: { userId } } },
                { users: { some: { userId: loggedInUser.userId } } },
              ],
            },
            select: { id: true },
          });
          if (!room) {
            return { ok: false, error: '대화방을 찾을 수 없음' };
          }
        }
        if (room) {
          const message = await client.message.create({
            data: {
              payload,
              user: { connect: { userId: loggedInUser.userId } },
              room: { connect: { id: room.id } },
            },
          });
          pubsub.publish(NEW_MESSAGE, { roomUpdate: { ...message } });
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
