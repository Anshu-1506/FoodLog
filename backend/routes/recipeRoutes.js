const express = require('express');
const {
  getRecipes
} = require('../controllers/recipeController');
const {
  protect
} = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/', protect, getRecipes);
module.exports = router;