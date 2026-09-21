const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    }
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  goalType: {
    type: String,
    enum: ['lose', 'maintain', 'gain', 'muscle'],
    default: 'maintain'
  },
  dailyGoals: {
    calories: {
      type: Number,
      default: 2200
    },
    protein: {
      type: Number,
      default: 110
    },
    carbs: {
      type: Number,
      default: 275
    },
    fat: {
      type: Number,
      default: 65
    },
    water: {
      type: Number,
      default: 8
    }
  },
  streak: {
    type: Number,
    default: 0
  },
  lastLogDate: {
    type: Date
  },
  bodyStats: {
    gender: {
      type: String,
      enum: ['male', 'female']
    },
    age: Number,
    heightCm: Number,
    currentWeightKg: Number,
    targetWeightKg: Number,
    activityLevel: {
      type: String,
      enum: ['sedentary', 'light', 'moderate', 'active', 'very_active']
    },
    timeframeWeeks: Number
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('User', userSchema);