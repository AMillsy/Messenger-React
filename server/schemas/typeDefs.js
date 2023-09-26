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

  type Auth {
    token: ID!
    user: User
  }

  type Comment {
    _id: ID
    user: User
    message: String
    likes: Int
    date: Date
  }

  type Post {
    _id: ID
    title: String!
    description: String
    image: String!
    likeCount: Int
    date: Date
    comments: [Comment]
    commentCount: Int
    user: User
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    image: String
    location: String
    job: String
    skills: [String]
    posts: [Post]
    followed: [User]
    following: [User]
  }

  type meFollow {
    _id: ID
    followed: [ID]
    following: [ID]
  }
  type PostData {
    user: User
    Post: Post
  }
  type Query {
    posts: [Post]
    findPost(postId: ID!): Post
    users: [User]
    getComments(_id: ID!): [Comment]
    userProfile(_id: ID!): User
    me: User
    follows: meFollow
  }
  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    loginUser(username: String!, password: String!): Auth
    updateUser(
      username: String
      file: Upload
      location: String
      job: String
      skills: [String]
    ): User
    deletePost(postId: ID!): Post
    addLike(postId: ID!): Post
    createPost(title: String!, description: String, file: [Upload]!): Post
    updatePost(
      title: String
      description: String
      file: [Upload]
      postId: ID!
    ): Post
    createComment(postId: ID!, message: String): Comment
    singleUpload(file: Upload!): UploadFileResponse
    multiUpload(files: [Upload!]): [UploadFileResponse]
    followUser(userId: ID): User
    unFollowUser(userId: ID): User
  }
`;

module.exports = typeDefs;
