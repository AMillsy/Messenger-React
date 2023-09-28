const { AuthenticationError } = require("apollo-server-express");
const { User, MessageGroups } = require("../models");
const { ObjectId } = require("mongoose").Types;
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const { signToken } = require("../utils/auth");

require("dotenv").config();

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    users: async function (parent, args, context) {
      return User.find({});
    },
    findMessages: async function (parent, { userId }, context) {
      if (!context.user) return new AuthenticationError("Need to be logged in");

      const messages = await MessageGroups.find({
        users: [userId, context.user._id],
      });

      return messages;
    },
  },
  Mutation: {
    loginUser: async function (parent, { username, password }, context) {
      console.log(password, username);
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      console.log("Found a user");

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      console.log("Password is wrong");
      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;

//s3Uploader.singleFileUploadResovler.bind(s3Uploader)
