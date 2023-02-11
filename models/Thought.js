const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    thoughtId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: timestamp => dateFormat(timestamp)
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
    default: () => new Types.ObjectId(),
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
    get: timestamp => dateFormat(timestamp),
  },
},
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
)

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
