## 모델 추가
- Room, Message 모델 추가

## ⌨️ &nbsp;&nbsp;Refactoring
- 물품 후기 작성 시 상품이 존재하지않은 경우 예외처리 추가
- 리뷰 양방향 작성 시 공개 기능
- 일정 기간 후 공개 기능

## 📲 &nbsp;&nbsp;Computed Field
- ### Room
  - `users` 
    - 채팅방과 목록에 표시될 유저 정보
  - `messages`
    - 채팅방에 표시될 메시지
  - `unreadTotal`
    - 읽지않은 메시지의 수
  - `lastMessage`
  - 채팅방 목록에 표시될 마지막 메시지
- ### Message
  - `user`
    - 메시지를 보낸 유저 정보
  
## ⚙️ &nbsp;&nbsp;Mutation
- [메시지 보내기](https://github.com/seongho-joo/majgo_server/blob/master/src/messages/sendMessage/sendMessage.resolvers.ts)
- [매시지 보기 & 채팅방 보기](https://github.com/seongho-joo/majgo_server/blob/master/src/messages/seeRoom/seeRoom.resolvers.ts)

## 📃 &nbsp;&nbsp;Qeury
- [채팅 목록 보기](https://github.com/seongho-joo/majgo_server/blob/master/src/messages/seeRoms.resolvers.ts)

## 🕰 &nbsp;&nbsp;Subscription
- [실시간 채팅](../src/messages/roomUpdate/roomUpdate.resolvers.ts)
  - graphql PubSub class는 작은 프로젝트나 교육용같은 서비스에 적합함 [※참고 링크](https://www.apollographql.com/docs/apollo-server/data/subscriptions/#the-pubsub-class)
  - 실제 서비스를 만들 경우 Redis PubSub 서버와 같은 PubSub class를 사용해야함 (유료)
  - 실시간 서비스를 적용시킬 우리 기능도 생각해봐야 함