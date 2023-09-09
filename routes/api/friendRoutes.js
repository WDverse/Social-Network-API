const router = require("express").Router();
const {
  addFriend,
  removeFriend,
} = require("../../controllers/friendController");

// /api/applications/:applicationId/tags
router.route("/:userId/friends/:friendId").post(addFriend);

// /api/applications/:applicationId/tags/:tagId
router.route("/:userId/friends/:friendId").delete(removeFriend);

module.exports = router;
