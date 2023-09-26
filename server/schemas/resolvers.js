const { AuthenticationError } = require("apollo-server-express");
const { User, Post, Comment } = require("../models");
const { ObjectId } = require("mongoose").Types;
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const AWSS3Uploader = require("../config/awsS3config");
const { signToken } = require("../utils/auth");
const { findOneAndUpdate } = require("../models/user");

require("dotenv").config();
const s3Uploader = new AWSS3Uploader({
  destinationBucketName: "devsocials",
});
const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    posts: async () => {
      return Post.find({})
        .populate({
          path: "comments",
          populate: {
            path: "user",
            model: "User",
          },
        })
        .populate("user")
        .sort({ date: -1 });
    },
    users: async () => {
      return User.find({});
    },
    getComments: async (parent, { _id }) => {
      const post = await Post.findById(_id).populate({
        path: "comments",
        populate: {
          path: "user",
          model: "User",
        },
      });

      return post.comments;
    },
    userProfile: async (parent, { _id }) => {
      return User.findOne({ _id }).populate("posts");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("posts")
          .populate("following")
          .populate("followed");
      }
      throw new AuthenticationError("You need to be logged in");
    },
    follows: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select(
          "following followed"
        );
      }
    },
    findPost: async (parent, { postId }, context) => {
      if (!context.user)
        throw new AuthenticationError("Must be logged in to edit post");

      return await Post.findById(postId);
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      try {
        const user = await User.create(args);

        if (user) {
          const token = signToken(user);
          return { token, user };
        }
      } catch (error) {
        throw new AuthenticationError(error.message);
      }
    },
    loginUser: async (parent, { username, password }) => {
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
    updateUser: async (
      parent,
      { username, file, location, job, skills },
      context
    ) => {
      if (!context.user)
        throw new AuthenticationError("Must be logged in to update settings");

      const updates = {};

      if (file) {
        const upload = s3Uploader.singleFileUploadResovler.bind(s3Uploader);

        const newPicture = await upload(parent, { file });

        updates.image = newPicture.url;
      }
      if (username) updates.username = username;
      if (location) updates.location = location;
      if (skills) updates.skills = skills;
      if (job) updates.job = job;

      const updateUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        updates,
        { new: true }
      );
      return updateUser;
    },
    createPost: async (parent, { title, description, file }, context) => {
      if (!context.user)
        throw new AuthenticationError("Must be logged in to create a post ");

      const findUser = await User.findOne({ _id: context.user._id });

      if (!findUser)
        throw new AuthenticationError("No user found to create post");

      let image = "";
      try {
        const upload = s3Uploader.singleFileUploadResovler.bind(s3Uploader);
        const imageUploaded = await upload(parent, { file: file[0] });

        image = imageUploaded.url;
      } catch (error) {
        throw new AuthenticationError(error);
      }
      const post = await Post.create({
        title: title,
        description: description,
        image: image,
        user: context.user._id,
      });

      const userUpdate = await User.findByIdAndUpdate(context.user._id, {
        $push: { posts: post._id },
      });

      return post;
    },
    updatePost: async (
      parent,
      { title, description, file, postId },
      context
    ) => {
      if (!context.user)
        throw new AuthenticationError("Must be logged in to create a post ");

      const findUser = await User.findOne({ _id: context.user._id });

      if (!findUser)
        throw new AuthenticationError("No user found to create post");

      let updates = { title, description };

      if (file) {
        try {
          const upload = s3Uploader.singleFileUploadResovler.bind(s3Uploader);
          const imageUploaded = await upload(parent, { file: file[0] });

          updates.image = imageUploaded.url;
        } catch (error) {
          throw new AuthenticationError(error);
        }
      }

      const post = await Post.findByIdAndUpdate(postId, {
        ...updates,
        user: context.user._id,
      });

      return post;
    },
    singleUpload: async (parent, args) => {
      const upload = s3Uploader.singleFileUploadResovler.bind(s3Uploader);

      try {
        const newUpload = upload(parent, args);
        return newUpload;
      } catch (error) {
        throw error;
      }
    },
    multiUpload: async (parent, args) => {
      const upload = s3Uploader.multiUploadResolver.bind(s3Uploader);

      try {
        const newUploads = await upload(parent, args);
        return newUploads;
      } catch (error) {
        throw error;
      }
    },
    createComment: async (parent, { postId, message }, context) => {
      if (!message) throw new AuthenticationError("Must add a message");
      if (!context.user)
        throw new AuthenticationError("Must be logged in to make a comment");

      const meUser = await User.findById(context.user._id);
      if (!meUser)
        throw new AuthenticationError("Must be logged in to make a comment");
      const newComment = await Comment.create({
        message,
        user: context.user._id,
      });
      const popComment = await newComment.populate("user");
      const updatePost = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: newComment } },
        { new: true }
      );

      return popComment;
    },
    followUser: async (parent, { userId }, context) => {
      if (!context.user)
        throw new AuthenticationError("Must be logged in to follow");

      try {
        const userFollowing = await User.findByIdAndUpdate(
          { _id: userId },
          { $addToSet: { followed: context.user._id } }
        );

        const meUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { following: userFollowing._id } }
        ).populate("following");

        return meUser;
      } catch (error) {}
    },
    unFollowUser: async (parent, { userId }, context) => {
      if (!context.user) throw new AuthenticationError("Must be logged in");

      try {
        const unfollow = await User.findByIdAndUpdate(
          { _id: userId },
          { $pull: { followed: new ObjectId(context.user._id) } }
        );

        const meUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { following: unfollow._id } }
        );

        return meUser;
      } catch (err) {
        throw new AuthenticationError(err);
      }
    },
    addLike: async (parent, { postId }, context) => {
      if (!context.user) return new AuthenticationError("Must be logged in");

      const user = User.findById(context.user._id);
      if (!user) return new AuthenticationError("Musted be logged in");

      const updatePost = Post.findByIdAndUpdate(postId, {
        $addToSet: { likes: context.user._id },
      });

      return updatePost;
    },
    deletePost: async (parent, { postId }, context) => {
      if (!context.user)
        return new AuthenticationError(
          "Cannot delete a post when not logged in"
        );

      const deletedPost = Post.findByIdAndDelete(postId);

      return deletedPost;
    },
  },
};

module.exports = resolvers;

//s3Uploader.singleFileUploadResovler.bind(s3Uploader)
