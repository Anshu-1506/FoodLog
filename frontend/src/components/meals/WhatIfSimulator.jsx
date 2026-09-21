import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance';
import botImage from '../../assets/images/bot.png';
const WhatIfSimulator = ({
  currentTotals,
  goals
}) => {
  const [input, setInput] = useState('');
  const [preview, setPreview] = useState(null);
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSimulate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setPreview(null);
    setAdvice('');
    try {
      const {
        data: parsed
      } = await axiosInstance.post('/ai/parse', {
        text: input
      });
      if (!parsed.items.length) {
        setError(parsed.notes || "Couldn't identify any food items in that description.");
        return;
      }
      const {
        data: mealPreview
      } = await axiosInstance.post('/meals', {
        items: parsed.items,
        preview: true
      });
      setPreview(mealPreview);
      const remaining = {
        calories: Math.max(goals.calories - currentTotals.calories, 0),
        protein: Math.max(goals.protein - currentTotals.protein, 0),
        carbs: Math.max(goals.carbs - currentTotals.carbs, 0),
        fat: Math.max(goals.fat - currentTotals.fat, 0)
      };
      const {
        data: adviceData
      } = await axiosInstance.post('/ai/whatif-advice', {
        mealDescription: input,
        mealTotals: {
          calories: mealPreview.totalCalories,
          protein: mealPreview.totalProtein,
          carbs: mealPreview.totalCarbs,
          fat: mealPreview.totalFat
        },
        currentTotals,
        goals,
        remaining
      });
      setAdvice(adviceData.advice);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong simulating this meal.');
    } finally {
      setLoading(false);
    }
  };
  return <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={16} className="text-brand-600" />
        <h3 className="font-semibold text-gray-900">What-If Meal Simulator</h3>
      </div>
      <p className="text-sm text-gray-500 mb-3">
        Preview how a meal would affect your day — without saving it.
      </p>

      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Kya main ek plate chilli potato kha sakta hu?" rows={2} className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />

      <button onClick={handleSimulate} disabled={loading} className="mt-3 px-4 py-2 bg-brand-600 text-white text-sm font-medium rounded-lg hover:bg-brand-700 transition disabled:opacity-60">
        {loading ? 'Analyzing...' : 'Preview Impact'}
      </button>

      {error && <p className="mt-3 text-sm text-amber-600">{error}</p>}

      {preview && <div className="mt-4">
          <div className="flex gap-4 text-xs text-gray-500 mb-3">
            <span className="font-medium text-gray-700">{preview.totalCalories} kcal</span>
            <span>+{preview.totalProtein}g protein</span>
            <span>+{preview.totalCarbs}g carbs</span>
            <span>+{preview.totalFat}g fat</span>
          </div>

          <div className="flex items-start gap-3 bg-brand-50 border border-brand-100 rounded-lg p-4">
            <img src={botImage} alt="FoodLog AI" className="w-9 h-9 shrink-0" />
            {advice ? <p className="text-sm text-gray-700 leading-relaxed">{advice}</p> : <p className="text-sm text-gray-400 italic">Soch raha hoon...</p>}
          </div>
        </div>}
    </div>;
};
export default WhatIfSimulator;