import { gql } from 'apollo-server-core';

export default gql`
  scalar Upload
  scalar Date

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
