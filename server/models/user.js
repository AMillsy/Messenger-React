const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /.[\w_\.-]+@[\w\.-]+\.(\w{2,3})+/,
        "Must match an email address!",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },
    image: {
      type: String,
    },
    location: {
      type: String,
    },
    job: {
      type: String,
    },
    skills: [{ type: String }],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    followed: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { toJSON: { virtuals: true } }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error(`${Object.keys(error.keyValue)[0]} already exists`));
  } else {
    next(error);
  }
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("postCount").get(function () {
  return this.posts.length;
});
const User = model("User", userSchema);

module.exports = User;

/**
 * username -- string: needed as its a social media app, we need to store some identification
 * email -- string: So that they can login either via username or email
 * password -- string: To secure the account, using bcrypt to hash the passwords
 * posts -- Mongoose IDs: Links to all the posts that the user will have
 *
 */
