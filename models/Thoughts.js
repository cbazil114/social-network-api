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
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = thoughtsSchema;
