const router = require("express").Router();
const thoughtController = require("../../controllers/thoughtController");

router.route("/").get(thoughtController.getThought).post(thoughtController.createThought);

router
  .route("/:thoughtId")
  .get(thoughtController.getSingleThought)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(thoughtController.addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionid
router.route("/:thoughtId/reactions/:reactionId").delete(thoughtController.removeReaction);

module.exports = router;
