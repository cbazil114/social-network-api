const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
  // addthought,
  // removethought,
} = require('../../controllers/userController');

// /api/users
router.route('/')
  .get(getUsers)
  .post(createUser);

// /api/users/:userId
router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

// /api/users/:userId/thoughts/:thoughtId
// router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

module.exports = router;
