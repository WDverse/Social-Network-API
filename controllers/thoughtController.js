import { Thought, User } from "../models";

export async function getThought(req, res) {
  try {
    const thought = await Thought.find();
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}
export
  // Gets a single thought using the findOneAndUpdate method. We pass in the ID of the thought and then respond with it, or an error if not found
  async function getSingleThought(req, res) {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });

    if (!thought) {
      return res.status(404).json({ message: "No thought with that ID" });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}
export
  // Creates a new thought. Accepts a request body with the entire Thought object.
  // Because thoughts are associated with Users, we then update the User who created the thought and add the ID of the thought to the thoughts array
  async function createThought(req, res) {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "Thought created, but found no user with that ID",
      });
    }

    res.json("Thought Created");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
export
  // Updates a thought using the findOneAndUpdate method. Uses the ID, and the $set operator in mongodb to inject the request body. Enforces validation.
  async function updateThought(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }

    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
export
  // Deletes a thought from the database. Looks for a thought by ID.
  // Then if the thought exists, we look for any users associated with the thought based on he thought ID and update the thoughts array for the User.
  async function deleteThought(req, res) {
  try {
    const thought = await Thought.findOneAndRemove({
      _id: req.params.thoughtId,
    });

    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }

    const user = await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "Thought created but no user with this id!",
      });
    }

    res.json({ message: "Thought deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
}
export async function addReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}
export
  // Remove thought reaction. This method finds the thought based on ID. It then updates the reactions array associated with the thought in question by removing it's reactionId from the reactions array.
  async function removeReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}
