const Meal = require('../models/Meal');
const getRangeMeals = async (userId, days) => {
  const start = new Date();
  start.setDate(start.getDate() - days);
  start.setHours(0, 0, 0, 0);
  return Meal.find({
    user: userId,
    loggedAt: {
      $gte: start
    }
  }).sort({
    loggedAt: 1
  });
};
const groupByDay = meals => {
  const map = {};
  meals.forEach(m => {
    const key = m.loggedAt.toISOString().slice(0, 10);
    if (!map[key]) map[key] = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
    map[key].calories += m.totalCalories;
    map[key].protein += m.totalProtein;
    map[key].carbs += m.totalCarbs;
    map[key].fat += m.totalFat;
  });
  return map;
};
const buildInsights = async (userId, days, goals) => {
  const meals = await getRangeMeals(userId, days);
  const byDay = groupByDay(meals);
  const dayEntries = Object.entries(byDay);
  if (!dayEntries.length) {
    return {
      flags: [],
      averages: null,
      dailyBreakdown: {}
    };
  }
  const avg = key => dayEntries.reduce((sum, [, v]) => sum + v[key], 0) / dayEntries.length;
  const averages = {
    calories: Math.round(avg('calories')),
    protein: Math.round(avg('protein')),
    carbs: Math.round(avg('carbs')),
    fat: Math.round(avg('fat'))
  };
  const flags = [];
  if (averages.protein < goals.protein * 0.7) {
    flags.push({
      type: 'low_protein',
      message: `Your average protein intake (${averages.protein}g) is well below your goal (${goals.protein}g).`
    });
  }
  const weekendEntries = dayEntries.filter(([date]) => {
    const day = new Date(date).getDay();
    return day === 0 || day === 6;
  });
  const weekdayEntries = dayEntries.filter(([date]) => {
    const day = new Date(date).getDay();
    return day !== 0 && day !== 6;
  });
  if (weekendEntries.length && weekdayEntries.length) {
    const weekendAvg = weekendEntries.reduce((s, [, v]) => s + v.calories, 0) / weekendEntries.length;
    const weekdayAvg = weekdayEntries.reduce((s, [, v]) => s + v.calories, 0) / weekdayEntries.length;
    if (weekendAvg > weekdayAvg * 1.2) {
      flags.push({
        type: 'weekend_spike',
        message: `Weekend calorie intake is ${Math.round((weekendAvg - weekdayAvg) / weekdayAvg * 100)}% higher than weekdays.`
      });
    }
  }
  const loggedDaysRatio = dayEntries.length / days;
  if (loggedDaysRatio < 0.6) {
    flags.push({
      type: 'inconsistent_logging',
      message: `You've only logged meals on ${dayEntries.length} of the last ${days} days.`
    });
  }
  return {
    flags,
    averages,
    dailyBreakdown: byDay
  };
};
module.exports = {
  buildInsights
};