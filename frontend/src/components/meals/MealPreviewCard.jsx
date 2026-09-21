import { AlertTriangle } from 'lucide-react';
const MealPreviewCard = ({
  items,
  totals
}) => {
  const hasLowConfidence = items.some(i => i.confidence === 'low');
  const isAiEstimated = items.some(i => i.confidence === 'ai-estimated');
  return <div className="bg-white border border-gray-100 rounded-xl p-5 mt-4">
      <h3 className="font-semibold text-gray-900 mb-3">Detected Items</h3>

      <div className="divide-y divide-gray-100">
        {items.map((item, i) => <div key={i} className="flex items-center justify-between py-2 text-sm">
            <div>
              <span className="font-medium text-gray-800 capitalize">{item.name}</span>
              <span className="text-gray-400 ml-2">× {item.quantity} {item.unit}</span>
              {item.confidence === 'low' && <span className="ml-2 text-xs text-amber-600 flex items-center gap-1 inline-flex">
                  <AlertTriangle size={12} /> unrecognized
                </span>}
            </div>
            <span className="text-gray-600">{item.calories} kcal</span>
          </div>)}
      </div>

      {hasLowConfidence && <div className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
    Some items weren't recognized precisely — totals shown are an approximation. You can edit quantities below before saving.
  </div>}
{isAiEstimated && !hasLowConfidence && <div className="mt-3 text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
    Nutrition values are AI-estimated based on typical preparations — actual values may vary slightly depending on portion size and recipe.
  </div>}

      <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-100 text-center">
        <div>
          <p className="text-xs text-gray-400">Calories</p>
          <p className="font-bold text-gray-900">{totals.calories}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Protein</p>
          <p className="font-bold text-gray-900">{totals.protein}g</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Carbs</p>
          <p className="font-bold text-gray-900">{totals.carbs}g</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Fat</p>
          <p className="font-bold text-gray-900">{totals.fat}g</p>
        </div>
      </div>
    </div>;
};
export default MealPreviewCard;