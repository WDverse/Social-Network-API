// Import necessary modules and libraries.
const express = require("express");
const db = require("./config/connection.js");
const { urlencoded, json } = require("express");
const models = require("./models/index.js");
const routes = require("./routes/index.js");

// Get the current working directory.
const cwd = process.cwd();

// Define the port on which the server will listen.
const PORT = 3001;

// Create an instance of the Express application.
const app = express();

// Middleware setup:

// Parse incoming URL-encoded data and JSON data.
app.use(urlencoded({ extended: true }));
app.use(json());

// Set up routes for the application.
app.use(routes);

// When the database connection is established, start the server.
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
