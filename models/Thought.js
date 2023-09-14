// Import 'Schema' and 'model' components from the 'mongoose' library.
const { Schema, model } = require("mongoose");

// Import the 'Reaction' schema from the './Reaction' module.
const Reaction = require("./Reaction");

// Define the 'thoughtSchema' using the 'Schema' constructor.
const thoughtSchema = new Schema(
  {
    // Define a field for the text of the thought.
    thoughtText: {
      type: String, // Data type: String
      required: true, // It is required.
      min: 1, // Minimum length of 1 character.
      max: 280, // Maximum length of 280 characters.
    },
    // Define a field for the creation timestamp of the thought.
    createdAt: {
      type: Date, // Data type: Date
      default: Date.now, // Default value is the current date and time.
    },
    // Define a field for the username of the thought's author.
    username: {
      type: String, // Data type: String
      required: true, // It is required.
    },
    // Define an array field for storing reactions, using the 'Reaction' schema.
    reactions: [Reaction],
  },
  {
    // Additional configuration options for the schema.
    toJSON: {
      virtuals: true, // Include virtual properties when converting to JSON.
    },
    id: false, // Exclude '_id' from the schema.
  }
);

// Define a virtual property 'formattedCreatedAt' for formatted date and time.
thoughtSchema.virtual("formattedCreatedAt").get(function () {
  const date = new Date(this.createdAt);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  return formattedDate;
});

// Define a virtual property 'reactionCount' to count the number of reactions.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Create a 'Thought' model using the 'thoughtSchema'.
const Thought = model("Thought", thoughtSchema);

// Export the Thought model..
module.exports = Thought;
