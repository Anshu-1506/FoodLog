const express = require('express');
const {
  getInsights
} = require('../controllers/insightController');
const {
  protect
} = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/', protect, getInsights);
module.exports = router;