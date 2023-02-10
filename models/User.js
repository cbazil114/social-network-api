const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // validation
    },
    thoughts: [thoughtSchema],
    friends: [userSchema],
  }
  // {
  //   toJSON: {
  //     getters: true,
  //   },
  // }
);

const User = model('user', userSchema);

module.exports = User;
