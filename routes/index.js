// Import the 'express' library and create a router instance.
const router = require('express').Router();

// Import the 'apiRoutes' from the './api' module.
const apiRoutes = require('./api');

// Use the 'apiRoutes' under the "/api" endpoint.
router.use('/api', apiRoutes);

// Define a catch-all route for handling undefined routes.
router.use((req, res) => {
  return res.send('Wrong route!'); // Send a response for undefined routes.
});

// Export the router.
module.exports = router;
