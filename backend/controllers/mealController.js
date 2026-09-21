const Meal = require('../models/Meal');
const {
  calculateNutrition
} = require('../services/nutritionService');
const updateStreak = async user => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastLog = user.lastLogDate ? new Date(user.lastLogDate) : null;
  if (lastLog) lastLog.setHours(0, 0, 0, 0);
  if (!lastLog) {
    user.streak = 1;
  } else {
    const diffDays = Math.round((today - lastLog) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) {
      return;
    } else if (diffDays === 1) {
      user.streak = (user.streak || 0) + 1;
    } else {
      user.streak = 1;
    }
  }
  user.lastLogDate = today;
  await user.save();
};
const createMeal = async (req, res, next) => {
  try {
    const {
      mealType,
      rawInput,
      items,
      preview
    } = req.body;
    if (!items || !items.length) {
      return res.status(400).json({
        message: 'items are required'
      });
    }
    if (!preview && !mealType) {
      return res.status(400).json({
        message: 'mealType is required'
      });
    }
    const alreadyCalculated = items.every(i => typeof i.calories === 'number');
    const {
      items: finalItems,
      totals
    } = alreadyCalculated ? {
      items,
      totals: items.reduce((acc, i) => ({
        calories: acc.calories + i.calories,
        protein: acc.protein + i.protein,
        carbs: acc.carbs + i.carbs,
        fat: acc.fat + i.fat
      }), {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      })
    } : await calculateNutrition(items);
    if (preview) {
      return res.status(200).json({
        items: finalItems,
        totalCalories: totals.calories,
        totalProtein: totals.protein,
        totalCarbs: totals.carbs,
        totalFat: totals.fat
      });
    }
    const meal = await Meal.create({
      user: req.user._id,
      mealType,
      rawInput: rawInput || '',
      items: finalItems,
      totalCalories: totals.calories,
      totalProtein: totals.protein,
      totalCarbs: totals.carbs,
      totalFat: totals.fat
    });
    await updateStreak(req.user);
    res.status(201).json(meal);
  } catch (err) {
    next(err);
  }
};
const getMeals = async (req, res, next) => {
  try {
    const {
      date,
      mealType,
      search
    } = req.query;
    const query = {
      user: req.user._id
    };
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.loggedAt = {
        $gte: start,
        $lte: end
      };
    }
    if (mealType) query.mealType = mealType;
    if (search) query.rawInput = {
      $regex: search,
      $options: 'i'
    };
    const meals = await Meal.find(query).sort({
      loggedAt: -1
    });
    res.json(meals);
  } catch (err) {
    next(err);
  }
};
const getMealById = async (req, res, next) => {
  try {
    const meal = await Meal.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    if (!meal) return res.status(404).json({
      message: 'Meal not found'
    });
    res.json(meal);
  } catch (err) {
    next(err);
  }
};
const updateMeal = async (req, res, next) => {
  try {
    const meal = await Meal.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    if (!meal) return res.status(404).json({
      message: 'Meal not found'
    });
    const {
      mealType,
      items,
      rawInput
    } = req.body;
    if (items && items.length) {
      const {
        items: calculatedItems,
        totals
      } = await calculateNutrition(items);
      meal.items = calculatedItems;
      meal.totalCalories = totals.calories;
      meal.totalProtein = totals.protein;
      meal.totalCarbs = totals.carbs;
      meal.totalFat = totals.fat;
    }
    if (mealType) meal.mealType = mealType;
    if (rawInput !== undefined) meal.rawInput = rawInput;
    await meal.save();
    res.json(meal);
  } catch (err) {
    next(err);
  }
};
const deleteMeal = async (req, res, next) => {
  try {
    const meal = await Meal.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    if (!meal) return res.status(404).json({
      message: 'Meal not found'
    });
    res.json({
      message: 'Meal deleted'
    });
  } catch (err) {
    next(err);
  }
};
const getTodaySummary = async (req, res, next) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const meals = await Meal.find({
      user: req.user._id,
      loggedAt: {
        $gte: start,
        $lte: end
      }
    }).sort({
      loggedAt: 1
    });
    const totals = meals.reduce((acc, m) => ({
      calories: acc.calories + m.totalCalories,
      protein: acc.protein + m.totalProtein,
      carbs: acc.carbs + m.totalCarbs,
      fat: acc.fat + m.totalFat
    }), {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    });
    const goals = req.user.dailyGoals;
    const remaining = {
      calories: Math.max(goals.calories - totals.calories, 0),
      protein: Math.max(goals.protein - totals.protein, 0),
      carbs: Math.max(goals.carbs - totals.carbs, 0),
      fat: Math.max(goals.fat - totals.fat, 0)
    };
    res.json({
      meals,
      totals,
      goals,
      remaining
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createMeal,
  getMeals,
  getMealById,
  updateMeal,
  deleteMeal,
  getTodaySummary
};