const { Schema, model, Types } = require("mongoose");
const EchoSchema = require("./Echo");
const EchoGroupSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "name is required"],
      unique: true,
      trim: true,
    },
    groups: [EchoSchema],
  },
  { toJSON: { virtuals: true } }
);

EchoGroupSchema.virtual("groupCount").get(function () {
  return this.groups.length;
});

const EchoGroup = model("EchoGroup", EchoGroupSchema);
module.exports = EchoGroup;
