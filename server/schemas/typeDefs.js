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
  type Message {
    User: User
    message: String
  }
  type MessageGroup {
    users: [User]
    messages: [Message]
  }
  type Auth {
    token: ID!
    user: User
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }
  type Query {
    users: [User]
    findMessages(userId: ID): MessageGroup
  }
  type Mutation {
    loginUser(username: String!, password: String!): Auth
  }
`;

/**type Query{
  }
  type Mutation{
  } */

module.exports = typeDefs;
