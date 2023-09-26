const { Schema } = require("mongoose");

const messageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
  },
});

module.exports = messageSchema;
