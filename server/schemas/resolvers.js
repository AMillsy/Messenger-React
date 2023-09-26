const { AuthenticationError } = require("apollo-server-express");
const { User, MessageGroups } = require("../models");
const { ObjectId } = require("mongoose").Types;
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");

require("dotenv").config();

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    users: async function (parent, args, context) {
      return User.find({});
    },
  },
  // Mutation: {},
};

module.exports = resolvers;

//s3Uploader.singleFileUploadResovler.bind(s3Uploader)
