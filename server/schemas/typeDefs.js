const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date
  scalar Upload
  type UploadFileResponse {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  type User {
    username: String
    email: String
    password: String
  }
  type Query {
    users: [User]
  }
`;

/**type Query{
  }
  type Mutation{
  } */

module.exports = typeDefs;
