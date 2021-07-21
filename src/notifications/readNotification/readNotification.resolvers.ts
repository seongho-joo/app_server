import { Notification } from '@prisma/client';
import { Resolvers } from '../../types';
import { protectedResolver } from '../../users/user.utils';

const resolvers: Resolvers = {
  Mutation: {
    readNotification: protectedResolver(async (_, { id }, { client }) => {
      const noti: Notification = await client.notification.findUnique({
        where: { id },
      });
      if (!noti) {
        return {
          ok: false,
          error: '알림이 존재하지 않음',
        };
      }
      if (!noti.read) {
        // 알림을 읽었을 경우만 읽음처리 업데이트
        await client.notification.update({
          where: { id },
          data: { read: true },
        });
      }
      return { ok: true };
    }),
  },
};

export default resolvers;
