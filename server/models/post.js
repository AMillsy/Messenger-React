const { Schema, model } = require("mongoose");
const commentSchema = require("./comment");

const postSchema = new Schema(
  {
    title: {
      type: String,
      reqiured: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // commentCount: {
    //   type: Number,
    //   default: 0,
    //   get: getCount,
    // },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    user: { type: Schema.Types.ObjectId, ref: "User" },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { toJSON: { getters: true } }
);

/**
 * post
 * Title : String -- Title of the post the user is making
 * Description : String -- Description of the post the user is making
 * image : String -- Will be a url that links to the image saved in AWS
 * comments: commentSchema -- People will be able to comment on each post
 */
postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});
postSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});
const Post = model("Post", postSchema);
module.exports = Post;
