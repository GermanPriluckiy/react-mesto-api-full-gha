const router = require('express').Router();
const {
  joiUserValidation,
  joiUserIdValidation,
  joiUserAvatarValidation,
} = require('../utils/userValidation');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', joiUserIdValidation, getUserById);
router.patch('/me', joiUserValidation, updateUser);
router.patch('/me/avatar', joiUserAvatarValidation, updateAvatar);

module.exports = router;
