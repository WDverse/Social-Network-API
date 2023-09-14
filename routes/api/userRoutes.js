// Import the 'express' library and create a router instance.
const router = require("express").Router();

// Import the 'userController' from the '../controllers/userController' module.
const userController = require("../../controllers/userController");

// Define routes for handling users:

// GET '/api/users': Get all users or POST a new user.
router.route("/").get(userController.getUsers).post(userController.createUser);

// Define routes for handling single users by their ID:

// GET '/api/users/:userId': Get a single user by their ID.
// PUT '/api/users/:userId': Update a single user by their ID.
// DELETE '/api/users/:userId': Delete a single user by their ID.
router
  .route("/:userId")
  .get(userController.getSingleUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

// Define routes for handling user's friends:

// POST '/api/users/:userId/friends': Add a friend to a user by their ID.
router.route("/:userId/friends").post(userController.addFriend);

// DELETE '/api/users/:userId/friends/:friendId': Remove a friend from a user by user and friend ID.
router.route("/:userId/friends/:friendId").delete(userController.removeFriend);

// Export the router.
module.exports = router;
