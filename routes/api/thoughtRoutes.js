const router = require("express").Router();
import {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from "../../controllers/thoughtController";

router.route("/").get(getThought).post(createThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/applications/:applicationId/tags
router.route("/:thoughtId/reactions").post(addReaction);

// /api/applications/:applicationId/tags/:tagId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

export default router;
