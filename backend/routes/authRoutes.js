const express = require('express');
const {
  signup,
  login,
  getMe,
  googleAuth
} = require('../controllers/authController');
const {
  protect
} = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/me', protect, getMe);
module.exports = router;