import { gql } from 'apollo-server-express';

export default gql`
  type Post {
    id: Int!
    author: User!
    title: String!
    content: String!
    image: [String]
    createdAt: Date!
    updatedAt: Date!
  }

  type Like {
    id: Int!
    post: Post!
    createdAt: Date!
    updatedAt: Date!
  }
`;
