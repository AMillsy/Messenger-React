const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date
  scalar Upload

  type Message {
    user: User
    message: String
    dateCreated: Date
  }
  type MessageGroup {
    _id: ID
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
    friends: [User]
  }

  type Echo {
    user: User
    people: [User]
    messages: [Message]
  }

  type EchoGroup {
    name: String!
    groups: [Echo]
    groupCount: Int
  }

  type Query {
    users(username: String): [User]
    findMessages(userId: ID): MessageGroup
    me: User
  }
  type Mutation {
    loginUser(username: String!, password: String!): Auth
    createMessageGroup(userId: ID): MessageGroup
    createMessage(message: String, groupId: ID): Message
    signupUser(username: String!, password: String!, email: String!): Auth
    addFriend(userId: ID): User
  }
  type Subscription {
    recieveMessage(userId: ID): Message
  }
`;

/**type Query{
  }
  type Mutation{
  } */

module.exports = typeDefs;
