import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    transactionStatusUpdate(id: Int!, status: Status!): MutationResponse!
  }
`;
