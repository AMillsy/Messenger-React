const { Schema } = require("mongoose");

const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = messageSchema;
