import { Link } from 'react-router-dom';
import { Flame, Leaf, Wheat, Droplet, X } from 'lucide-react';
import MacroCard from '../components/dashboard/MacroCard';
import AISuggestionCard from '../components/dashboard/AISuggestionCard';
import TodayMeals from '../components/dashboard/TodayMeals';
import NutrientDonut from '../components/dashboard/NutrientDonut';
import WaterTracker from '../components/dashboard/WaterTracker';
import logo from '../assets/images/logo.png';
import { useDemo } from '../context/DemoContext';
const DemoDashboard = () => {
  const {
    meals,
    totals,
    goals,
    water,
    setWater
  } = useDemo();
  return <div className="min-h-screen bg-gray-50">
      <div className="bg-amber-50 border-b border-amber-100 px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs sm:text-sm text-amber-800 text-center sm:text-left">
          Demo mode — nothing here is saved.
        </p>
        <div className="flex gap-2 shrink-0">
          <Link to="/signup" className="px-3 py-1 bg-brand-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-brand-700 transition whitespace-nowrap">
            Sign Up Free
          </Link>
          <Link to="/" className="px-2 py-1 text-amber-700 hover:text-amber-900">
            <X size={16} />
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 bg-white border-b border-gray-100">
        <img src={logo} alt="FoodLog" className="h-8" />
        <Link to="/demo/add-meal" className="px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition">
          + Add Meal
        </Link>
      </div>

      <main className="p-4 sm:p-6 md:p-8">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Your Dashboard</h1>
        <p className="text-sm text-gray-500 mb-6">Try adding a meal to see how FoodLog works.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
          <MacroCard icon={Flame} label="Calories" value={totals.calories} goal={goals.calories} unit=" kcal" color="orange" />
          <MacroCard icon={Leaf} label="Protein" value={totals.protein} goal={goals.protein} unit="g" color="green" />
          <MacroCard icon={Wheat} label="Carbs" value={totals.carbs} goal={goals.carbs} unit="g" color="blue" />
          <MacroCard icon={Droplet} label="Fat" value={totals.fat} goal={goals.fat} unit="g" color="purple" />
          <div className="col-span-2 sm:col-span-3 md:col-span-1">
            <AISuggestionCard suggestion={meals.length === 0 ? 'Add your first meal to get a personalized suggestion.' : totals.protein < goals.protein * 0.7 ? 'You are low on protein. Try adding paneer, curd or sprouts.' : "You're on track! Keep it up."} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TodayMeals meals={meals} />
          </div>
          <div className="space-y-6">
            <WaterTracker glasses={water} goal={goals.water} onAdd={() => setWater(Math.min(water + 1, goals.water))} />
          </div>
        </div>

        {meals.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <NutrientDonut protein={totals.protein} carbs={totals.carbs} fat={totals.fat} />
          </div>}
      </main>
    </div>;
};
export default DemoDashboard;