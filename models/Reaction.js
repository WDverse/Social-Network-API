const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

reactionSchema.virtual("formattedCreatedAt").get(function () {
  const date = new Date(this.createdAt);
  const formattedDate = `${dtae.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  return formattedDate;
});

module.exports = reactionSchema;