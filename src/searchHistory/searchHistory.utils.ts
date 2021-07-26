import client from '../client';
import { Identity } from '../types';

export const deleteSearchHisoty = async (userId: number) => {
  const history: Identity | null = await client.searchHistory.findFirst({
    where: { userId },
    select: { id: true },
  });
  if (history) {
    await client.searchHistory.delete({ where: { id: history.id } });
  }
};

export const createSearchHistory = async (word: string, userId: number) => {
  const exWord: Identity | null = await client.searchHistory.findFirst({
    where: { word, userId },
    select: { id: true },
  });
  if (exWord) {
    // 이미 검색한 기록이 있을때 updateAt만 변경해줌
    await client.searchHistory.update({
      where: {
        id: exWord.id,
      },
      data: {
        word,
      },
    });
  } else {
    await client.searchHistory.create({
      data: {
        word,
        user: {
          connect: { userId },
        },
      },
    });
  }
};
