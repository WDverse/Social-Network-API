// Import the 'mongoose' library.
const mongoose = require("mongoose");

// Define the connection string to the MongoDB database.
// Check if there is a provided 'MONGODB_URI' in the environment variables,
// otherwise, default to a local database on '127.0.0.1' at port '27017'.
const connectionString =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socialNetwork";

// Connect to the MongoDB database using the provided connection string.
mongoose.connect(connectionString);

// Export the mongoose connection instance.
module.exports = mongoose.connection;
