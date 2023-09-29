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

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    createMessageGroup: async function (parent, { userId }, context) {
      if (!context.user) throw new AuthenticationError("Need to be logged in");

      const findUser = await User.findById(userId);
      if (!findUser) throw new AuthenticationError("Can't find user");

      const newGroup = await MessageGroups.create({
        users: [userId, context.user._id],
      });

      return newGroup;
    },
    createMessage: async function (parent, { message, groupId }, context) {
      //Checks if there is a user_id in the middleware
      if (!context.user._id) throw new AuthenticationError("Not logged in");
      const findUser = await User.findById(context.user._id);
      //Checks if that user is in the database
      console.log(findUser);
      if (!findUser)
        throw new AuthenticationError("No user found to create message");
      //Finds if there a message grounp linked to the id
      const findGroup = await MessageGroups.findById(groupId);
      if (!findGroup) throw new AuthenticationError("Can't find message group");

      //Create the message
      const addMessage = { message: message, user: context.user._id };

      //Push the message into the messageGroup.
      const pushMessage = await MessageGroups.findByIdAndUpdate(groupId, {
        $push: { messages: addMessage },
      });

      return { message: addMessage.message, user: findUser };
    },
  },
};

module.exports = resolvers;

//s3Uploader.singleFileUploadResovler.bind(s3Uploader)
