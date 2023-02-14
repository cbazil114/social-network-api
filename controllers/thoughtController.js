const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .populate({ path: 'reactions', select: '-__v' })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ thoughtId: req.params.thoughtId })
      .populate({ path: "reactions", select: "-__v" })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  // createThought(req, res) {
  //   Thought.create(req.body)
  //   .then(({ _id }) => {
  //     return User.findOneAndUpdate(
  //       { _id: body.userId },
  //       { $push: { thoughts: _id } },
  //       { new: true },
  //     );
  //   })
  //   .then((user) =>
  //   !user
  //     ? res.status(404).json({ message: 'No user with this id!' })
  //     : res.json({ message: "Thought successfully created"})
  // )
  // .catch((err) => res.status(500).json(err));
// },
createThought(req, res) {
  Thought.create(req.body)
    .then((thought) => {
     return User.findOneAndUpdate(
      {_id: req.body.userId},
      {$push:{thoughts: thought._id}},
      {runValidators: true, new: true})},
    )
//     .then(result => res.json(result))
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).json(err);
//     });
// },
.then((user) =>
    !user
      ? res.status(404).json({ message: 'No user with this id!' })
      : res.json({ message: "Thought successfully created"})
  )
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
},

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : 
          User.findOneAndUpdate(
            { thoughts: params._id },
            { $pull: { thoughts: params._id }},
            { new: true })
      )
      .then(() => res.json({ message: 'Thought and users deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a reaction. Find thought based on ID and updates the reaction array. 
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : 
          res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a reaction. Find thought based on ID and updates the reaction array associated wiht the thought in question.
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
