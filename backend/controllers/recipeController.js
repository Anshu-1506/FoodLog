const localDB = require('../data/foodDatabase.json');
const recipes = [{
  name: 'Paneer & Sprouts Bowl',
  calories: 320,
  protein: 22,
  carbs: 20,
  fat: 14,
  diet: 'vegetarian',
  tags: ['high-protein']
}, {
  name: 'Dal, Rice & Salad',
  calories: 450,
  protein: 16,
  carbs: 70,
  fat: 8,
  diet: 'vegetarian',
  tags: ['balanced']
}, {
  name: 'Curd & Banana Bowl',
  calories: 250,
  protein: 8,
  carbs: 40,
  fat: 6,
  diet: 'vegetarian',
  tags: ['light', 'snack']
}, {
  name: 'Roti, Sabji & Curd',
  calories: 400,
  protein: 12,
  carbs: 55,
  fat: 12,
  diet: 'vegetarian',
  tags: ['balanced']
}, {
  name: 'Chana Masala & Rice',
  calories: 420,
  protein: 14,
  carbs: 65,
  fat: 10,
  diet: 'vegetarian',
  tags: ['high-protein', 'balanced']
}, {
  name: 'Paneer Butter Masala & Naan',
  calories: 550,
  protein: 18,
  carbs: 45,
  fat: 30,
  diet: 'vegetarian',
  tags: ['indulgent']
}, {
  name: 'Moong Sprouts Chaat',
  calories: 180,
  protein: 12,
  carbs: 22,
  fat: 4,
  diet: 'vegetarian',
  tags: ['light', 'high-protein', 'snack']
}, {
  name: 'Rajma & Rice',
  calories: 430,
  protein: 15,
  carbs: 68,
  fat: 8,
  diet: 'vegetarian',
  tags: ['balanced', 'high-protein']
}, {
  name: 'Palak Paneer & Roti',
  calories: 460,
  protein: 17,
  carbs: 40,
  fat: 24,
  diet: 'vegetarian',
  tags: ['balanced']
}, {
  name: 'Poha with Peanuts',
  calories: 220,
  protein: 6,
  carbs: 32,
  fat: 8,
  diet: 'vegetarian',
  tags: ['light', 'snack']
}, {
  name: 'Masala Dosa & Sambhar',
  calories: 380,
  protein: 9,
  carbs: 55,
  fat: 12,
  diet: 'vegetarian',
  tags: ['balanced']
}, {
  name: 'Fruit & Curd Bowl',
  calories: 200,
  protein: 6,
  carbs: 35,
  fat: 3,
  diet: 'vegetarian',
  tags: ['light', 'snack']
}];
const getRecipes = async (req, res, next) => {
  try {
    const {
      maxCalories
    } = req.query;
    const remaining = req.query.remainingCalories ? Number(req.query.remainingCalories) : null;
    let results = recipes;
    if (maxCalories) results = results.filter(r => r.calories <= Number(maxCalories));
    if (remaining) results = results.filter(r => r.calories <= remaining + 100);
    res.json(results);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getRecipes
};