const mongoose = require('mongoose');
const foodEntrySchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  unit: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  confidence: {
    type: String,
    enum: ['high', 'medium', 'low', 'ai-estimated'],
    default: 'high'
  }
}, {
  _id: false
});
const mealSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'snack', 'dinner'],
    required: true
  },
  rawInput: {
    type: String,
    required: true
  },
  items: [foodEntrySchema],
  totalCalories: Number,
  totalProtein: Number,
  totalCarbs: Number,
  totalFat: Number,
  loggedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Meal', mealSchema);