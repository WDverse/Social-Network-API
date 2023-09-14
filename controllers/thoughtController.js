// Import the Thought and User models from the '../models' directory.
const { Thought, User } = require("../models");

// Function to get all thoughts from the database.
async function getThought(req, res) {
  try {
    // Find all thoughts in the database and store them in the 'thought' variable.
    const thought = await Thought.find();
    // Respond with a JSON representation of the retrieved thoughts.
    res.json(thought);
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error message.
    res.status(500).json(err);
  }
}

// Function to get a single thought by its ID from the database.
async function getSingleThought(req, res) {
  try {
    // Find a thought in the database by its ID from the request parameters.
    const thought = await Thought.findOne({ _id: req.params.thoughtId });

    // If no thought is found, respond with a 404 Not Found status and a message.
    if (!thought) {
      return res.status(404).json({ message: "No thought with that ID" });
    }

    // Respond with a JSON representation of the retrieved thought.
    res.json(thought);
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error message.
    res.status(500).json(err);
  }
}

// Function to create a new thought in the database.
async function createThought(req, res) {
  try {
    // Create a new thought using the data from the request body.
    const thought = await Thought.create(req.body);

    // Find a user by ID and add the created thought's ID to their 'thoughts' array.
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );

    // If no user is found, respond with a 404 Not Found status and a message.
    if (!user) {
      return res.status(404).json({
        message: "Thought created, but found no user with that ID",
      });
    }

    // Respond with a success message.
    res.json("Thought Created");
  } catch (err) {
    // If an error occurs, log the error and respond with a 500 Internal Server Error.
    res.status(500).json(err);
  }
}

// Function to update a thought by its ID in the database.
async function updateThought(req, res) {
  try {
    // Find and update a thought by its ID with the data from the request body.
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    // If no thought is found, respond with a 404 Not Found status and a message.
    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }

    // Respond with a JSON representation of the updated thought.
    res.json(thought);
  } catch (err) {
    // If an error occurs, log the error and respond with a 500 Internal Server Error.
    console.log(err);
    res.status(500).json(err);
  }
}

// Function to delete a thought by its ID from the database.
async function deleteThought(req, res) {
  try {
    // Find and delete a thought by its ID.
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });

    // If no thought is found, respond with a 404 Not Found status and a message.
    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }

    // Find a user by their 'thoughts' array and remove the deleted thought's ID from it.
    const user = await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
      { runValidators: true, new: true }
    );

    // If no user is found, respond with a 404 Not Found status and a message.
    if (!user) {
      return res.status(404).json({
        message: "Thought deleted but found no user with this id!",
      });
    }

    // Respond with a success message.
    res.json({ message: "Thought deleted!" });
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error message.
    res.status(500).json(err);
  }
}

// Function to add a reaction to a thought by its ID in the database.
async function addReaction(req, res) {
  try {
    // Find and update a thought by its ID to add a reaction from the request body.
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    // If no thought is found, respond with a 404 Not Found status and a message.
    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }

    // Respond with a JSON representation of the updated thought.
    res.json(thought);
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error message.
    res.status(500).json(err);
  }
}

// Function to remove a reaction from a thought by its ID in the database.
async function removeReaction(req, res) {
  try {
    // Find and update a thought by its ID to remove a reaction by 'reactionId' from the request parameters.
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    // If no thought is found, respond with a 404 Not Found status and a message.
    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }

    // Respond with a JSON representation of the updated thought.
    res.json(thought);
  } catch (err) {
    // If an error occurs, respond with a 500 Internal Server Error and the error message.
    res.status(500).json(err);
  }
}

// Export all the defined functions to be used in other parts of the application.
module.exports = {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
