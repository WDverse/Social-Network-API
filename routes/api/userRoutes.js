const router = require("express").Router();
const userController = require("../../controllers/userController");

// /api/users
router.route("/").get(userController.getUsers).post(userController.createUser);

// /api/users/:userId
router
  .route("/:userId")
  .get(userController.getSingleUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

// /api/users/userId/friends
router.route("/:userId/friends").post(userController.addFriend);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").delete(userController.removeFriend);

module.exports = router;
