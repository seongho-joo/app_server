import { Resolvers } from '../types';
import { accountKind } from './user.utils';

const resolvers: Resolvers = {
  User: {
    isRegistered: async (_, { kind, account }, { client }) => {
      let isRegitered: Object = {};
      if (kind === accountKind.phone) {
        isRegitered = await client.user.findUnique({
          where: { phoneNumber: account },
        });
      } else {
        isRegitered = await client.user.findUnique({
          where: { email: account },
        });
      }

      if (isRegitered) {
        return true; // 가입이 되어있을 경우
      } else {
        return false; // 가입이 안되어있을 경우 -> 가입 필요
      }
    },
  },
};

export default resolvers;
