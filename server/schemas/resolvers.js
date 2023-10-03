const { AuthenticationError } = require("apollo-server-express");
const { User, MessageGroups } = require("../models");
const { ObjectId } = require("mongoose").Types;
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const { signToken } = require("../utils/auth");
const { withFilter, PubSub } = require("graphql-subscriptions");

require("dotenv").config();

const pubsub = new PubSub();
const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    users: async function (parent, args, context) {
      return User.find({});
    },
    me: async function (parent, args, context) {
      if (!context.user) throw new AuthenticationError("");

      return User.findById(context.user._id);
    },
    findMessages: async function (parent, { userId }, context) {
      if (!context.user) return new AuthenticationError("Need to be logged in");

      const messages = await MessageGroups.findOne({
        users: { $all: [userId, context.user._id] },
      })
        .populate("users")
        .populate("messages.user")
        .sort({ "messages.dateCreated": 0 });

      return messages;
    },
  },
  Mutation: {
    loginUser: async function (parent, { username, password }, context) {
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

      const findGroup = await MessageGroups.findOne({
        users: [userId, context.user._id],
      })
        .populate("users")
        .populate("messages.user");

      if (findGroup) return findGroup;

      const newGroup = await MessageGroups.create({
        users: [userId, context.user._id],
      });

      const newGroupFind = await MessageGroups.findById(newGroup._id).populate(
        "users"
      );
      console.log(newGroupFind);
      return newGroupFind;
    },
    createMessage: async function (parent, { message, groupId }, context) {
      //Checks if there is a user_id in the middleware
      if (!context.user._id) throw new AuthenticationError("Not logged in");
      const findUser = await User.findById(context.user._id);
      //Checks if that user is in the database

      if (!findUser)
        throw new AuthenticationError("No user found to create message");
      //Finds if there a message grounp linked to the id
      const findGroup = await MessageGroups.findById(groupId);
      if (!findGroup) throw new AuthenticationError("Can't find message group");

      //Create the message
      const addMessage = {
        message: message,
        user: context.user._id,
        dateCreated: Date.now(),
      };

      const fullMessage = {
        message: addMessage.message,
        dateCreated: addMessage.dateCreated,
        user: findUser,
      };

      //Push the message into the messageGroup.
      const pushMessage = await MessageGroups.findByIdAndUpdate(groupId, {
        $push: { messages: { $each: [addMessage], $position: 0 } },
      });
      pubsub.publish("MessageService", {
        recieveMessage: { ...fullMessage, groupId: groupId },
      });
      return fullMessage;
    },
  },
  Subscription: {
    recieveMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(["MessageService"]),
        (payload, { groupId }) => {
          return payload.recieveMessage.groupId == groupId;
        }
      ),
    },
  },
};

module.exports = resolvers;

//s3Uploader.singleFileUploadResovler.bind(s3Uploader)
