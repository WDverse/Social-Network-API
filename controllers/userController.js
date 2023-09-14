// Import the User and Thought models from the '../models' directory.
const { User, Thought } = require("../models");

// Function to get all users from the database.
async function getUsers(req, res) {
  try {
    // Find all users in the database and store them in the 'users' variable.
    const users = await User.find();
    // Respond with a JSON representation of the retrieved users.
    res.json(users);
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error message.
    res.status(500).json(err);
  }
}

// Function to get a single user by their ID from the database.
async function getSingleUser(req, res) {
  try {
    // Find a user in the database by their ID from the request parameters.
    // Exclude the '__v' field from the returned data.
    const user = await User.findOne({ _id: req.params.userId }).select("-__v");

    // If no user is found, respond with a 404 Not Found status and a message.
    if (!user) {
      return res.status(404).json({ message: "No user with that ID" });
    }

    // Respond with a JSON representation of the retrieved user.
    res.json(user);
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error message.
    res.status(500).json(err);
  }
}

// Function to create a new user in the database.
async function createUser(req, res) {
  try {
    // Create a new user using the data from the request body.
    const user = await User.create(req.body);
    // Respond with a JSON representation of the created user.
    res.json(user);
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error message.
    res.status(500).json(err);
  }
}

// Function to update a user by their ID in the database.
async function updateUser(req, res) {
  try {
    // Find and update a user by their ID with the data from the request body.
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    // If no user is found, respond with a 404 Not Found status and a message.
    if (!user) {
      return res.status(404).json({ message: "No user with this id!" });
    }

    // Respond with a JSON representation of the updated user.
    res.json(user);
  } catch (err) {
    // If an error occurs, log the error and respond with a 500 Internal Server Error.
    console.log(err);
    res.status(500).json(err);
  }
}

// Function to delete a user by their ID from the database.
async function deleteUser(req, res) {
  try {
    // Find and delete a user by their ID.
    const user = await User.findOneAndDelete({ _id: req.params.userId });

    // If no user is found, respond with a 404 Not Found status and a message.
    if (!user) {
      return res.status(404).json({ message: "No user with that ID" });
    }

    // Delete all thoughts associated with the deleted user.
    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    // Respond with a success message.
    res.json({ message: "User and associated thought deleted!" });
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error message.
    res.status(500).json(err);
  }
}

// Function to add a friend to a user by their ID in the database.
async function addFriend(req, res) {
  try {
    // Find and update a user by their ID to add a friend from the request body.
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    );

    // If no user is found, respond with a 404 Not Found status and a message.
    if (!user) {
      return res.status(404).json({ message: "No user with this id!" });
    }

    // Respond with a JSON representation of the updated user.
    res.json(user);
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error message.
    res.status(500).json(err);
  }
}

// Function to remove a friend from a user by their ID in the database.
async function removeFriend(req, res) {
  try {
    // Find and update a user by their ID to remove a friend by 'friendId' from the request parameters.
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );

    // If no user is found, respond with a 404 Not Found status and a message.
    if (!user) {
      return res.status(404).json({ message: "No user with this id!" });
    }

    // Respond with a JSON representation of the updated user.
    res.json(user);
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error message.
    res.status(500).json(err);
  }
}

// Export all the defined functions to be used in other parts of the application.
module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
