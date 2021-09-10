import { Organizer } from '.prisma/client';
import client from '../client';

const productReviewReveal = async (writerId: number, productId: number) => {
  const id = await client.productReview.findFirst({
    where: { writerId, productId },
    select: { id: true },
  });
  if (id) {
    await client.productReview.update({
      where: { id: id.id },
      data: { hide: false },
    });
  }
};

// 양방향으로 작성했을 경우 리뷰 공개
export const twoWayCheck = async (
  id: number,
  writerId: number,
  reciverId: number,
  productId: number,
  organizer: Organizer
) => {
  const review = await client.userReview.findFirst({
    where: { writerId, reciverId, productId },
    select: { id: true },
  });
  if (review) {
    await client.userReview.update({
      where: { id },
      data: { hide: false },
    });
    await client.userReview.update({
      where: { id: review.id },
      data: { hide: false },
    });
    // 빌리는 유저일 경우 물품 후기도 공개 처리
    switch (organizer) {
      case 'RECIVER':
        productReviewReveal(reciverId, productId);
        break;
      case 'PROVIDER':
        productReviewReveal(writerId, productId);
        break;
    }
  }
};
