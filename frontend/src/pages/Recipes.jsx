import { useEffect, useState, useCallback } from 'react';
import Sidebar from '../components/common/Sidebar';
import RecipeCard from '../components/recipes/RecipeCard';
import axiosInstance from '../api/axiosInstance';
const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [remaining, setRemaining] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosInstance.get('/meals/today/summary').then(({
      data
    }) => setRemaining(data.remaining)).catch(() => {});
  }, []);
  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (remaining) params.remainingCalories = remaining.calories;
      const {
        data
      } = await axiosInstance.get('/recipes', {
        params
      });
      setRecipes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [remaining]);
  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);
  return <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 md:p-8 w-full max-w-full overflow-x-hidden">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Recipes</h1>
        <p className="text-sm text-gray-500 mb-6">Vegetarian recommendations based on your remaining nutrition budget for today.</p>

        {remaining && <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 mb-6 text-sm text-brand-800">
            You have <strong>{Math.round(remaining.calories)} kcal</strong>, <strong>{Math.round(remaining.protein)}g protein</strong>,{' '}
            <strong>{Math.round(remaining.carbs)}g carbs</strong> and <strong>{Math.round(remaining.fat)}g fat</strong> left today.
          </div>}

        {loading ? <p className="text-sm text-gray-400">Finding recipes for you...</p> : recipes.length === 0 ? <p className="text-sm text-gray-400">No recipes match your remaining budget right now.</p> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recipes.map((recipe, i) => <RecipeCard key={i} recipe={recipe} />)}
          </div>}
      </main>
    </div>;
};
export default Recipes;