const { Schema, model, Types } = require("mongoose");
const messageSchema = require("./messages");
const messageGroupsSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [messageSchema],
});

const MessageGroups = model("MessageGroups", messageGroupsSchema);

module.exports = MessageGroups;
