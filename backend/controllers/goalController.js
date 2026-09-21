const User = require('../models/User');
const goalPresets = {
  lose: {
    calories: 1800,
    protein: 130,
    carbs: 180,
    fat: 55,
    water: 8
  },
  maintain: {
    calories: 2200,
    protein: 110,
    carbs: 275,
    fat: 65,
    water: 8
  },
  gain: {
    calories: 2700,
    protein: 130,
    carbs: 340,
    fat: 80,
    water: 8
  },
  muscle: {
    calories: 2900,
    protein: 160,
    carbs: 320,
    fat: 85,
    water: 10
  }
};
const activityMultipliers = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9
};
const getGoals = async (req, res, next) => {
  try {
    res.json({
      goalType: req.user.goalType,
      ...req.user.dailyGoals,
      bodyStats: req.user.bodyStats || null
    });
  } catch (err) {
    next(err);
  }
};
const updateGoals = async (req, res, next) => {
  try {
    const {
      goalType,
      calories,
      protein,
      carbs,
      fat,
      water
    } = req.body;
    const user = await User.findById(req.user._id);
    if (goalType && goalPresets[goalType]) {
      user.goalType = goalType;
      user.dailyGoals = goalPresets[goalType];
    } else {
      user.dailyGoals = {
        calories: calories ?? user.dailyGoals.calories,
        protein: protein ?? user.dailyGoals.protein,
        carbs: carbs ?? user.dailyGoals.carbs,
        fat: fat ?? user.dailyGoals.fat,
        water: water ?? user.dailyGoals.water
      };
    }
    await user.save();
    res.json({
      goalType: user.goalType,
      ...user.dailyGoals
    });
  } catch (err) {
    next(err);
  }
};
const calculateGoals = async (req, res, next) => {
  try {
    const {
      gender,
      age,
      heightCm,
      currentWeightKg,
      targetWeightKg,
      activityLevel,
      timeframeWeeks
    } = req.body;
    if (!gender || !age || !heightCm || !currentWeightKg || !targetWeightKg || !activityLevel || !timeframeWeeks) {
      return res.status(400).json({
        message: 'All fields are required for calculation'
      });
    }
    if (timeframeWeeks <= 0) {
      return res.status(400).json({
        message: 'Timeframe must be greater than 0 weeks'
      });
    }
    const bmr = gender === 'male' ? 10 * currentWeightKg + 6.25 * heightCm - 5 * age + 5 : 10 * currentWeightKg + 6.25 * heightCm - 5 * age - 161;
    const multiplier = activityMultipliers[activityLevel] || 1.2;
    const tdee = bmr * multiplier;
    const weightDeltaKg = targetWeightKg - currentWeightKg;
    const totalCalorieAdjustment = weightDeltaKg * 7700;
    const dailyAdjustment = totalCalorieAdjustment / (timeframeWeeks * 7);
    const clampedAdjustment = Math.max(-1000, Math.min(1000, dailyAdjustment));
    let calories = Math.round(tdee + clampedAdjustment);
    const minCalories = gender === 'male' ? 1500 : 1200;
    calories = Math.max(calories, minCalories);
    const isLosing = weightDeltaKg < -0.5;
    const isGaining = weightDeltaKg > 0.5;
    let proteinPerKg, fatPercent;
    if (isLosing) {
      proteinPerKg = 2.2;
      fatPercent = 0.25;
    } else if (isGaining) {
      proteinPerKg = 2.0;
      fatPercent = 0.25;
    } else {
      proteinPerKg = 1.8;
      fatPercent = 0.3;
    }
    const protein = Math.round(proteinPerKg * currentWeightKg);
    const fatCalories = calories * fatPercent;
    const fat = Math.round(fatCalories / 9);
    const proteinCalories = protein * 4;
    const carbCalories = Math.max(calories - proteinCalories - fatCalories, 0);
    const carbs = Math.round(carbCalories / 4);
    const water = Math.round(currentWeightKg * 35 / 250);
    const suggestedGoalType = isLosing ? 'lose' : isGaining ? proteinPerKg >= 2.0 ? 'muscle' : 'gain' : 'maintain';
    res.json({
      calories,
      protein,
      carbs,
      fat,
      water: Math.max(water, 6),
      suggestedGoalType,
      bmr: Math.round(bmr),
      tdee: Math.round(tdee)
    });
  } catch (err) {
    next(err);
  }
};
const saveBodyStats = async (req, res, next) => {
  try {
    const {
      gender,
      age,
      heightCm,
      currentWeightKg,
      targetWeightKg,
      activityLevel,
      timeframeWeeks
    } = req.body;
    const user = await User.findById(req.user._id);
    user.bodyStats = {
      gender,
      age,
      heightCm,
      currentWeightKg,
      targetWeightKg,
      activityLevel,
      timeframeWeeks
    };
    await user.save();
    res.json(user.bodyStats);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getGoals,
  updateGoals,
  calculateGoals,
  saveBodyStats
};