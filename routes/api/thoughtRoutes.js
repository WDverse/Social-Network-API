const router = require("express").Router();
const thoughtController = require("../../controllers/thoughtController");

router.route("/").get(thoughtController.getThought).post(thoughtController.createThought);

router
  .route("/:thoughtId")
  .get(thoughtController.getSingleThought)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

// /api/applications/:applicationId/tags
router.route("/:thoughtId/reactions").post(thoughtController.addReaction);

// /api/applications/:applicationId/tags/:tagId
router.route("/:thoughtId/reactions/:reactionId").delete(thoughtController.removeReaction);

module.exports = router;
