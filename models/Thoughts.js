const { Schema, Types } = require('mongoose');

const thoughtsSchema = new Schema(
  {
    thoughtsId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtsText: {
      type: String,
      required: true,
      maxlength: 280,
      // minlength: 1,
    },
    // score: {
    //   type: Number,
    //   required: true,
    //   default: () => Math.floor(Math.random() * (100 - 70 + 1) + 70),
    // },
    createdAt: {
      type: Date,
      default: Date.now(),
      // get: 
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})

module.exports = thoughtsSchema;
