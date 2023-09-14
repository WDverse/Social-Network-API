// Import 'Schema' and 'Types' components from the 'mongoose' library.
const { Schema, Types } = require("mongoose");

// Define the 'reactionSchema' using the 'Schema' constructor.
const reactionSchema = new Schema(
  {
    // Define a field for the reaction's ID.
    reactionId: {
      type: Schema.Types.ObjectId, // Data type: Object ID
      default: () => new Types.ObjectId(), // Generate a new ObjectId by default.
    },
    // Define a field for the reaction's body.
    reactionBody: {
      type: String, // Data type: String
      required: true, // It is required.
      max: 280, // Maximum length of 280 characters.
    },
    // Define a field for the username of the reaction's author.
    username: {
      type: String, // Data type: String
      required: true, // It is required.
    },
    // Define a field for the creation timestamp of the reaction.
    createdAt: {
      type: Date, // Data type: Date
      default: Date.now, // Default value is the current date and time.
    },
  },
  {
    // Additional configuration options for the schema.
    toJSON: {
      getters: true, // Include virtual properties when converting to JSON.
    },
    id: false, // Exclude '_id' from the schema.
  }
);

// Define a virtual property 'formattedCreatedAt' for formatted date and time.
reactionSchema.virtual("formattedCreatedAt").get(function () {
  const date = new Date(this.createdAt);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  return formattedDate;
});

// Export 'reactionSchema'.
module.exports = reactionSchema;
