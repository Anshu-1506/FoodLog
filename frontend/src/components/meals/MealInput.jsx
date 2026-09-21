import { useState } from 'react';
import { Sparkles } from 'lucide-react';
const mealTypes = ['breakfast', 'lunch', 'snack', 'dinner'];
const getDefaultMealType = () => {
  const hour = new Date().getHours();
  if (hour < 11) return 'breakfast';
  if (hour < 16) return 'lunch';
  if (hour < 19) return 'snack';
  return 'dinner';
};
const MealInput = ({
  onAnalyze,
  loading
}) => {
  const [text, setText] = useState('');
  const [mealType, setMealType] = useState(getDefaultMealType());
  const handleSubmit = () => {
    if (!text.trim()) return;
    onAnalyze({
      text,
      mealType
    });
  };
  return <div className="bg-white border border-gray-100 rounded-xl p-5">
      <h3 className="font-semibold text-gray-900 mb-1">What did you eat?</h3>
      <p className="text-sm text-gray-500 mb-4">
        Describe your meal naturally — in English, Hindi, or Hinglish.
      </p>

      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Breakfast mein 2 aloo parathe, mixed sabji aur 1 cup chai khayi" rows={3} className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
  <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
    {mealTypes.map((type) => (
      <button
        key={type}
        onClick={() => setMealType(type)}
        className={`px-3 py-1.5 text-sm rounded-lg capitalize border transition whitespace-nowrap shrink-0 ${
          mealType === type
            ? 'bg-brand-600 text-white border-brand-600'
            : 'border-gray-200 text-gray-500 hover:border-brand-300'
        }`}
      >
        {type}
      </button>
    ))}
  </div>

  <button
    onClick={handleSubmit}
    disabled={loading}
    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition disabled:opacity-60 whitespace-nowrap w-full sm:w-auto"
  >
    <Sparkles size={16} />
    {loading ? 'Analyzing...' : 'Analyze Meal'}
  </button>
</div>
    </div>;
};
export default MealInput;