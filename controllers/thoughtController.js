const { Thought, User } = require("../models");

async function getThought(req, res) {
  try {
    const thought = await Thought.find();
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
}

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

async function deleteThought(req, res) {
  try {
    const thought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });

    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }

    const user = await User.findOneAndUpdate(
      {_id: req.body.userId  },
      { $pull: { thoughts: req.params.thoughtId } },
      { runValidators: true, new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "Thought deleted but no user with this id!",
      });
    }

    res.json({ message: "Thought deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function addReaction(req, res) {
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

module.exports = {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
