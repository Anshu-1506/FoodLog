const FoodItem = require('../models/FoodItem');
const localDB = require('../data/foodDatabase.json');
const findFoodMatch = async name => {
  const lower = name.toLowerCase().trim();
  const dbMatch = await FoodItem.findOne({
    $or: [{
      name: lower
    }, {
      aliases: lower
    }]
  });
  if (dbMatch) return dbMatch;
  const localMatch = localDB.find(f => f.name === lower || (f.aliases || []).includes(lower));
  return localMatch || null;
};
const calculateNutrition = async items => {
  const results = [];
  for (const item of items) {
    const match = await findFoodMatch(item.name);
    const quantity = Number(item.quantity) || 1;
    if (!match) {
      results.push({
        name: item.name,
        quantity,
        unit: item.unit || 'unit',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        confidence: 'low'
      });
      continue;
    }
    results.push({
      name: match.name,
      quantity,
      unit: match.unit,
      calories: Math.round(match.calories * quantity),
      protein: Math.round(match.protein * quantity * 10) / 10,
      carbs: Math.round(match.carbs * quantity * 10) / 10,
      fat: Math.round(match.fat * quantity * 10) / 10,
      confidence: 'high'
    });
  }
  const totals = results.reduce((acc, r) => ({
    calories: acc.calories + r.calories,
    protein: acc.protein + r.protein,
    carbs: acc.carbs + r.carbs,
    fat: acc.fat + r.fat
  }), {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });
  return {
    items: results,
    totals
  };
};
module.exports = {
  calculateNutrition,
  findFoodMatch
};