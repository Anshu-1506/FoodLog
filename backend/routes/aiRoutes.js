const express = require('express');
const {
  parseMeal,
  suggest,
  parseDemoMeal,
  getSuggestions,
  whatIfAdvice
} = require('../controllers/aiController');
const {
  protect
} = require('../middleware/authMiddleware');
const demoRateLimit = require('../middleware/demoRateLimit');
const router = express.Router();
router.post('/parse', protect, parseMeal);
router.post('/suggest', protect, suggest);
router.get('/suggestions', protect, getSuggestions);
router.post('/whatif-advice', protect, whatIfAdvice);
router.post('/demo-parse', demoRateLimit, parseDemoMeal);
module.exports = router;