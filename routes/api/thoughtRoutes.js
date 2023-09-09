const router = require('express').Router();
const {
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');


// /api/applications/:applicationId/tags
router.route('/:thoughtId/reactions').post(addReaction);

// /api/applications/:applicationId/tags/:tagId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;