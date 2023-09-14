// Import the 'express' library and create a router instance.
const router = require("express").Router();

// Import the 'thoughtController' from the '../controllers/thoughtController' module.
const thoughtController = require("../../controllers/thoughtController");

// Define routes for handling thoughts:

// GET '/api/thoughts': Get all thoughts or POST a new thought.
router.route("/").get(thoughtController.getThought).post(thoughtController.createThought);

// Define routes for handling single thoughts by their ID:

// GET '/api/thoughts/:thoughtId': Get a single thought by its ID.
// PUT '/api/thoughts/:thoughtId': Update a single thought by its ID.
// DELETE '/api/thoughts/:thoughtId': Delete a single thought by its ID.
router
  .route("/:thoughtId")
  .get(thoughtController.getSingleThought)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

// Define routes for handling reactions to thoughts:

// POST '/api/thoughts/:thoughtId/reactions': Add a reaction to a thought by its ID.
router.route("/:thoughtId/reactions").post(thoughtController.addReaction);

// DELETE '/api/thoughts/:thoughtId/reactions/:reactionId': Remove a reaction from a thought by thought and reaction ID.
router.route("/:thoughtId/reactions/:reactionId").delete(thoughtController.removeReaction);

// Export the router.
module.exports = router;
