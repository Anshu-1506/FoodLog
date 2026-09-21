import { createContext, useContext, useState } from 'react';
const DemoContext = createContext(null);
const defaultGoals = {
  calories: 2200,
  protein: 110,
  carbs: 275,
  fat: 65,
  water: 8
};
export const DemoProvider = ({
  children
}) => {
  const [meals, setMeals] = useState([]);
  const [water, setWater] = useState(0);
  const [goals] = useState(defaultGoals);
  const addMeal = meal => {
    setMeals(prev => [...prev, {
      ...meal,
      loggedAt: new Date().toISOString(),
      _id: Date.now().toString()
    }]);
  };
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
  const remaining = {
    calories: Math.max(goals.calories - totals.calories, 0),
    protein: Math.max(goals.protein - totals.protein, 0),
    carbs: Math.max(goals.carbs - totals.carbs, 0),
    fat: Math.max(goals.fat - totals.fat, 0)
  };
  return <DemoContext.Provider value={{
    meals,
    addMeal,
    water,
    setWater,
    goals,
    totals,
    remaining
  }}>
      {children}
    </DemoContext.Provider>;
};
export const useDemo = () => useContext(DemoContext);