require('dotenv').config();
const mongoose = require('mongoose');
const FoodItem = require('../models/FoodItem');
const foodData = require('../data/foodDatabase.json');
const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');
    await FoodItem.deleteMany({});
    await FoodItem.insertMany(foodData);
    console.log(`Seeded ${foodData.length} food items into the database.`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
};
seed();