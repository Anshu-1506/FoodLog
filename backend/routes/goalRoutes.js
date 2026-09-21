const express = require('express');
const {
  getGoals,
  updateGoals,
  calculateGoals,
  saveBodyStats
} = require('../controllers/goalController');
const {
  protect
} = require('../middleware/authMiddleware');
const router = express.Router();
router.use(protect);
router.route('/').get(getGoals).put(updateGoals);
router.post('/calculate', calculateGoals);
router.put('/body-stats', saveBodyStats);
module.exports = router;