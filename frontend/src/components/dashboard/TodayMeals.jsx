import { Link } from 'react-router-dom';
import { Sun, CloudSun, Coffee, Moon, Plus, MoreVertical } from 'lucide-react';
const mealIcons = {
  breakfast: Sun,
  lunch: CloudSun,
  snack: Coffee,
  dinner: Moon
};
const TodayMeals = ({
  meals
}) => {
  const types = ['breakfast', 'lunch', 'snack', 'dinner'];
  return <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] transition-shadow">
      <div className="flex items-center justify-between mb-4 gap-2">
  <h3 className="font-semibold text-gray-900 shrink-0">Today's Meals</h3>
  <Link
    to="/add-meal"
    className="flex items-center gap-1 text-sm font-medium text-brand-600 border border-brand-200 rounded-lg px-3 py-1.5 hover:bg-brand-50 whitespace-nowrap shrink-0"
  >
    <Plus size={14} /> Add Meal
  </Link>
</div>

      <div className="divide-y divide-gray-100">
        {types.map(type => {
        const meal = meals.find(m => m.mealType === type);
        const Icon = mealIcons[type];
        return <div key={type} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center">
                  <Icon size={16} className="text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 capitalize">{type}</p>
                  <p className="text-xs text-gray-400">
                    {meal ? meal.items.map(i => i.name).join(', ') : 'Not logged yet'}
                  </p>
                </div>
              </div>

              {meal ? <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700">{meal.totalCalories} kcal</span>
                  <MoreVertical size={16} className="text-gray-300 cursor-pointer" />
                </div> : <Link to="/add-meal" className="text-gray-300 hover:text-brand-600">
                  <Plus size={18} />
                </Link>}
            </div>;
      })}
      </div>
    </div>;
};
export default TodayMeals;