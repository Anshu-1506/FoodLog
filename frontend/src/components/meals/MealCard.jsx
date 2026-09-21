import { useState } from 'react';
import { Sun, CloudSun, Coffee, Moon, Pencil, Trash2, ChevronDown } from 'lucide-react';
const mealIcons = {
  breakfast: Sun,
  lunch: CloudSun,
  snack: Coffee,
  dinner: Moon
};
const MealCard = ({
  meal,
  onEdit,
  onDelete
}) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = mealIcons[meal.mealType] || Sun;
  return <div className="bg-white border border-gray-100 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
            <Icon size={18} className="text-gray-500" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 capitalize">{meal.mealType}</p>
            <p className="text-xs text-gray-400">
              {new Date(meal.loggedAt).toLocaleString('en-IN', {
              day: 'numeric',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit'
            })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-800">{meal.totalCalories} kcal</span>
          <button onClick={() => onEdit(meal)} className="text-gray-400 hover:text-brand-600">
            <Pencil size={16} />
          </button>
          <button onClick={() => onDelete(meal._id)} className="text-gray-400 hover:text-red-600">
            <Trash2 size={16} />
          </button>
          <button onClick={() => setExpanded(!expanded)} className="text-gray-400">
            <ChevronDown size={16} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {expanded && <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-2 italic">"{meal.rawInput}"</p>
          <div className="space-y-1">
            {meal.items.map((item, i) => <div key={i} className="flex justify-between text-sm text-gray-600">
                <span className="capitalize">{item.name} × {item.quantity} {item.unit}</span>
                <span>{item.calories} kcal</span>
              </div>)}
          </div>
          <div className="flex gap-4 mt-3 text-xs text-gray-500">
            <span>Protein: {meal.totalProtein}g</span>
            <span>Carbs: {meal.totalCarbs}g</span>
            <span>Fat: {meal.totalFat}g</span>
          </div>
        </div>}
    </div>;
};
export default MealCard;