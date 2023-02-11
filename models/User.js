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
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thought',
    },],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user',
    },],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

// friend count virtual - get all friends
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
})

// create the model via the schema
const User = model('user', userSchema);

module.exports = User;
