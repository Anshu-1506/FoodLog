const mongoose = require('mongoose');
const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  aliases: [String],
  unit: {
    type: String,
    enum: ['piece', '100g', 'cup', 'glass', 'bowl'],
    default: '100g'
  },
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number
});
module.exports = mongoose.model('FoodItem', foodItemSchema);