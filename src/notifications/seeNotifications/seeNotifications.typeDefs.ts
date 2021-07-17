import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    seeNotifications(lastId: Int): [Notification]
  }
`;
