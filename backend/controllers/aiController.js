const {
  parseMealText,
  generateSuggestion,
  generateMultipleSuggestions,
  generateWhatIfAdvice
} = require('../services/openRouterService');
const Meal = require('../models/Meal');
const parseMeal = async (req, res, next) => {
  try {
    const {
      text
    } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({
        message: 'text is required'
      });
    }
    const {
      items: rawItems,
      notes
    } = await parseMealText(text);
    if (!rawItems.length) {
      return res.status(200).json({
        items: [],
        totals: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0
        },
        notes: notes || "Couldn't identify any food items in that description."
      });
    }
    const items = rawItems.map(item => ({
      name: item.name,
      quantity: Number(item.quantity) || 1,
      unit: item.unit || 'unit',
      calories: Math.round(Number(item.calories) || 0),
      protein: Math.round((Number(item.protein) || 0) * 10) / 10,
      carbs: Math.round((Number(item.carbs) || 0) * 10) / 10,
      fat: Math.round((Number(item.fat) || 0) * 10) / 10,
      confidence: 'ai-estimated'
    }));
    const totals = items.reduce((acc, i) => ({
      calories: acc.calories + i.calories,
      protein: acc.protein + i.protein,
      carbs: acc.carbs + i.carbs,
      fat: acc.fat + i.fat
    }), {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    });
    res.json({
      items,
      totals,
      notes
    });
  } catch (err) {
    next(err);
  }
};
const suggest = async (req, res, next) => {
  try {
    const {
      totals,
      goals,
      remaining
    } = req.body;
    if (!totals || !goals || !remaining) {
      return res.status(400).json({
        message: 'totals, goals and remaining are required'
      });
    }
    const suggestion = await generateSuggestion({
      totals,
      goals,
      remaining
    });
    res.json({
      suggestion
    });
  } catch (err) {
    next(err);
  }
};
const parseDemoMeal = async (req, res, next) => {
  try {
    const {
      text
    } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({
        message: 'text is required'
      });
    }
    const {
      items: rawItems,
      notes
    } = await parseMealText(text);
    if (!rawItems.length) {
      return res.status(200).json({
        items: [],
        totals: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0
        },
        notes: notes || "Couldn't identify any food items in that description."
      });
    }
    const items = rawItems.map(item => ({
      name: item.name,
      quantity: Number(item.quantity) || 1,
      unit: item.unit || 'unit',
      calories: Math.round(Number(item.calories) || 0),
      protein: Math.round((Number(item.protein) || 0) * 10) / 10,
      carbs: Math.round((Number(item.carbs) || 0) * 10) / 10,
      fat: Math.round((Number(item.fat) || 0) * 10) / 10,
      confidence: 'ai-estimated'
    }));
    const totals = items.reduce((acc, i) => ({
      calories: acc.calories + i.calories,
      protein: acc.protein + i.protein,
      carbs: acc.carbs + i.carbs,
      fat: acc.fat + i.fat
    }), {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    });
    res.json({
      items,
      totals,
      notes
    });
  } catch (err) {
    next(err);
  }
};
const getSuggestions = async (req, res, next) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const todaysMeals = await Meal.find({
      user: req.user._id,
      loggedAt: {
        $gte: start,
        $lte: end
      }
    }).sort({
      loggedAt: 1
    });
    const totals = todaysMeals.reduce((acc, m) => ({
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
    const recentMeals = todaysMeals.map(m => ({
      mealType: m.mealType,
      items: m.items.map(i => i.name)
    }));
    const suggestions = await generateMultipleSuggestions({
      totals,
      goals,
      remaining,
      recentMeals
    });
    res.json({
      suggestions,
      totals,
      goals,
      remaining
    });
  } catch (err) {
    next(err);
  }
};
const whatIfAdvice = async (req, res, next) => {
  try {
    const {
      mealDescription,
      mealTotals,
      currentTotals,
      goals,
      remaining
    } = req.body;
    if (!mealDescription || !mealTotals || !currentTotals || !goals || !remaining) {
      return res.status(400).json({
        message: 'All fields are required'
      });
    }
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const todaysMeals = await Meal.find({
      user: req.user._id,
      loggedAt: {
        $gte: start,
        $lte: end
      }
    }).select('mealType');
    const advice = await generateWhatIfAdvice({
      mealDescription,
      mealTotals,
      currentTotals,
      goals,
      remaining,
      todaysMeals
    });
    res.json({
      advice
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  parseMeal,
  suggest,
  parseDemoMeal,
  getSuggestions,
  whatIfAdvice
};