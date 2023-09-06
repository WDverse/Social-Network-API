const { Schema, model } = require("mongoose");
const Reactions = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      reguired: true,
      min: 1,
      max: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    username: {
      type: String,
      required: true,
    },
    reactions: [Reactions],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("formattedCreatedAt").get(function () {
  const date = new Date(this.createdAt);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  return formattedDate;
});

thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
  });

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
