const mongoose = require('mongoose');
const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  goalType: {
    type: String,
    enum: ['lose', 'maintain', 'gain', 'muscle'],
    default: 'maintain'
  },
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  water: Number
}, {
  timestamps: true
});
module.exports = mongoose.model('Goal', goalSchema);