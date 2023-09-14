// Import the 'express' library and create a router instance.
const router = require("express").Router();

// Import the user and thought routes from their respective modules.
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

// Use the user routes under the "/users" endpoint.
router.use("/users", userRoutes);

// Use the thought routes under the "/thoughts" endpoint.
router.use("/thoughts", thoughtRoutes);

// Export the router.
module.exports = router;
