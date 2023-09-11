const router = require("express").Router();
import {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from "../../controllers/userController";

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route(":/userid").get(getSingleUser).put(updateUser).delete(deleteUser);
// /api/users/userId/friends
router.route("/:userId/friends").post(addFriend);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").delete(removeFriend);

export default router;
