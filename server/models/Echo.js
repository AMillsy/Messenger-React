const { Schema, Types } = require("mongoose");
const messageSchema = require("./messages");
const EchoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    unique: true,
    ref: "User",
  },
  people: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [messageSchema],
});

//user will be the owner of the Echo, they will be able to kick people and delete the Echo

module.exports = EchoSchema;
