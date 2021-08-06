import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    editProduct(
      id: Int!
      title: String
      content: String
      price: Int
      hours: Int
      newPictures: [Upload]
      removePictures: [String]
    ): MutationResponse!
  }
`;
