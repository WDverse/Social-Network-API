// Import 'Schema' and 'model' components from the 'mongoose' library.
const { Schema, model } = require("mongoose");

// Define the 'userSchema' using the 'Schema' constructor.
const userSchema = new Schema(
  {
    // Define a field for the username of the user.
    username: {
      type: String, // Data type: String
      unique: true, // Ensure that usernames are unique.
      required: true, // It is required.
      trim: true, // Remove leading and trailing spaces from the input.
    },
    // Define a field for the email of the user.
    email: {
      type: String, // Data type: String
      unique: true, // Ensure that emails are unique.
      validate: {
        validator: function (email) {
          // Use a regular expression to validate the email format.
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      required: [true, "User email required"], // It is required with a custom error message.
    },
    // Define an array field for storing the user's thoughts, referenced by ObjectId.
    thoughts: [
      {
        type: Schema.Types.ObjectId, // Data type: ObjectId
        ref: "Thought", // Reference to the 'Thought' model.
      },
    ],
    // Define an array field for storing the user's friends, referenced by ObjectId.
    friends: [
      {
        type: Schema.Types.ObjectId, // Data type: ObjectId
        ref: "User", // Reference to the 'User' model (self-referencing for friends).
      },
    ],
  },
  {
    // Additional configuration options for the schema.
    toJSON: {
      virtuals: true, // Include virtual properties when converting to JSON.
    },
    id: false, // Exclude '_id' from the schema.
  }
);

// Define a virtual property 'friendCount' to count the number of friends.
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Create a 'User' model using the 'userSchema'.
const User = model("User", userSchema);

// Export the User model.
module.exports = User;
