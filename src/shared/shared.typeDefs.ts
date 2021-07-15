import { gql } from 'apollo-server-core';

export default gql`
  scalar Upload

  type Query {
    uploads: [File]
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type MutationResponse {
    ok: Boolean!
    error: String
  }
`;
