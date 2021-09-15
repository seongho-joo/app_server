import { gql } from 'apollo-server-express';

export default gql`
  type uploadProductResult {
    ok: Boolean!
    error: String
    product: Product
  }
  type Mutation {
    uploadProduct(
      title: String!
      price: Int!
      hours: Int!
      hashtags: [String]
      pictures: [Upload]
      content: String!
      classification: Classificaiton!
    ): uploadProductResult!
  }
`;
