const db = require("../config/connection");
const { Post, User, Comment } = require("../models");
const postData = require("./postData.json");
const userData = require("./userData.json");
const commentData = require("./commentData.json");
const seed = async () => {
  db.once("open", async () => {
    await Post.deleteMany({});
    await User.deleteMany({});

    const createUsers = [];

    for (const user of userData) {
      const newUser = await User.create(user);

      createUsers.push(newUser);
    }

    for (const [
      i,
      { title, description, image, likes, comments },
    ] of postData.entries()) {
      const userInt = Math.floor(Math.random() * (createUsers.length - 0) + 0);
      const userMessageInt = Math.floor(
        Math.random() * (createUsers.length - 0) + 0
      );
      const userPost = createUsers[userInt];
      const userMessage = createUsers[userMessageInt];

      const newComment = await Comment.create({
        message: commentData[i].message,
        user: userMessage._id,
      });

      const createPost = await Post.create({
        title: title,
        description: description,
        image: image,
        likes: likes,
        comments: [newComment._id],
        user: userPost._id,
      });

      const updateUser = await User.updateOne(
        { _id: userPost._id },
        { $push: { posts: createPost._id } }
      );
    }

    console.log("Data is seeded");
    process.exit(0);
  });
};

seed();
