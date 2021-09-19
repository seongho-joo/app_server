import { gql } from 'apollo-server-express';

export default gql`
  type Query {
    seeUserReviews(userId: Int!): [UserReview]
  }
`;
