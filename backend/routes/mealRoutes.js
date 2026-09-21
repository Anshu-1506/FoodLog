const express = require('express');
const {
  createMeal,
  getMeals,
  getMealById,
  updateMeal,
  deleteMeal,
  getTodaySummary
} = require('../controllers/mealController');
const {
  protect
} = require('../middleware/authMiddleware');
const router = express.Router();
router.use(protect);
router.route('/').post(createMeal).get(getMeals);
router.get('/today/summary', getTodaySummary);
router.route('/:id').get(getMealById).put(updateMeal).delete(deleteMeal);
module.exports = router;